define([
    // Libraries.
    'jquery', 'underscore', 'backbone',

    // Modules
    'common',
    'modules/locale',

    // Plugins.
    'backboneMarionette'
],

function($, _, Backbone, common, locale) {
    'use strict';

    // Backbone.Marionette.Renderer.render = function(template, data){
    //   return _.template($(template).html(), {model:data, _:_});
    // };
    // Provide a global location to place configuration settings and module
    // creation.
    var app = {
        // The root path to run the application.
        root: '/',
        common: common,
        locale: locale
    };

    // Localize or create a new JavaScript Template object.
    var JST = window.JST = window.JST || {};

    return _.extend(new Backbone.Marionette.Application(), app);

});