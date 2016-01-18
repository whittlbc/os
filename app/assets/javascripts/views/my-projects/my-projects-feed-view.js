define(['jquery',
  'backbone',
  'underscore',
  'views/my-projects/my-projects-item-view',
  'stache!views/my-projects/my-projects-feed-view'
], function ($,
             Backbone,
             _,
             MyProjectsItemView,
             MyProjectsFeedViewTpl) {
  'use strict';

  var MyProjectsFeedView = Backbone.View.extend({

    initialize: function () {
    },

    events: {},

    populate: function (projects) {
      // populate owned projects
      if (projects.own.length > 0) {
        this.$el.find('#owned-projects-list').empty();
        for (var i = 0; i < projects.own.length; i++) {
          this.addProject(projects.own[i], 0);
        }
      }

      // populate contributions
      if (projects.contribute.length > 0) {
        this.$el.find('#contributing-projects-list').empty();
        for (var j = 0; j < projects.contribute.length; j++) {
          this.addProject(projects.contribute[j], 1);
        }
      }
    },

    addProject: function (data, listInt) {
      var self = this;
      var myProjectsItemView = new MyProjectsItemView({
        tagName: 'li',
        data: data
      });
      this.setListener(myProjectsItemView, data);
      myProjectsItemView.render();
      var $list = (listInt === 0) ? this.$el.find('#owned-projects-list') : this.$el.find('#contributing-projects-list');
      $list.append(myProjectsItemView.el);
    },

    setListener: function (view, data) {
      view.$el.click(function (e) {
        Backbone.EventBroker.trigger('force-hide-my-projects-modal', data.uuid, e);
      });
    },

    render: function () {
      var self = this;
      this.$el.html(MyProjectsFeedViewTpl());
    }
  });

  return MyProjectsFeedView;

});
