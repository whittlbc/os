define(['jquery',
  'backbone',
  'underscore',
  'views/modals/modal-view',
  'views/add-implementation/add-implementation-view',
  'stache!views/modals/add-implementation-modal'
], function ($,
   Backbone,
   _,
   ModalView,
   AddImplementationView,
   AddImplementationModalTpl) {
  'use strict';

  var AddImplementationModal = ModalView.extend({

    initialize: function () {
      this.currentTopPos = 135;
      this.addImplementationModalHeight = 380;
      this.isSafari = $('body').attr('browser') === 'safari';
    },

    events: {
      'click .close': 'heardCloseClick'
    },

    heardCloseClick: function () {
      this.trigger('close-btn:clicked');
    },

    sizeModal: function () {
      var addImplementationModalMarginTop = ((window.innerHeight - this.addImplementationModalHeight - this.currentTopPos) / 2);
      this.$modal.css('margin-top', addImplementationModalMarginTop + 'px');
      this.$el.find('#addImplementationModalContentContainer').width((this.isSafari ? 638 : 620));
    },

    render: function () {
      var self = this;

      this.$el.html(AddImplementationModalTpl());

      this.$modal = this.$el.find('#addImplementationModalView');

      this.sizeModal();

      this.addImplementationFeedView = new AddImplementationView({
        el: this.$el.find('#addImplementationContentView')
      });

      this.listenTo(this.addImplementationFeedView, 'confirm', function () {
        self.trigger('confirm');
      });

      this.addImplementationFeedView.render();

    }
  });

  return AddImplementationModal;

});
