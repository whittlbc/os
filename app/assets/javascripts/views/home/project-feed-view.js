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
     ProjectFeedViewTpl) {
	'use strict';

	var ProjectFeedView = Backbone.View.extend({

        errorHandler: function(resp, status, xhr) {
            console.log('AJAX ERROR: ', xhr, resp);
        },

		populateFeed: function () {

            if (this.POST_VIEWS) {
                while (this.POST_VIEWS.length > 0) {
                    this.POST_VIEWS.pop();
                }
            } else {
                this.POST_VIEWS = [];
            }

            for (var i = 0; i < 10; i++) {
                this.addPost();
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
            var project = new Project();
            project.create({title: 'FUCK YEAHHH'}, {success: self.createProjectSuccess, error: self.errorHandler});
        },

        createProjectSuccess: function(resp, status, xhr) {
            console.log('Successfully created new project');
        },

		render: function () {
			var self = this;
            this.$el.html(ProjectFeedViewTpl());
            this.populateFeed();
		}
	});

	return ProjectFeedView;

});
