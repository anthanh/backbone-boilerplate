// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file.
  deps: ['main'],

  paths: {
    // JavaScript folders.
    libs: '../lib',

    // Libraries.
    jquery: '../lib/jquery',
    lodash: '../lib/lodash',
    backbone: '../lib/backbone',
    layoutmanager: '../lib/backbone.layoutmanager'
  },

  shim: {
    // Backbone library depends on lodash and jQuery.
    backbone: {
      deps: ['lodash', 'jquery'],
      exports: 'Backbone'
    },

    // Backbone.LayoutManager depends on Backbone.
    'layoutmanager': ['backbone'],
    
    'libs/bootstrap/bootstrap-affix': ['jquery'],
    'libs/bootstrap/bootstrap-alert': ['jquery'],
    'libs/bootstrap/bootstrap-button': ['jquery'],
    'libs/bootstrap/bootstrap-carousel': ['jquery'],
    'libs/bootstrap/bootstrap-collapse': ['jquery'],
    'libs/bootstrap/bootstrap-dropdown': ['jquery'],
    'libs/bootstrap/bootstrap-modal': ['jquery'],
    'libs/bootstrap/bootstrap-popover': ['jquery'],
    'libs/bootstrap/bootstrap-scrollspy': ['jquery'],
    'libs/bootstrap/bootstrap-tab': ['jquery'],
    'libs/bootstrap/bootstrap-tooltip': ['jquery'],
    'libs/bootstrap/bootstrap-transition': ['jquery'],
    'libs/bootstrap/bootstraptypeahead': ['jquery']
  }

});

