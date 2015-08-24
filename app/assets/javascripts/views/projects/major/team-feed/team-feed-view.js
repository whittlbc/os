define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/team-feed/team-feed-item-view',
    'stache!views/projects/major/team-feed/team-feed-view'
    ], function ($,
     Backbone,
     _,
     TeamFeedItemView,
     TeamFeedVIewTpl) {
	'use strict';

	var TeamFeedVIew = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(TeamFeedVIewTpl());
		}
	});

	return TeamFeedVIew;

});
