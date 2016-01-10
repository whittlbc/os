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
            this.currentTopPos = 150;
            this.aboutModalHeight = 297;
        },

        events: {},

        sizeModal: function () {
            var aboutModalMarginTop = ((window.innerHeight - this.aboutModalHeight - this.currentTopPos) / 2);
            this.$modal.css('margin-top', aboutModalMarginTop + 'px');
            this.$el.find('#aboutModalContentContainer').width(600);
        },

        render: function () {
            var self = this;
            this.$el.html(AboutModalTpl());

            this.$modal = this.$el.find('#aboutModalView');

            this.sizeModal();

            this.aboutFeedView = new AboutView({
                el: this.$el.find('#aboutContentView')
            });

            this.aboutFeedView.render();

        }
    });

    return AboutModal;

});
