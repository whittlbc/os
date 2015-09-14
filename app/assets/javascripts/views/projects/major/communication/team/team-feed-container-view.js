define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/communication/communication-feed-container-view',
    'views/projects/major/communication/team/team-feed-view',
	'stache!views/projects/major/communication/team/team-feed-container-view'
    ], function ($,
     Backbone,
     _,
     CommunicationFeedContainerView,
     TeamFeedView,
     TeamFeedContainerViewTpl) {
	'use strict';

	var TeamFeedContainerView = CommunicationFeedContainerView.extend({

		initialize: function () {
		},

		events: {},

        passComments: function (comments) {
            var self = this;
            this.teamFeedView.passComments(comments);
        },

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
