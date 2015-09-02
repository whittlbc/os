define(['jquery',
    'backbone',
    'underscore',
    'views/projects/major/communication/general/general-feed-container-view',
    'views/projects/major/communication/suggestions/suggestions-feed-container-view',
    'views/projects/major/communication/team/team-feed-container-view',
    'views/projects/major/communication/admin/admin-feed-container-view',
    'stache!views/projects/major/communication/communication-panels-view',
], function ($,
     Backbone,
     _,
     GeneralFeedContainerView,
     SuggestionsFeedContainerView,
     TeamFeedContainerView,
     AdminFeedContainerView,
     CommunicationPanelsViewTpl) {
    'use strict';

    var CommunicationPanelsView = Backbone.View.extend({

        initialize: function () {
        },

        events: {},

        render: function (options) {
            var self = this;
            var generalActive;

            if (options && options.hasOwnProperty('activePanel')) {
                generalActive = options.activePanel == 0;
            } else {
                generalActive = true;
            }

            this.$el.html(CommunicationPanelsViewTpl({
                generalActive: generalActive,
                suggestionsActive: options && options.activePanel == 1,
                teamActive: options && options.activePanel == 2,
                adminActive: options && options.activePanel == 3
            }));

            this.generalFeedContainerView = new GeneralFeedContainerView({
                el: '#generalFeedContainerView'
            });

            this.suggestionsFeedContainerView = new SuggestionsFeedContainerView({
                el: '#suggestionsFeedContainerView'
            });

            this.teamFeedContainerView = new TeamFeedContainerView({
                el: '#teamFeedContainerView'
            });

            this.adminFeedContainerView = new AdminFeedContainerView({
                el: '#adminFeedContainerView'
            });

            if (options && options.hasOwnProperty('activePanel')) {

                switch (options.activePanel) {
                    case 0:
                        this.generalFeedContainerView.render();
                        break;
                    case 1:
                        this.suggestionsFeedContainerView.render();
                        break;
                    case 2:
                        this.teamFeedContainerView.render();
                        break;
                    case 3:
                        this.adminFeedContainerView.render();
                        break;
                    default:
                        this.generalFeedContainerView.render();
                }
            } else {
                this.generalFeedContainerView.render();
            }
        }
    });

    return CommunicationPanelsView;

});
