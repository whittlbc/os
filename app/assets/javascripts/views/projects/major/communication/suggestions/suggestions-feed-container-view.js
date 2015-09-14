define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/communication/communication-feed-container-view',
    'views/projects/major/communication/suggestions/suggestions-feed-view',
	'stache!views/projects/major/communication/suggestions/suggestions-feed-container-view'
    ], function ($,
     Backbone,
     _,
     CommunicationFeedContainerView,
     SuggestionsFeedView,
     SuggestionsFeedContainerViewTpl) {
	'use strict';

	var SuggestionsFeedContainerView = CommunicationFeedContainerView.extend({

		initialize: function () {
		},

		events: {},

        passComments: function (comments) {
            var self = this;
            this.suggestionsFeedView.passComments(comments);
        },

        render: function () {
			var self = this;
            this.$el.html(SuggestionsFeedContainerViewTpl());

            this.suggestionsFeedView = new SuggestionsFeedView({
                el: '#suggestionsFeedView'
            });
            this.suggestionsFeedView.render();
        }
	});

	return SuggestionsFeedContainerView;

});
