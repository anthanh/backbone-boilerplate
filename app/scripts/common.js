/* globals define */
define([], function() {
    'use_strict';

    var production = false;
    var apiGateway = 'http://localhost:8080/backend/';
    var defaultLang = 'es-ES';

	/*
		0 - none
		1 - error
		2 - warning
		3 - info
		4 - debug
	*/
    var logLevel = 4;

    return {
        production: production,
        apiGateway: apiGateway,
        lang: defaultLang,
        logLevel: logLevel,
        localesURL: 'locales/__lng__/locales.json'
    };
});