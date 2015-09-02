define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/communication/communication-feed-view',
    'views/projects/major/communication/suggestions/suggestions-feed-item-view',
	'stache!views/projects/major/communication/suggestions/suggestions-feed-view'
    ], function ($,
     Backbone,
     _,
     CommunicationFeedView,
     SuggestionsFeedItemView,
     SuggestionsFeedViewTpl) {
	'use strict';

	var SuggestionsFeedView = CommunicationFeedView.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(SuggestionsFeedViewTpl());
		}
	});

	return SuggestionsFeedView;

});
