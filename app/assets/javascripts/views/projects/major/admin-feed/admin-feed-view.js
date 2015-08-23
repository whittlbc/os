define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/major/admin-feed/admin-feed-view'
    ], function ($,
     Backbone,
     _,
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
