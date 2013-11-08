/* globals define */
define([
    'app',
    'jquery',
    'underscore',
    'backbone',
    'backboneMarionette'
], function(app, $, _, Backbone) {
    'use_strict';

    var GenericItemView = Backbone.Marionette.ItemView.extend({

		onShow: function() {
			console.debug('GenericItemView.onShow');
			this.$el.i18n();
			window.scrollTo(0, 0);
		},

		/**
		 * Promise that defines tasks to perform before close,
		 * for example, animations.
		 * @return Deferred
		 */
		transitClose: function () {
			console.debug('GenericItemView.transitClose');
			var promise = $.Deferred();
			return promise.resolve();
		},

		close: function(){
			if (this.isClosed) { return; }

			console.debug('GenericItemView.close');
			// mark as closed before doing the actual close, to
			// prevent infinite loops within "close" event handlers
			// that are trying to close other views
			this.isClosed = true;
			this.triggerMethod('close');

			// unbind UI elements
			this.unbindUIElements();

			// remove the view from the DOM
			this.remove();
		}
	});
	return GenericItemView;
});