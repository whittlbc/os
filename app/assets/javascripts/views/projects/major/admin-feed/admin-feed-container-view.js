define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/major/admin-feed/admin-feed-container-view'
    ], function ($,
     Backbone,
     _,
     AdminFeedContainerViewTpl) {
	'use strict';

	var AdminFeedContainerView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(AdminFeedContainerViewTpl());
		}
	});

	return AdminFeedContainerView;

});
