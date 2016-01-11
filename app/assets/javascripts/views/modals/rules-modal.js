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
      this.currentTopPos = 135;
      this.rulesModalHeight = 197;
    },

    events: {},

    sizeModal: function () {
      var rulesModalMarginTop = ((window.innerHeight - this.rulesModalHeight - this.currentTopPos) / 2);
      this.$modal.css('margin-top', rulesModalMarginTop + 'px');
      this.$el.find('#rulesModalContentContainer').width(600);
    },

    render: function () {
      var self = this;
      this.$el.html(RulesModalTpl());

      this.$modal = this.$el.find('#rulesModalView');

      this.sizeModal();

      this.rulesFeedView = new RulesView({
        el: this.$el.find('#rulesContentView')
      });

      this.rulesFeedView.render();

    }
  });

  return RulesModal;

});
