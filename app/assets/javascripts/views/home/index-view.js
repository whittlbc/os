define(['jquery',
	'backbone',
	'underscore',
    'views/os.view',
    'views/home/project-feed-view',
    'models/project',
    'stache!views/home/index-view',
], function ($,
     Backbone,
     _,
     OSView,
     ProjectFeedView,
     Project,
     IndexViewTpl
     ) {
	'use strict';

	var IndexView = OSView.extend({

		initialize: function () {
            this.osInitialize();
		},

		events: {
            'click [data-trigger=popup]': 'onShowPopup'
        },

        onShowPopup: function () {
            this.showLoginPopup();
        },

        showShouldStartFeed: function () {
            var self = this;
            var project = new Project();
            this.projectFeedView.setProjectType('shouldStart')
            project.fetchFeedProjects({success: self.projectFeedView.populateFeed, error: self.projectFeedView.errorHandler});
        },

        showStartingFeed: function () {
            var self = this;
            var project = new Project();
            this.projectFeedView.setProjectType('starting')
            project.fetchFeedProjects({success: self.projectFeedView.populateFeed, error: self.projectFeedView.errorHandler});
        },

        showStartedFeed: function () {
            var self = this;
            var project = new Project();
            this.projectFeedView.setProjectType('started')
            project.fetchFeedProjects({success: self.projectFeedView.populateFeed, error: self.projectFeedView.errorHandler});
        },

		render: function () {
			var self = this;
            this.$el.html(IndexViewTpl({
            }));

            this.projectFeedView = new ProjectFeedView({
                el: '#project-feed'
            });

            this.projectFeedView.render();
		}
	});

	return IndexView;

});