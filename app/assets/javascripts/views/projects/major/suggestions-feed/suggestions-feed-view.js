define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/suggestions-feed/suggestions-feed-item-view',
	'stache!views/projects/major/suggestions-feed/suggestions-feed-view'
    ], function ($,
     Backbone,
     _,
     SuggestionsFeedItemView,
     SuggestionsFeedViewTpl) {
	'use strict';

	var SuggestionsFeedView = Backbone.View.extend({

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
