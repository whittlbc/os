define(['jquery',
  'backbone',
  'underscore',
  'views/modals/modal-view',
  'views/login/login-view',
  'stache!views/modals/login-modal'
], function ($,
             Backbone,
             _,
             ModalView,
             LoginView,
             LoginModalTpl) {
  'use strict';

  var LoginModal = ModalView.extend({

    initialize: function () {
      this.currentTopPos = 230;
      this.loginModalHeight = 150;
    },

    events: {},

    setMessage: function (message) {
      var self = this;
      this.loginView.render({message: message});
    },

    sizeModal: function () {
      var self = this;
      var loginModalMarginTop = ((window.innerHeight - this.loginModalHeight - this.currentTopPos) / 2);
      this.$modal.css('margin-top', loginModalMarginTop + 'px');
      this.$el.find('#loginModalContentContainer').width(500);
      this.$el.find('#loginModalContentContainer').css('left', '50px');
    },

    render: function () {
      var self = this;
      this.$el.html(LoginModalTpl());

      this.$modal = this.$el.find('#loginModalView');

      this.sizeModal();

      this.loginView = new LoginView({
        el: self.$el.find('#loginModalContent')
      });
      this.loginView.render();
    }
  });

  return LoginModal;

});
