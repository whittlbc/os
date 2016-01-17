define(['jquery',
  'backbone',
  'underscore',
  'views/tutorial/tutorial-item',
  'stache!views/tutorial/login-item'
], function ($,
             Backbone,
             _,
             TutorialItem,
             LoginItemTpl) {
  'use strict';

  var LoginItem = TutorialItem.extend({

    initialize: function () {
    },

    render: function () {
      this.$el.html(LoginItemTpl());
    }
  });

  return LoginItem;

});
