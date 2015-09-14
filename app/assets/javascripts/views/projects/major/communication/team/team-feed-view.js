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
     TeamFeedVIewTpl) {
	'use strict';

	var TeamFeedVIew = CommunicationFeedView.extend({

		initialize: function () {
		},

		events: {},

        passComments: function (comments) {
            console.log(comments);
        },

		render: function () {
			var self = this;
            this.$el.html(TeamFeedVIewTpl());
		}
	});

	return TeamFeedVIew;

});
