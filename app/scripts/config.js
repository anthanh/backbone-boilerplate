// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file.
    deps: ['modules/polyfills', 'modules/logger', 'main'],

    paths: {
        // JavaScript folders.
        libs: '../scripts/lib',
        views: '../scripts/views',
        layouts: '../scripts/layouts',
        models: '../scripts/models',
        collections: '../scripts/collections',
        routers: '../scripts/routers',
        modules: '../scripts/modules',

        genericItemView: '../scripts/views/GenericItemView',

        // Libraries.
        jquery: '../lib/jquery',
        underscore: '../lib/lodash',    //underscore with steroids
        backbone: '../lib/backbone',
        backboneMarionette: '../lib/backbone.marionette',
        backboneAnalytics: '../lib/backbone.analytics',

        i18next: '../lib/i18next',
        numeral: '../lib/numeral/numeral',
        moment: '../lib/moment/moment',

        jqueryspin: '../lib/jquery.spin',

        bootstrap: '../lib/bootstrap/bootstrap',
        bootstrapAffix: '../lib/bootstrap/bootstrap-affix',
        bootstrapAlert: '../lib/bootstrap/bootstrap-alert',
        bootstrapButton: '../lib/bootstrap/bootstrap-button',
        bootstrapCarousel: '../lib/bootstrap/bootstrap-carousel',
        bootstrapCollapse: '../lib/bootstrap/bootstrap-collapse',
        bootstrapDropdown: '../lib/bootstrap/bootstrap-dropdown',
        bootstrapModal: '../lib/bootstrap/bootstrap-modal',
        bootstrapPopover: '../lib/bootstrap/bootstrap-popover',
        bootstrapScrollspy: '../lib/bootstrap/bootstrap-scrollspy',
        bootstrapTab: '../lib/bootstrap/bootstrap-tab',
        bootstrapTooltip: '../lib/bootstrap/bootstrap-tooltip',
        bootstrapTransition: '../lib/bootstrap/bootstrap-transition',
        bootstrapTypeahead: '../lib/bootstrap/bootstrap-typeahead'
    },

    shim: {
        // Backbone library depends on lodash and jQuery.
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backboneAnalytics': ['backbone'],
        'backboneMarionette': ['backbone'],

        'i18next': ['jquery'],

        'jqueryspin': ['jquery'],

        'bootstrap': ['jquery'],
        'bootstrapAffix': ['bootstrap'],
        'bootstrapAlert': ['bootstrap'],
        'bootstrapButton': ['bootstrap'],
        'bootstrapCarousel': ['bootstrap'],
        'bootstrapCollapse': ['bootstrap'],
        'bootstrapDropdown': ['bootstrap'],
        'bootstrapModal': ['bootstrap'],
        'bootstrapScrollspy': ['bootstrap'],
        'bootstrapTab': ['bootstrap'],
        'bootstrapTooltip': ['bootstrap'],
        'bootstrapPopover': ['bootstrapTooltip'],
        'bootstrapTransition': ['bootstrap'],
        'bootstrapTypeahead': ['bootstrap']
    }

});