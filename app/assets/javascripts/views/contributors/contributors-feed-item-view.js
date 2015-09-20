define(['jquery',
	'backbone',
	'underscore',
	'stache!views/contributors/contributors-feed-item-view'
    ], function ($,
     Backbone,
     _,
     ContributorsFeedItemViewTpl) {
	'use strict';

	var ContributorsFeedItemView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

        setData: function (data) {
            this.data = data;
        },

        openContributorGHPage: function () {
            var self = this;
            window.open(this.data.html_url);
        },

        addListeners: function () {
            var self = this;
            this.$el.find('.contributors-feed-item-pic').click(function () {
                self.openContributorGHPage();
            });
            this.$el.find('.name > span').click(function () {
                self.openContributorGHPage();
            });
        },

		render: function () {
			var self = this;
            this.$el.html(ContributorsFeedItemViewTpl({
                ghUsername: this.data.login,
                pic: this.data.avatar_url,
                contributions: this.data.contributions,
                singular: this.data.contributions == 1
            }));

            this.addListeners();
		}
	});

	return ContributorsFeedItemView;

});
