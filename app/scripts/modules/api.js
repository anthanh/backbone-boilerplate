/* global define, PAYPAL, alert, paymill */
define([
    'app',
    'jquery',
    'underscore',
    'backbone',
    'common',
    'modules/utils'

    // models & collections

], function(
    app,
    $,
    _,
    Backbone,
    common,
    utils
) {
    'use_strict';

    /**
     * MODULE
     */
    
    var api = {};

    // http://stackoverflow.com/questions/5241088/jquery-call-to-webservice-returns-no-transport-error
    $.support.cors = true;

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
        args.dataType = args.dataType || 'json';
        var url = common.apiGateway + args.resource + args.query;
        if (args.resource.indexOf('http') !== -1) {
            url = args.resource + args.query;
        }
        args.headers = args.headers || {};

        var params = {
            dataType: args.dataType,
            contentType: 'application/json; charset=utf-8',
            type: args.method,
            url: url,
            headers: args.headers,
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
    api.login = function(username, password, remember) {
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

    api.logout = function() {
        return request({
            method: 'GET',
            resource: 'account/logout'
        });
    };

    api.isLogged = function() {
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

    api.getUser = function() {
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

    api.setUser = function(user) {
        return request({
            method: 'POST',
            resource: 'account',
            data: user
        });
    };

    api.createUser = function(user, legacy) {
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

    var _statusCodeHandlers = {
        401: function(){
            // Redirect the to the login page.
            console.debug('401');
            Backbone.history.navigate('#/home', true);
        },
        503: function() {
            console.debug('503');
            window.location = '503.html';
        }
    };


    app.addInitializer(function() {
        app.api = api;

        // Tell jQuery to watch for any 401 or 403 errors and handle them appropriately
        $.ajaxSetup({
            statusCode: _statusCodeHandlers,
            error: function(jqXHR) {
                if (!jqXHR.status) {
                    app.vent.trigger('modal:error', {
                        model: new Backbone.Model({
                            title: 'error',
                            body: 'error_server_connection'
                        })
                    });
                }
            }
        });
    });

    return api;

});