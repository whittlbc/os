define(['jquery',
  'backbone',
  'underscore',
  'stache!views/contributors/contributors-feed-item-view'
], function ($,
             Backbone,
             _,
             ContributorsFeedItemViewTpl) {
  'use strict';

  var ContributorsFeedItemView = Backbone.View.extend({

    initialize: function () {
    },

    events: {},

    setData: function (data) {
      this.data = data;
    },

    openContributorGHPage: function () {
      if (!this.anon) {
        window.open(this.data.html_url);
      }
    },

    addListeners: function () {
      var self = this;
      this.$el.find('.contributors-feed-item-pic').click(function () {
        self.openContributorGHPage();
      });
      this.$el.find('.name > span').click(function () {
        self.openContributorGHPage();
      });
    },

    render: function (options) {
      options = options || {};
      var self = this;
      this.anon = options.anon;

      this.$el.html(ContributorsFeedItemViewTpl({
        ghUsername: this.data.login,
        pic: this.data.avatar_url,
        showContributions: this.data.hasOwnProperty('contributions'),
        contributions: this.data.contributions,
        singular: this.data.contributions == 1,
        anon: options.anon
      }));

      this.addListeners();
    }
  });

  return ContributorsFeedItemView;

});
