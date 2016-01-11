define(['jquery',
  'backbone',
  'underscore',
  'models/project',
  'models/os.util',
  'models/all-langs',
  'views/home/project-post-view',
  'stache!views/home/project-feed-view',
], function ($,
             Backbone,
             _,
             Project,
             OSUtil,
             AllLangs,
             ProjectPostView,
             ProjectFeedViewTpl) {
  'use strict';

  var ProjectFeedView = Backbone.View.extend({

    initialize: function () {
      this.getAllLanguages();
    },

    getAllLanguages: function () {
      this.allLangs = AllLangs.getAll();
      this.colors_and_initials = this.allLangs.colors_and_initials;
    },

    setProjectTypeStatus: function (val) {
      var self = this;
      this.projectTypeStatus = val;
      this.$el.find('.project-feed-list').attr('data-project-type', val);
    },

    errorHandler: function (resp, status, xhr) {
      console.log('AJAX ERROR: ', xhr, resp);
    },

    showNoProjects: function () {
      this.$el.find('.toggle-sort-type-container').hide();
      this.$el.find('.no-project-results').show();
    },

    hideNoProjects: function () {
      this.$el.find('.no-project-results').hide();
      this.$el.find('.toggle-sort-type-container').show();
    },

    handleFetchProjects: function (data) {
      var self = this;
      this.populateFeed(data);
      setTimeout(function () {
        self.trigger('projects:populated');
      }, 5);
    },

    populateFeed: function (projects) {
      var self = this;
      this.POST_VIEWS = [];
      this.$el.find('.project-feed-list').empty();
      if (_.isEmpty(projects)) {
        this.showNoProjects();
      } else {
        this.hideNoProjects();
        this.$el.find('.no-project-results').hide();
        for (var i = 0; i < projects.length; i++) {
          this.addPost(projects[i]);
        }
      }
    },

    addPost: function (data) {
      var projectPostView = new ProjectPostView({
        tagName: 'li'
      });
      projectPostView.setData(data);
      this.setProjectListeners(projectPostView);
      projectPostView.render();
      this.$el.find('.project-feed-list').append(projectPostView.el);
      this.POST_VIEWS.push(projectPostView);
    },

    setProjectListeners: function (projectPostView) {
      var self = this;
      this.listenTo(projectPostView, 'addTags', function (postView) {
        self.colorsForTags(postView);
      });
    },

    colorsForTags: function (postView) {
      var self = this;
      var namesAndColorsArray = [];
      if (Array.isArray(postView.langs_and_frames)) {
        for (var i = 0; i < postView.langs_and_frames.length; i++) {
          var entry = self.colors_and_initials[postView.langs_and_frames[i]];
          if (entry) {
            namesAndColorsArray.push({
              name: postView.langs_and_frames[i],
              color: entry["color"]
            });
          }
        }
      }
      postView.addTags(namesAndColorsArray);
    },

    events: {
      'click .project-post-view': 'onSelectProject',
      'click .feed-sort-type-btn': 'handleSortTypeClick'
    },

    handleSortTypeClick: function (e) {
      var self = this;
      if (!$(e.currentTarget).hasClass('active')) {
        this.$el.find('.feed-sort-type-btn').removeClass('active');
        $(e.currentTarget).addClass('active');
        var sortType = (e.currentTarget.id === 'time') ? OSUtil.SORT_BY_TIME : OSUtil.SORT_BY_VOTES;
        Backbone.EventBroker.trigger('projects:fetch-by-sort-type', sortType);
      }
    },

    onSelectProject: function () {
      var self = this;
    },

    render: function () {
      var self = this;
      this.$el.html(ProjectFeedViewTpl());
    }
  });

  return ProjectFeedView;

});
