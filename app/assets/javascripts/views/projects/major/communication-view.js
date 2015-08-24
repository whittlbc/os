define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/general-feed/general-feed-container-view',
    'views/projects/major/suggestions-feed/suggestions-feed-container-view',
    'views/projects/major/team-feed/team-feed-container-view',
    'views/projects/major/admin-feed/admin-feed-container-view',
    'stache!views/projects/major/communication-container-view'
    ], function ($,
     Backbone,
     _,
     GeneralFeedContainerView,
     SuggestionsFeedContainerView,
     TeamFeedContainerView,
     AdminFeedContainerView,
     CommunicationViewTpl) {
	'use strict';

	var CommunicationView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(CommunicationViewTpl());

            this.generalFeedContainerView = new GeneralFeedContainerView({
                el: '#generalFeedContainerView'
            });
            this.generalFeedContainerView.render();

            this.suggestionsFeedContainerView = new SuggestionsFeedContainerView({
                el: '#suggestionsFeedContainerView'
            });
            this.suggestionsFeedContainerView.render();

            this.teamFeedContainerView = new TeamFeedContainerView({
                el: '#teamFeedContainerView'
            });
            this.teamFeedContainerView.render();

            this.adminFeedContainerView = new AdminFeedContainerView({
                el: '#adminFeedContainerView'
            });
            this.adminFeedContainerView.render();
		}
	});

	return CommunicationView;

});
