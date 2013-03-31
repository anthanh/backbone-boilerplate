define([
  'jquery',
  'underscore',
  'backbone',
  'backboneMarionette'
], function($, _, Backbone) {

  var Playground = Backbone.Marionette.ItemView.extend({
    template: '#playground-template',
    className: 'playground',

    onRender: function() {
      this.$el.i18n();
    }

  });

  return Playground;
});