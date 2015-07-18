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

        setProjectType: function (type) {
            var self = this;
            this.projectType = type;
        },

        errorHandler: function(resp, status, xhr) {
            console.log('AJAX ERROR: ', xhr, resp);
        },

		populateFeed: function (resp, status, xhr) {

            view.POST_VIEWS = [];
            view.$el.find('.project-feed-list').empty();
            for (var i = 0; i < resp.length; i++) {
                view.addPost();
            }
		},

        addPost: function() {

            var projectPostView = new ProjectPostView({
                tagName: 'li'
            });

            projectPostView.render();

            var projectPostEl = projectPostView.el;

            this.$el.find('.project-feed-list').append(projectPostEl);

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
