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