define([
    // Libraries.
    'jquery',
    'underscore',
    'backbone',

    // Modules
    'common',
    'modules/session',

    // Plugins.
    'backboneMarionette',
    'backboneAnalytics'
],

function(
    $,
    _,
    Backbone,
    common,
    session
) {
    'use strict';

    //Change underscore interpolated tag
    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };

    // Backbone.Marionette.Renderer.render = function(template, data){
    //   return _.template($(template).html(), {model:data, _:_});
    // };
    // Provide a global location to place configuration settings and module
    // creation.
    console.debug('app.root: ' + window.location.pathname);
    var app = {
        // The root path to run the application.
        root: window.location.pathname,
        common: common,
        session: session,
        factory: {}
    };

    // Localize or create a new JavaScript Template object.
    var JST = window.JST = window.JST || {};

    return _.extend(new Backbone.Marionette.Application(), app);

});