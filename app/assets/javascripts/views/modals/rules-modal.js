define(['jquery',
  'backbone',
  'underscore',
  'views/modals/modal-view',
  'views/rules/rules-view',
  'stache!views/modals/rules-modal'
], function ($,
             Backbone,
             _,
             ModalView,
             RulesView,
             RulesModalTpl) {
  'use strict';

  var RulesModal = ModalView.extend({

    initialize: function () {
      this.currentTopPos = 100;
      this.rulesModalHeight = 410;
    },

    events: {
      'click .close': 'resumeDocumentScroll'
    },

    resumeDocumentScroll: function () {
      document.body.style.overflow = 'auto';
    },

    sizeModal: function () {
      var rulesModalMarginTop = ((window.innerHeight - this.rulesModalHeight - this.currentTopPos) / 2);
      this.$modal.css('margin-top', rulesModalMarginTop + 'px');
      this.$el.find('#rulesModalContentContainer').width(609);
      this.$el.find('#rulesModalContentContainer').height(this.rulesModalHeight);
    },

    render: function () {
      var self = this;

      this.$el.html(RulesModalTpl());

      this.$modal = this.$el.find('#rulesModalView');

      this.sizeModal();

      this.rulesFeedView = new RulesView({
        el: this.$el.find('#rulesContentView')
      });

      this.listenTo(this.rulesFeedView, 'confirm', function () {
        self.resumeDocumentScroll();
        self.trigger('confirm');
      });

      this.rulesFeedView.render();

    }
  });

  return RulesModal;

});
