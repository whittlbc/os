define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/admin-feed/admin-feed-view',
	'stache!views/projects/major/admin-feed/admin-feed-container-view'
    ], function ($,
     Backbone,
     _,
     AdminFeedView,
     AdminFeedContainerViewTpl) {
	'use strict';

	var AdminFeedContainerView = Backbone.View.extend({

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
