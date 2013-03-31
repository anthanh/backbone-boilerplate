/* globals require */
require([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'routers/router',
    'views/playground'
],

function($, _, Backbone, app, Router, PlaygroundView) {
    'use strict';

    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    app.router = new Router();

    app.addRegions({
        header: 'header',
        main: '#main',
        footer: 'footer'
    });

    app.addInitializer(function() {

        // polyfiles, localstorage...
        // load modules
        // Load user if logged (session)

        // load lang (usersettings or default)
        app.locale.initialize(app.common.lang);

        // Load main layout
        // Load logged header if logged
        app.main.show(new PlaygroundView());

        // load footer
    });

    app.on('initialize:after', function() {

        // Trigger the initial route and enable HTML5 History API support, set the
        // root folder to '/' by default.  Change in app.js.
        //TODO: cambiar root en función de si está logeado o no
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

    app.start();

});