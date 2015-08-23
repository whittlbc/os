define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/major/suggestions-feed/suggestions-feed-item-view'
    ], function ($,
     Backbone,
     _,
     SuggestionsFeedItemViewTpl) {
	'use strict';

	var SuggestionsFeedItemView = Backbone.View.extend({

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
