define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/communication/communication-feed-item-view',
    'stache!views/projects/major/communication/team/team-feed-item-view'
    ], function ($,
     Backbone,
     _,
     CommunicationFeedItemView,
     TeamFeedItemViewTpl) {
	'use strict';

	var TeamFeedItemView = CommunicationFeedItemView.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(TeamFeedItemViewTpl());
		}
	});

	return TeamFeedItemView;

});
