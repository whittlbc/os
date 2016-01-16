define(['jquery',
  'backbone',
  'underscore',
  'stache!views/rules/rules-view'
], function ($,
             Backbone,
             _,
             RulesViewTpl) {
  'use strict';

  var RulesView = Backbone.View.extend({

    initialize: function () {
    },

    events: {
      'click .got-it-btn': 'heardGotIt'
    },

    heardGotIt: function () {
      this.trigger('confirm');
    },

    render: function () {
      this.$el.html(RulesViewTpl());
    }
  });

  return RulesView;

});