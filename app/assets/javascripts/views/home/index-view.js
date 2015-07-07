define(['jquery',
	'backbone',
	'underscore',
    'views/home/project-feed-view',
    'models/project',
	'stache!views/home/index-view'
    ], function ($,
     Backbone,
     _,
     ProjectFeedView,
     Project,
     IndexViewTpl) {
	'use strict';

	var IndexView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(IndexViewTpl({
            }));

            this.projectFeedView = new ProjectFeedView({
                el: '#project-feed'
            });

            this.projectFeedView.render();

            var project = new Project();

            project.fetchFeedProjects({success: self.projectFeedView.populateFeed, error: self.projectFeedView.errorHandler});

		}
	});

	return IndexView;

});