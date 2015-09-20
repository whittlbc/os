define(['jquery',
	'backbone',
	'underscore',
    'views/contributors/contributors-feed-view',
	'stache!views/contributors/contributors-feed-container-view'
    ], function ($,
     Backbone,
     _,
     ContributorsFeedView,
     ContributorsFeedContainerViewTpl) {
	'use strict';

	var ContributorsFeedContainerView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

        populate: function (data) {
            var self = this;
            this.contributorsFeedView.populate(data);
        },

		render: function () {
			var self = this;
            this.$el.html(ContributorsFeedContainerViewTpl());

            this.contributorsFeedView = new ContributorsFeedView({
                el: this.$el.find('#contributorsFeedView')
            });

            this.contributorsFeedView.render();
		}
	});

	return ContributorsFeedContainerView;

});
