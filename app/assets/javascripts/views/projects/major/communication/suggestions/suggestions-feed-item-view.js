define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/communication/communication-feed-item-view',
    'stache!views/projects/major/communication/suggestions/suggestions-feed-item-view'
    ], function ($,
     Backbone,
     _,
     CommunicationFeedItemView,
     SuggestionsFeedItemViewTpl) {
	'use strict';

	var SuggestionsFeedItemView = CommunicationFeedItemView.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(SuggestionsFeedItemViewTpl());
		}
	});

	return SuggestionsFeedItemView;

});
