define(['jquery',
  'backbone',
  'underscore',
  'views/tutorial/tutorial-item',
  'stache!views/tutorial/login-item',
  'backbone-eventbroker'
], function ($,
             Backbone,
             _,
             TutorialItem,
             LoginItemTpl) {
  'use strict';

  var LoginItem = TutorialItem.extend({

    initialize: function () {
    },

    events: {
      'click [data-trigger=login]': 'onLoginClick',
      'click [data-trigger=ignore]': 'onIgnoreClick'
    },

    onLoginClick: function () {
      if (!this.clicked) {
        this.clicked = true;
        this.trigger('next');
        setTimeout(function () {
          Backbone.EventBroker.trigger('header-login-btn-clicked');
        }, 230);
      }
    },

    onIgnoreClick: function () {
      if (!this.clicked) {
        this.clicked = true;
        this.trigger('next');
      }
    },

    render: function () {
      this.$el.html(LoginItemTpl());
    }
  });

  return LoginItem;

});
