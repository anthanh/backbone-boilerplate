define([
    'app',
    'jquery',
    'underscore',
    'backbone',
    'genericItemView'
], function(app, $, _, Backbone, GenericItemView) {

    var Playground = GenericItemView.extend({
        template: '#playground-template',

        className: 'playground',

        events: {
            'click .action-modal': 'showModal',
            'click .action-spiner': 'showSpiner'
        },

        showModal: function() {
            // app.vent.trigger('modal', {
            //     view: 'RegisterExtraSportActivityModalView',
            //     model: new Backbone.Model({
            //         title: 'Modal title!'
            //     })
            // });
            app.vent.trigger('modal', {
                model: new Backbone.Model({
                    title: 'Lo sentimos',
                    body: 'Correo o contraseña incorrecta.'
                })
            });
        },

        showSpiner: function() {
            app.utils.spiner.show();

            setTimeout(function() {
                app.utils.spiner.hide();
            }, 3000);
        },

        onRender: function() {
            this.$el.i18n();
        }

    });

    return Playground;
});