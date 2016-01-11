define(['jquery',
    'backbone',
    'underscore',
    'views/modals/modal-view',
    'views/starred/starred-feed-view',
    'stache!views/modals/starred-modal'
], function ($,
     Backbone,
     _,
     ModalView,
     StarredFeedView,
     StarredModalTpl) {
    'use strict';

    var StarredModal = ModalView.extend({

        initialize: function () {
            this.currentTopPos = 135;
            this.starredModalHeight = 400;
        },

        events: {
            'click .close': 'handleCloseModal'
        },

        handleCloseModal: function () {
        },

        populate: function (data) {
            var self = this;
            this.starredFeedView.populate(data);
        },

        sizeModal: function () {
            var self = this;
            var starredModalMarginTop = ((window.innerHeight - this.starredModalHeight - this.currentTopPos) / 2);
            this.$modal.css('margin-top', starredModalMarginTop + 'px');
            this.$el.find('#starredModalContentContainer').width(600);
        },

        render: function () {
            var self = this;
            this.$el.html(StarredModalTpl());

            this.$modal = this.$el.find('#starredModalView');

            this.sizeModal();

            this.starredFeedView = new StarredFeedView({
                el: this.$el.find('#starredFeedView')
            });

            this.starredFeedView.render();

        }
    });

    return StarredModal;

});
