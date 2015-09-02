define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/communication/communication-feed-item-view',
    'stache!views/projects/major/communication/admin/admin-feed-item-view'
    ], function ($,
     Backbone,
     _,
     CommunicationFeedItemView,
     AdminFeedItemViewTpl) {
	'use strict';

	var AdminFeedItemView = CommunicationFeedItemView.extend({

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
