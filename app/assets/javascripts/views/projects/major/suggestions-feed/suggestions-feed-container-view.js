define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/major/suggestions-feed/suggestions-feed-container-view'
    ], function ($,
     Backbone,
     _,
     SuggestionsFeedContainerViewTpl) {
	'use strict';

	var SuggestionsFeedContainerView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(SuggestionsFeedContainerViewTpl());
		}
	});

	return SuggestionsFeedContainerView;

});
