/* globals require */
require([
    'jquery',
    'underscore',
    'backbone',
    'app',

    // Factories
    'modules/viewFactory',
    'modules/modelFactory',

    // Modules
    'modules/utils',
    'modules/locale',
    'modules/api',

    'routers/router',
    'views/modal'
],

function(
    $,
    _,
    Backbone,
    app,
    viewFactory,
    modelFactory,
    utils,
    locale,
    api,
    Router,
    ModalView
) {
    'use strict';

    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    app.router = new Router();

    app.addRegions({
        header: 'header',
        main: '#main',
        modal: '#modal',
        footer: 'footer'
    });

    app.addInitializer(function() {

        // polyfiles, localstorage...
        // load modules
        // Load user if logged (session)
        app.session.initialize();

        app.modal.show(new ModalView());

    });

    app.on('initialize:after', function() {

        var miniNav = {
            appCodeName: navigator.appCodeName,
            appName: navigator.appName,
            appVersion: navigator.appVersion,
            cookieEnabled: navigator.cookieEnabled,
            platform: navigator.platform,
            userAgent: navigator.userAgent,
            systemLanguage: navigator.systemLanguage
        };

        var common = {
            production: app.common.production,
            gatekeeper: app.common.gatekeeper,
            paypalGateway: app.common.paypalGateway,
            version: app.common.version,
            clientType: app.common.clientType,
            environment: app.common.environment,
            apiGateway: app.common.apiGateway,
            crossDomain: app.common.crossDomain,
            wwwRoot: app.common.wwwRoot,
            lang: app.common.lang,
            logToServer: app.common.logToServer,
            logLevel: app.common.logLevel,
            logBuffer: app.common.logBuffer
        };

        console.info('initialize:after:');
        console.info(window.performance);
        console.info(miniNav);
        console.info(screen);
        console.info(common);

        // Trigger the initial route and enable HTML5 History API support, set the
        // root folder to '/' by default.  Change in app.js.
        Backbone.history.start({
            // pushState: true,
            // root: app.root
        });

        // All navigation that is relative should be passed through the navigate
        // method, to be processed by the router. If the link has a `data-bypass`
        // attribute, bypass the delegation completely.
        $(document).on('click', 'a:not([data-bypass])', function(evt) {
            // Get the absolute anchor href.
            var href = $(this).attr('href');

            // If the href exists and is a hash route, run it through Backbone.
            if (href && href.indexOf('#') === 0) {
                // Stop the default event to ensure the link will not cause a page
                // refresh.
                evt.preventDefault();

                // `Backbone.history.navigate` is sufficient for all Routers and will
                // trigger the correct events. The Router's internal `navigate` method
                // calls this anyways.  The fragment is sliced from the root.
                Backbone.history.navigate(href, true);
                // app.router.navigate(href, true);
            }
        });

    });

    if (app.common.browserCapable) {
        app.start();
    }

    return app;
});