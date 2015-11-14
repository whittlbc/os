define(['jquery',
    'backbone',
    'underscore',
    'views/modals/modal-view',
    'views/about/about-view',
    'stache!views/modals/about-modal'
], function ($,
     Backbone,
     _,
     ModalView,
     AboutView,
     AboutModalTpl) {
    'use strict';

    var AboutModal = ModalView.extend({

        initialize: function () {
            this.currentTopPos = 125;
            this.aboutModalHeight = 500;
        },

        events: {},

        sizeModal: function () {
            var aboutModalMarginTop = ((window.innerHeight - this.aboutModalHeight - this.currentTopPos) / 2);
            this.$modal.css('margin-top', aboutModalMarginTop + 'px');
            this.$el.find('#aboutModalContentContainer').width(700);
            this.$el.find('#aboutModalContentContainer').css('left', '-50px');
        },

        render: function () {
            var self = this;
            this.$el.html(AboutModalTpl());

            this.$modal = this.$el.find('#aboutModalView');

            this.sizeModal();

            this.aboutFeedView = new AboutView({
                el: this.$el.find('#aboutFeedView')
            });

            this.aboutFeedView.render();

        }
    });

    return AboutModal;

});
