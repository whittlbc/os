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

        getMainListElement: function () {
            return this.$el.find('#adminFeedListView');
        },

        getFeedItemView: function () {
            return new AdminFeedItemView({
                tagName: 'li'
            });
        },

        render: function (options) {
            var self = this;
            this.noCommentsShown = options && options.showNoComments;
            this.$el.html(AdminFeedViewTpl({
                showNoComments: this.noCommentsShown
            }));
        }
	});

	return AdminFeedView;

});
