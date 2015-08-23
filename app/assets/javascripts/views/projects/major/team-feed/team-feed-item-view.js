define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/major/team-feed/team-feed-item-view'
    ], function ($,
     Backbone,
     _,
     TeamFeedItemViewTpl) {
	'use strict';

	var TeamFeedItemView = Backbone.View.extend({

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
