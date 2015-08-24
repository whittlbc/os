define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/suggestions-feed/suggestions-feed-view',
	'stache!views/projects/major/suggestions-feed/suggestions-feed-container-view'
    ], function ($,
     Backbone,
     _,
     SuggestionsFeedView,
     SuggestionsFeedContainerViewTpl) {
	'use strict';

	var SuggestionsFeedContainerView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

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
