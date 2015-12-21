define(['jquery',
  'backbone',
  'underscore',
  'models/user',
  'stache!views/login/login-view'
], function ($,
             Backbone,
             _,
             User,
             LoginViewTpl) {
  'use strict';

  var LoginView = Backbone.View.extend({

    initialize: function () {
      this.popupContainerHeight = 150;
    },

    events: {
      'blur [name=username]': 'checkUsername',
      'click .login-btn': 'onLoginClicked',
      'click .signup-btn': 'onSignUpClicked',
      'click .gh-login-btn': 'onGHLogin',
      'click button': 'hidePopup'
    },

    errorHandler: function (resp, status, xhr) {
      console.log('AJAX ERROR: ', xhr, resp);
    },

    setSizeForPopup: function () {
      var self = this;
      this.$el.find('.login-modal-body').height(this.popupContainerHeight);
    },

    onLoginSuccess: function (resp, status, xhr) {
      if (resp.exists) {
        // prepare to navigate to home page
        console.log('LOGIN SUCCESS!')
      } else {
        console.log('USERNAME OR PASSWORD IS WRONG')
      }
    },

    onSignUpSuccess: function () {
      console.log('SIGN UP SUCCESS');
    },

    checkUsernameResponse: function (resp, status, xhr) {
      console.log(resp);
    },

    hidePopup: function () {
      var self = this;
      this.trigger('hidePopup');
    },

    checkUsername: function () {
      var self = this;
      var username = this.$el.find('[name=username]').val().trim();
      if (username != '') {
        var user = new User();
        user.checkUsername({
          username: username
        }, {
          success: self.checkUsernameResponse,
          error: self.errorHandler
        });
      }
    },

    onLoginClicked: function () {
      var self = this;
      var username_or_email = this.$el.find('[name=username_or_email]').val();
      var password = this.$el.find('[name=password]').val();
      var user = new User();
      user.login({
        username_or_email: username_or_email,
        password: password
      }, {
        success: self.onLoginSuccess,
        error: self.errorHandler
      });
    },

    onSignUpClicked: function () {
      var self = this;
      var password = this.$el.find('[name=new-password]').val();
      var rePassword = this.$el.find('[name=retype-password]').val();
      if (password == rePassword) {
        var user = new User();
        user.signup({
          username: this.$el.find('[name=username]').val(),
          //gh_username: this.$el.find('[name=gh_username]').val(),
          email: this.$el.find('[name=new-email]').val(),
          password: this.$el.find('[name=new-password]').val()
        }, {
          success: self.onSignUpSuccess,
          error: self.errorHandler
        });
      } else {
        console.log('PASSWORDS DONT MATCH');
      }
    },

    onGHLogin: function (e) {
      Backbone.EventBroker.trigger('login:gh');
      $(e.currentTarget).find('.btn-text').html('Connecting...');
    },

    render: function (options) {
      var self = this;
      options = options || {};

      this.$el.html(LoginViewTpl({
        message: options.message ? options.message : 'You need to be logged in to perform this action.'
      }));

      this.setSizeForPopup();
    }
  });

  return LoginView;

});
