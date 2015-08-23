define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/minor/evolution/evolution-feed-item-view'
    ], function ($,
     Backbone,
     _,
     EvolutionFeedItemViewTpl) {
	'use strict';

	var EvolutionFeedItemView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(EvolutionFeedItemViewTpl());
		}
	});

	return EvolutionFeedItemView;

});
