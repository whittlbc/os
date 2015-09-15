define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/communication/communication-feed-view',
    'views/projects/major/communication/team/team-feed-item-view',
    'stache!views/projects/major/communication/team/team-feed-view'
    ], function ($,
     Backbone,
     _,
     CommunicationFeedView,
     TeamFeedItemView,
     TeamFeedViewTpl) {
	'use strict';

	var TeamFeedVIew = CommunicationFeedView.extend({

		initialize: function () {
		},

		events: {},

        getMainListElement: function () {
            return this.$el.find('#teamFeedListView');
        },

        getFeedItemView: function () {
            return new TeamFeedItemView({
                tagName: 'li'
            });
        },

        render: function (options) {
            var self = this;
            this.noCommentsShown = options && options.showNoComments;
            this.$el.html(TeamFeedViewTpl({
                showNoComments: this.noCommentsShown
            }));
        }
	});

	return TeamFeedVIew;

});
