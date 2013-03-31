// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file.
    deps: ['main'],

    paths: {
        // JavaScript folders.
        libs: '../scripts/lib',
        views: '../scripts/views',
        layouts: '../scripts/layouts',
        models: '../scripts/models',
        routers: '../scripts/routers',
        modules: '../scripts/modules',

        // Libraries.
        jquery: '../lib/jquery',
        underscore: '../lib/lodash',
        backbone: '../lib/backbone',
        backboneMarionette: '../lib/backbone.marionette',

        // range: '../scripts/views/form/range',
        // multipleSelect: '../scripts/views/form/multipleSelect',

        i18next: '../lib/i18next',
        numeral: '../lib/numeral/numeral',
        moment: '../lib/moment/moment',

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
        'backboneForm': ['backbone', 'bootstrapPopover'],
        'backboneMarionette': ['backbone'],

        'i18next': ['jquery'],

        'bootstrapAffix': ['jquery', 'bootstrap'],
        'bootstrapAlert': ['jquery', 'bootstrap'],
        'bootstrapButton': ['jquery', 'bootstrap'],
        'bootstrapCarousel': ['jquery', 'bootstrap'],
        'bootstrapCollapse': ['jquery', 'bootstrap'],
        'bootstrapDropdown': ['jquery', 'bootstrap'],
        'bootstrapModal': ['jquery', 'bootstrap'],
        'bootstrapPopover': ['jquery', 'bootstrap', 'bootstrapTooltip'],
        'bootstrapScrollspy': ['jquery', 'bootstrap'],
        'bootstrapTab': ['jquery', 'bootstrap'],
        'bootstrapTooltip': ['jquery', 'bootstrap'],
        'bootstrapTransition': ['jquery', 'bootstrap'],
        'bootstrapTypeahead': ['jquery', 'bootstrap']
    }

});