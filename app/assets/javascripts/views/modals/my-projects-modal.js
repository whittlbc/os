define(['jquery',
    'backbone',
    'underscore',
    'views/modals/modal-view',
    'views/my-projects/my-projects-feed-view',
    'stache!views/modals/my-projects-modal'
], function ($,
     Backbone,
     _,
     ModalView,
     MyProjectsFeedView,
     MyProjectsModalTpl) {
    'use strict';

    var MyProjectsModal = ModalView.extend({

        initialize: function () {
            this.currentTopPos = 150;
            this.myProjectsModalHeight = 400;
        },

        events: {},

        populate: function (data) {
            var self = this;
            this.myProjectsFeedView.populate(data);
        },

        sizeModal: function () {
            var self = this;
            var myProjectsModalMarginTop = ((window.innerHeight - this.myProjectsModalHeight - this.currentTopPos) / 2);
            this.$modal.css('margin-top', myProjectsModalMarginTop + 'px');
            this.$el.find('#myProjectsModalContentContainer').width(600);
        },

        render: function () {
            var self = this;
            this.$el.html(MyProjectsModalTpl());

            this.$modal = this.$el.find('#myProjectsModalView');

            this.sizeModal();

            this.myProjectsFeedView = new MyProjectsFeedView({
                el: this.$el.find('#myProjectsFeedView')
            });

            this.myProjectsFeedView.render();

        }
    });

    return MyProjectsModal;

});
