/* global define, PAYPAL, alert, paymill */
define([
    'jquery',
    'underscore',
    'backbone',
    'common',
    'modules/utils'

    // models & collections

], function(
    $,
    _,
    Backbone,
    common,
    utils
) {
    'use_strict';

    /**
     * Realiza una petición a la API REST
     * query es un objeto con pares clave-valor
     * data es un objeto javascript de claves-valor
     * objecto con los siguientes datos: method, resource, query, data, onSuccess, onError
     *
     * @private
     * @param Object args object with following fields:
     *  method - String GET, POST, PUT, HEADER, DELETE
     *  resource - String
     *  data - object
     *  query - String in query string format
     *  onSuccess - function
     *  onError - function
     * @return jqXHR
     */
    var request = function(args) {
        args = args || {};
        args.query = args.query || '';
        var url = common.apiGateway + args.resource + args.query;
        if (args.resource.indexOf('http') !== -1) {
            url = args.resource + args.query;
        }

        var params = {
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: args.method,
            url: url,
            data: JSON.stringify(args.data)
        };

        if (common.crossDomain) {
            params.xhrFields = {
                withCredentials: true
            };
        }
        console.debug('api.request (params)' + JSON.stringify(params));
        if (args.data) {
            console.debug('api.request (data)' + JSON.stringify(args.data));
        }

        var request = $.ajax(params).done(function(data) {
            console.debug('api.request DONE: ' + JSON.stringify(data));
        }).fail(function(jqXHR) {
            console.debug('api.request FAIL (jqXHR): ' + JSON.stringify(jqXHR));
        });

        return request;
    };


    /**
     * SYSTEM
     */

    /**
     * Autenticates an user
     * @param  String username
     * @param  String password
     * @param  Function onSuccess
     * @param  Function onError
     * @return jqXHR
     */
    var login = function(username, password, remember) {
        var data =
            'j_username=' + username +
            '&j_password=' + password +
            '&remember=' + remember +
            '&clientType=' + common.clientType +
            '&clientVersion=' + common.version +
            '&environment=' + common.environment;

        var params = {
            type: 'POST',
            crossDomain: common.crossDomain,
            url: common.apiGateway + 'account/login',
            data: data
        };

        if (common.crossDomain) {
            params.xhrFields = {
                withCredentials: true
            };
        }
        console.debug('api.login (params)' + JSON.stringify(params));

        return $.ajax(params);
    };

    var logout = function() {
        return request({
            method: 'GET',
            resource: 'account/logout'
        });
    };

    var isLogged = function() {
        $.ajaxSetup({
            statusCode: {
                401: function(){
                }
            }
        });
        return getUser().done(function() {
            $.ajaxSetup({
                statusCode: statusCodeHandlers
            });
        });
    };

    /**
     * USER
     */

    var getUser = function() {
        return request({
            method: 'GET',
            resource: 'account'
        }).then(function(data) {
            if (!common.production) {
                data._payload.validated = true;
            }
            return data._payload;
        });
    };

    var setUser = function(user) {
        return request({
            method: 'POST',
            resource: 'account',
            data: user
        });
    };

    var createUser = function(user, legacy) {
        legacy = legacy || false;
        var args = {
            user: user,
            clientInfo: {
                clientType: common.clientType,
                clientVersion: common.version
            }
        };

        if (common.environment) {
            args.clientInfo.environment = common.environment;
        }
        return request({
            method: 'PUT',
            resource: legacy?'useraccount':'account',
            data: args
        });
    };

    var statusCodeHandlers = {
        401: function(){
            // Redirec the to the login page.
            console.debug('401');
            Backbone.history.navigate('#/home', true);
        },
        503: function() {
            console.debug('503');
            window.location = '503.html';
        }
    };


    var initialize = function() {
        // Tell jQuery to watch for any 401 or 403 errors and handle them appropriately
        $.ajaxSetup({
            statusCode: statusCodeHandlers
        });

        return {
            request: request,

            login: login,
            logout: logout,
            isLogged: isLogged,

            getUser: getUser,
            setUser: setUser,
            createUser: createUser
        };
    };

    return initialize();

});