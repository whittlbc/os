define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/general-feed/general-feed-container-view',
    'views/projects/major/suggestions-feed/suggestions-feed-container-view',
    'views/projects/major/team-feed/team-feed-container-view',
    'views/projects/major/admin-feed/admin-feed-container-view',
    'stache!views/projects/major/communication-view'
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

		initialize: function (options) {
		    this.height = options.height;
            this.activeTab = 0;
        },

		events: {
            'click .communication-tab': 'handleTabClick'
        },

        handleTabClick: function (e) {
            var selectedIndex = Number($(e.currentTarget).attr('index'));
            if (this.activeTab != selectedIndex) {
                this.activeTab = selectedIndex;
                this.render();
            }
        },

        setHeight: function () {
            this.$el.find('#communicationFeedContainer').height(this.height);
        },

		render: function () {
			var self = this;
            this.$el.html(CommunicationViewTpl({
                showGeneral: this.activeTab == 0,
                showSuggestions: this.activeTab == 1,
                showTeam: this.activeTab == 2,
                showAdmin: this.activeTab == 3
            }));

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

            this.setHeight();
        }
	});

	return CommunicationView;

});
