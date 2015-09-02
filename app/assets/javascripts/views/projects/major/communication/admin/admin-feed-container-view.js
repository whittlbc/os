define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/communication/communication-feed-container-view',
    'views/projects/major/communication/admin/admin-feed-view',
	'stache!views/projects/major/communication/admin/admin-feed-container-view'
    ], function ($,
     Backbone,
     _,
     CommunicationFeedContainerView,
     AdminFeedView,
     AdminFeedContainerViewTpl) {
	'use strict';

	var AdminFeedContainerView = CommunicationFeedContainerView.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(AdminFeedContainerViewTpl());

            this.adminFeedView = new AdminFeedView({
                el: '#adminFeedView'
            });
            this.adminFeedView.render();
		}
	});

	return AdminFeedContainerView;

});
