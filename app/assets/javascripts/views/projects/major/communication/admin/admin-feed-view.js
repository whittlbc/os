define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/communication/communication-feed-view',
    'views/projects/major/communication/admin/admin-feed-item-view',
	'stache!views/projects/major/communication/admin/admin-feed-view'
    ], function ($,
     Backbone,
     _,
     CommunicationFeedView,
     AdminFeedItemView,
     AdminFeedViewTpl) {
	'use strict';

	var AdminFeedView = CommunicationFeedView.extend({

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
