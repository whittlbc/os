define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/admin-feed/admin-feed-item-view',
	'stache!views/projects/major/admin-feed/admin-feed-view'
    ], function ($,
     Backbone,
     _,
     AdminFeedItemView,
     AdminFeedViewTpl) {
	'use strict';

	var AdminFeedView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(AdminFeedViewTpl());
		}
	});

	return AdminFeedView;

});
