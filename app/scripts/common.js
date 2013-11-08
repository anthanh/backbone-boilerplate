/* globals define */
define([], function() {
    'use_strict';

    var common = {};


    /*
     * ENVIROMENT & BEHAVIOUR
     */

    // DEVELOPER|PRODUCTION
    var mode = 'DEVELOPER';
    common.production = (function() {
        return mode === 'PRODUCTION';
    })();

    common.gatekeeper = true;

    common.version = '1.2';
    common.appName = 'WEBAPP';
    common.clientType = 'WEB';
    common.environment = '';

    common.isIE8 = document.all && document.querySelector && !document.addEventListener;
    common.browserCapable = !(document.all && !document.addEventListener);


    /*
     * APIGATEWAY
     */

    // Same as scripts/apiGateway.sh !!!,
    // with "" because of bash script integration
    // DO NOT CHANGE! Use "mode" + "apiGatewayDev" instead
    var apiGateway = "gateway/";
    var apiGatewayDev = 'https://www.domain.com/gateway/';

    common.apiGateway = (function() {
        if (!common.production) {
            return apiGatewayDev;
        }
        if (apiGateway.indexOf('http') !== -1) {
            return apiGateway;
        } else {
            return window.location.protocol + '//' + window.location.host + '/' + apiGateway;
        }
    })();

    //ojo updates ie8
    common.crossDomain = (function() {
        if (common.apiGateway.indexOf('http') !== -1) {
            return true;
        } else {
            return false;
        }
    })();

    common.wwwRoot = window.location.protocol + '//' + window.location.host + window.location.pathname;


    /*
     * LOCALES
     */

    common.defaultLang = 'es-ES';


    /*
     * LOGS
     */

    /* Error codes */
    common.status = {
        unauthorized: 401,
        logSent: 1001
    };

    /*
        0 - none
        1 - error
        2 - warning
        3 - info
        4 - debug
    */
    common.logLevel = (common.production? 0: 4);
    common.logBuffer = 10;
    common.logToServer = true;


    return common;
});

