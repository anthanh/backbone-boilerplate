/* global define */
define([
    'app',
    'jquery',
    'underscore',
    'genericItemView',
    'bootstrapModal'
], function (app, $, _, GenericItemView) {
    'use strict';

    var ModalView = GenericItemView.extend({

        template: '#modal-template',
        className: 'modal hide fade',

        modalView: null,

        onRender: function () {
            this.$el.i18n();
        },

        initialize : function () {
            this.listenTo(app.vent, 'modal', this.showModal);
        },

        showModal: function(args) {
            if (this.modalView) {
                this.modalView.close();
            }
            if (args.view) {
                this.modalView = app.factory.view.create({
                    view: args.view,
                    options: {
                        model: args.model
                    }
                });
                this.$el.html(this.modalView.render().$el);
            } else {
                //Restore view
                this.render();
                if (args.model.get('title')) {
                    this.$el.find('.modal-header h3 span').html($.t(args.model.get('title')));
                }

                if (args.model.get('body')) {
                    this.$el.find('.modal-body p').attr('data-i18n', args.model.get('body'));
                }
            }

            this.$el.i18n();
            this.$el.modal('show');
        }

    });

    return ModalView;
});