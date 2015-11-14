define(['jquery',
    'backbone',
    'underscore',
    'views/modals/modal-view',
    'views/suggestions/suggestions-view',
    'stache!views/modals/suggestions-modal'
], function ($,
             Backbone,
             _,
             ModalView,
             SuggestionsView,
             SuggestionsModalTpl) {
    'use strict';

    var SuggestionsModal = ModalView.extend({

        initialize: function () {
            this.currentTopPos = 125;
            this.suggestionsModalHeight = 500;
        },

        events: {},

        sizeModal: function () {
            var suggestionsModalMarginTop = ((window.innerHeight - this.suggestionsModalHeight - this.currentTopPos) / 2);
            this.$modal.css('margin-top', suggestionsModalMarginTop + 'px');
            this.$el.find('#suggestionsModalContentContainer').width(700);
            this.$el.find('#suggestionsModalContentContainer').css('left', '-50px');
        },

        render: function () {
            var self = this;
            this.$el.html(SuggestionsModalTpl());

            this.$modal = this.$el.find('#suggestionsModalView');

            this.sizeModal();

            this.suggestionsFeedView = new SuggestionsView({
                el: this.$el.find('#suggestionsFeedView')
            });

            this.suggestionsFeedView.render();

        }
    });

    return SuggestionsModal;

});
