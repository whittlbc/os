define(['jquery',
  'backbone',
  'underscore',
  'views/contributors/contributors-feed-item-view',
  'stache!views/contributors/contributors-feed-view'
], function ($,
             Backbone,
             _,
             ContributorsFeedItemView,
             ContributorsFeedViewTpl) {
  'use strict';

  var ContributorsFeedView = Backbone.View.extend({

    initialize: function () {
    },

    events: {},

    setAnonStatus: function (bool) {
      this.anon = bool;
    },

    reEmptyAllLists: function () {
      var self = this;
      this.$el.find('#contributors-feed-admin-list').empty();
      this.$el.find('#contributors-feed-others-list').empty();
    },

    populate: function (data) {
      var contribs = data.contribs;

      this.reEmptyAllLists();

      for (var i = 0; i < contribs.admin.length; i++) {
        this.addContrib(contribs.admin[i], 0, data.showContributions);
      }

      if (_.isEmpty(contribs.others)) {
        this.$el.find('.no-others-exist').show();
      } else {
        this.$el.find('.no-others-exist').hide();

        for (var j = 0; j < contribs.others.length; j++) {
          this.addContrib(contribs.others[j], 1, data.showContributions);
        }
      }
    },

    addContrib: function (data, listInt, showContributions) {
      var self = this;
      var contribFeedItemView = new ContributorsFeedItemView({
        tagName: 'li',
        showContributions: showContributions
      });
      contribFeedItemView.setData(data);
      contribFeedItemView.render({
        anon: listInt === 0 && this.anon
      });
      var $list = (listInt === 0) ? this.$el.find('#contributors-feed-admin-list') : this.$el.find('#contributors-feed-others-list');
      $list.append(contribFeedItemView.el);
    },

    render: function () {
      var self = this;
      this.$el.html(ContributorsFeedViewTpl());
    }
  });

  return ContributorsFeedView;

});
