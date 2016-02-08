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
      var self = this;
      this.$list.empty();

      if (_.isEmpty(projects)) {
        this.$el.find('.no-others-exist').show();
      } else {
        this.$el.find('.no-others-exist').hide();
        for (var i = 0; i < projects.length; i++) {
          this.addProject(projects[i]);
        }
      }
    },

    addProject: function (data) {
      var myProjectsItemView = new MyProjectsItemView({
        tagName: 'li',
        data: data
      });

      this.setListener(myProjectsItemView, data);

      myProjectsItemView.render();

      this.$list.append(myProjectsItemView.el);
    },

    setListener: function (view, data) {
      view.$el.click(function (e) {
        Backbone.EventBroker.trigger('force-hide-my-projects-modal', data.uuid, e);
      });
    },

    render: function () {
      this.$el.html(MyProjectsFeedViewTpl());
      this.$list = this.$el.find('#my-projects-feed-list');
    }
  });

  return MyProjectsFeedView;

});
