define(['jquery',
  'backbone',
  'underscore',
  'views/modals/modal-view',
  'stache!views/modals/basic-question-modal'
], function ($,
             Backbone,
             _,
             ModalView,
             BasicQuestionModalTpl) {
  'use strict';

  var BasicQuestionModal = ModalView.extend({

    initialize: function (options) {
      options = options || {};
      this.showConfirm = options.showConfirm ? options.showConfirm : true;
      this.showCancel = options.showCancel ? options.showCancel : true;
      this.confirmBtnText = options.confirmBtnText ? options.confirmBtnText : 'Yes';
      this.cancelBtnText = options.cancelBtnText ? options.cancelBtnText : 'No';
      this.message = options.message ? options.message : '';
      this.currentTopPos = 150;
      this.modalHeight = 250;
    },

    events: {
      'click .confirm-btn': 'handleConfirm',
      'click .cancel-btn': 'handleCancel'
    },

    handleConfirm: function () {
      this.trigger('confirm');
      this.hideModal();
    },

    handleCancel: function () {
      this.hideModal();
    },

    sizeModal: function () {
      var self = this;
      var modalMarginTop = ((window.innerHeight - this.modalHeight - this.currentTopPos) / 2);
      this.$modal.css('margin-top', modalMarginTop + 'px');
      this.$el.find('#basicQuestionModalContentContainer').width(500);
      this.$el.find('#basicQuestionModalContentContainer').css('left', '50px');
    },

    render: function () {
      var self = this;
      this.$el.html(BasicQuestionModalTpl({
        showConfirm: this.showConfirm,
        showCancel: this.showConfirm,
        cancelBtnText: this.cancelBtnText,
        confirmBtnText: this.confirmBtnText,
        message: this.message
      }));
      this.$modal = this.$el.find('#basicQuestionModalView');
      this.sizeModal();
    }
  });

  return BasicQuestionModal;

});
