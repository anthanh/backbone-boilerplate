/* globals define */
/* globals alert */
define([
    'jquery',
    'common',
    'moment'
], function(
    $,
    common,
    moment
) {
    'use_strict';

    var logs = [];

    if (!console) {
        console = {};
    }
    console.error = console.error || function() {};
    console.warn = console.warn || function() {};
    console.info = console.info || function() {};
    console.log = console.log || function() {};
    console.debug = console.debug || function() {};

    var browserError = console.error;
    var browserWarning = console.warn;
    var browserInfo = console.info;
    var browserDebug = console.debug;

    var initialize = function() {

        // http://stackoverflow.com/questions/5916900/detect-version-of-browser
        navigator.sayswho= (function(){
            var N= navigator.appName, ua= navigator.userAgent, tem;
            var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
            if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
            M= M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];

            return M;
        })();

        console.error = function() {
            var level = 1;
            if (common.logLevel >= level) {
                var log = defaultLogObject();
                log.level = 0;
                log.message.action = arguments[0];
                // var log = {
                //     level: level,
                //     message: {
                //         message: message,
                //         file: file,
                //         line: line
                //     }
                // };
                addToLog(log, true);
                if (document.all && !window.atob) { // IE9-
                    browserError(arguments);
                    // Function.prototype.call(browserError, arguments);
                    // Function.prototype.call(console.error, arguments);
                } else {
                    browserError.call(console, arguments);
                }
                // Function.prototype.call(browserError, arguments);
            }
        },

        console.warn = function() {
            var level = 2;
            if (common.logLevel >= level) {
                var log = defaultLogObject();
                log.level = 1;
                log.message.action = arguments[0];
                if (document.all && !window.atob) { // IE9-
                    browserWarning(arguments);
                    // Function.prototype.call(browserWarning, arguments);
                    // Function.prototype.call(console.warn, arguments);
                } else {
                    browserWarning.call(console, arguments);
                }
                addToLog(log);
            }
        },

        console.info = function() {
            var level = 3;
            if (common.logLevel >= level) {

                var log = defaultLogObject();
                log.level = 1;
                log.message.action = arguments[0];
                if (document.all && !window.atob) { // IE9-
                    browserInfo(arguments);
                    // Function.prototype.call(browserInfo, arguments);
                    // Function.prototype.call(console.info, arguments);
                } else {
                    browserInfo.call(console, arguments);
                }
                addToLog(log);
            }
        },

        console.debug = function() {
            var level = 4;
            if (common.logLevel >= level) {
                // var log = {
                //     level: level,
                //     message: arguments.join(' ')
                // };
                if (document.all && !window.atob) { // IE9-
                    browserDebug(arguments);
                    // Function.prototype.call(browserDebug, arguments);
                    // Function.prototype.call(console.debug, arguments);
                } else {
                    // browserDebug.call(console, arguments);
                }
                // addToLog(log);
            }
        };

    };

    var defaultLogObject = function() {
        var time = moment();
        return {
            level: null,
            message: {
                'user_id': 1,
                'screen': 1,
                'action': null,
                'day': Number(time.format('D')),
                'month': Number(time.format('M')),
                'year': Number(time.format('YYYY')),
                'hour': Number(time.format('H')),
                'minutes': Number(time.format('m')),
                'seconds': Number(time.format('s')),
                'error_message': 0,
                'error_code': 0,
                'error_line': 0,
                'error_file': 0,
                'device': 'pc',
                'browser': navigator.sayswho[0],
                'version': navigator.sayswho[1],
                'app_version': common.version,
                'os': navigator.platform,
                'screen_width': screen.width,
                'screen_height': screen.height
            }
        };


    };

    var addToLog = function(log, force) {
        // logs.push(JSON.stringify(log));
        logs.push(log);
        if ((logs.length > common.logBuffer) || force) {
            toServer({
                log: logs
            });
        }
    };

    var toServer = function(data) {
        if (!common.logToServer) {
            logs = [];
            return;
        }

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            type: 'POST',
            url: common.apiGateway + 'logs/browser',
            contentType: 'text/plain',
            data: JSON.stringify(data),
            statusCode: {
                200: function() {
                    console.debug('logger uploaded');
                    logs = [];
                },
                404: function() {
                    console.debug('logger not found');
                },
                503: function() {
                    console.debug('logger offline');
                }
            }

        });

    };

    return initialize();

});