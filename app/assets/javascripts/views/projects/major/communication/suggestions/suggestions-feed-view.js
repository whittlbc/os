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

        getMainListElement: function () {
            return this.$el.find('#suggestionsFeedListView');
        },

        getFeedItemView: function () {
            return new SuggestionsFeedItemView({
                tagName: 'li'
            });
        },

        render: function (options) {
            var self = this;
            this.noCommentsShown = options && options.showNoComments;
            this.$el.html(SuggestionsFeedViewTpl({
                showNoComments: this.noCommentsShown
            }));
        }
	});

	return SuggestionsFeedView;

});
