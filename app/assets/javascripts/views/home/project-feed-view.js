define(['jquery',
	'backbone',
	'underscore',
    'views/home/project-post-view',
	'stache!views/home/project-feed-view',
    ], function ($,
     Backbone,
     _,
     ProjectPostView,
     ProjectFeedViewTpl) {
	'use strict';

	var ProjectFeedView = Backbone.View.extend({

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
            window.location = '/projects';
        },

		render: function () {
			var self = this;
            this.$el.html(ProjectFeedViewTpl());
            this.populateFeed();
		}
	});

	return ProjectFeedView;

});
