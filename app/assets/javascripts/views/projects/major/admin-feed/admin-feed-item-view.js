define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/major/admin-feed/admin-feed-item-view'
    ], function ($,
     Backbone,
     _,
     AdminFeedItemViewTpl) {
	'use strict';

	var AdminFeedItemView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(AdminFeedItemViewTpl());
		}
	});

	return AdminFeedItemView;

});
