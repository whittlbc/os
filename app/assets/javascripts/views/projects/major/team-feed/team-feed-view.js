define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/major/team-feed/team-feed-view'
    ], function ($,
     Backbone,
     _,
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
