define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/team-feed/team-feed-view',
	'stache!views/projects/major/team-feed/team-feed-container-view'
    ], function ($,
     Backbone,
     _,
     TeamFeedView,
     TeamFeedContainerViewTpl) {
	'use strict';

	var TeamFeedContainerView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(TeamFeedContainerViewTpl());

            this.teamFeedView = new TeamFeedView({
                el: '#teamFeedView'
            });
            this.teamFeedView.render();
		}
	});

	return TeamFeedContainerView;

});
