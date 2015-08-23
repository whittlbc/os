define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/major/team-feed/team-feed-container-view'
    ], function ($,
     Backbone,
     _,
     TeamFeedContainerViewTpl) {
	'use strict';

	var TeamFeedContainerView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(TeamFeedContainerViewTpl());
		}
	});

	return TeamFeedContainerView;

});
