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
            this.suggestionsModalHeight = 300;
        },

        events: {},

        passUserData: function (user) {
          this.user = user;
          if (this.suggestionsContentView) {
            this.suggestionsContentView.passUserData(user);
          }
        },

        sizeModal: function () {
            var suggestionsModalMarginTop = ((window.innerHeight - this.suggestionsModalHeight - this.currentTopPos) / 2);
            this.$modal.css('margin-top', suggestionsModalMarginTop + 'px');
            this.$el.find('#suggestionsModalContentContainer').width(600);
        },

        render: function () {
            var self = this;
            this.$el.html(SuggestionsModalTpl());

            this.$modal = this.$el.find('#suggestionsModalView');

            this.sizeModal();

            this.suggestionsContentView = new SuggestionsView({
                el: this.$el.find('#suggestionsContentView')
            });

            this.listenTo(this.suggestionsContentView, 'close', function () {
              self.trigger('close');
            });

            if (this.user) {
              this.suggestionsContentView.passUserData(this.user);
            }

            this.suggestionsContentView.render();

        }
    });

    return SuggestionsModal;

});
