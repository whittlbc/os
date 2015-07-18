define(['jquery',
	'backbone',
	'underscore',
    'models/project',
    'views/home/project-post-view',
	'stache!views/home/project-feed-view',
    ], function ($,
     Backbone,
     _,
     Project,
     ProjectPostView,
     ProjectFeedViewTpl
     ) {
	'use strict';

    var view;

	var ProjectFeedView = Backbone.View.extend({

        initialize: function() {
            view = this;
        },

        setProjectTypeStatus: function (val) {
            var self = this;
            this.projectTypeStatus = val;
        },

        errorHandler: function(resp, status, xhr) {
            console.log('AJAX ERROR: ', xhr, resp);
        },

		handleFetchProjects: function (resp, status, xhr) {
            view.populateFeed(resp);
		},

        handleShowNewProject: function (data) {
            // only immediately show the newly created project if the type of project they created matches the others in the current feed
            if (data.status == this.projectTypeStatus) {
                var self = this;
                this.$el.find('.project-feed-list').empty();
                this.unshiftNewPostToPostViews(data);
                var newViewsArray = [];
                for (var i = 0; i < this.POST_VIEWS.length; i++) {
                    var projectPostView = this.POST_VIEWS[i];
                    projectPostView.setData(this.POST_VIEWS[i].data);
                    projectPostView.render();
                    this.$el.find('.project-feed-list').append(projectPostView.el);
                    newViewsArray.push(projectPostView);
                }
                this.POST_VIEWS = newViewsArray;
            }
        },

        unshiftNewPostToPostViews: function(data) {
            var projectPostView = new ProjectPostView({
                tagName: 'li'
            });
            projectPostView.setData(data);
            this.POST_VIEWS.unshift(projectPostView);
        },

        populateFeed: function (projects) {
            var self = this;
            this.POST_VIEWS = [];
            this.$el.find('.project-feed-list').empty();
            for (var i = 0; i < projects.length; i++) {
                this.addPost(projects[i]);
            }
        },

        addPost: function(data) {
            var projectPostView = new ProjectPostView({
                tagName: 'li'
            });
            projectPostView.setData(data);
            projectPostView.render();
            this.$el.find('.project-feed-list').append(projectPostView.el);
            this.POST_VIEWS.push(projectPostView);
        },

		events: {
            'click .project-post-view': 'onSelectProject'
        },

        onSelectProject: function() {
            var self = this;
        },

        createProjectSuccess: function(resp, status, xhr) {
            console.log('Successfully created new project');
        },

        updateProjectSuccess: function(resp, status, xhr) {
            console.log('Successfully updated project');
        },

        deleteProjectSuccess: function(resp, status, xhr) {
            console.log('Successfully deleted project');
        },

		render: function () {
			var self = this;
            this.$el.html(ProjectFeedViewTpl());
		}
	});

	return ProjectFeedView;

});
