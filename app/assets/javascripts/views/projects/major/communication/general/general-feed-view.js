define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/communication/communication-feed-view',
    'views/projects/major/communication/general/general-feed-item-view',
	'stache!views/projects/major/communication/general/general-feed-view'
    ], function ($,
     Backbone,
     _,
     CommunicationFeedView,
     GeneralFeedItemView,
     GeneralFeedViewTpl) {
	'use strict';

	var GeneralFeedView = CommunicationFeedView.extend({

		initialize: function () {
		},

		events: {},

        getMainListElement: function () {
            return this.$el.find('#generalFeedListView');
        },

        getFeedItemView: function () {
            return new GeneralFeedItemView({
                tagName: 'li'
            });
        },

        render: function (options) {
			var self = this;
            this.noCommentsShown = options && options.showNoComments;
            this.$el.html(GeneralFeedViewTpl({
                showNoComments: this.noCommentsShown
            }));
        }
	});

	return GeneralFeedView;

});
