define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/communication/communication-feed-item-view',
    'stache!views/projects/major/communication/general/general-feed-item-view'
    ], function ($,
     Backbone,
     _,
     CommunicationFeedItemView,
     GeneralFeedItemViewTpl) {
	'use strict';

	var GeneralFeedItemView = CommunicationFeedItemView.extend({

		initialize: function () {
		},

		events: {},

        setData: function () {
            var self = this;

        },

		render: function () {
			var self = this;
            this.$el.html(GeneralFeedItemViewTpl());
		}
	});

	return GeneralFeedItemView;

});
