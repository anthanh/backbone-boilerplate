/* globals define */
define([], function() {
    'use_strict';

    var mode = 'PRODUCTION';   // DEVELOPER|PRODUCTION
    var gatekeeper = true;

    var version = '1.0';
    var clientType = 'WEB';
    var environment = '';
    var apiGateway = "gateway/";
    var wwwRoot = window.location.protocol + '//' + window.location.host + window.location.pathname;
    var defaultLang = 'es-ES';

    var logToServer = false;

	/*
		0 - none
		1 - error
		2 - warning
		3 - info
		4 - debug
	*/
    var logLevel = 4;
    var logBuffer = 10;

    /* Check for Internet Explorer version */
    var ieVersion = (function() { if (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) { return parseFloat( RegExp.$1 ); } else { return false; } })();

    var isProduction = function() {
        return mode === 'PRODUCTION';
    };

    var getApiGateway = function() {
        if (apiGateway.indexOf('http') !== -1) {
            return apiGateway;
        } else {
            return window.location.protocol + '//' + window.location.host + '/' + apiGateway;
        }
    };

    //ojo updates ie8
    var crossDomain = function() {
        if (apiGateway.indexOf('http') !== -1) {
            return true;
        } else {
            return false;
        }
    };

    return {
        production: isProduction(),
        gatekeeper: gatekeeper,
        version: version,
        clientType: clientType,
        environment: environment,
        apiGateway: getApiGateway(),
        crossDomain: crossDomain(),
        wwwRoot: wwwRoot,
        lang: defaultLang,
        logToServer: logToServer,
        logLevel: logLevel,
        logBuffer: logBuffer,
        status: status,
        localesURL: 'res/locales/__lng__/locales.json',
        isIE: ieVersion
    };
});
