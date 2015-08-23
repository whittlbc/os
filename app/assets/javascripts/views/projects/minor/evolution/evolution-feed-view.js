define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/minor/evolution/evolution-feed-view'
    ], function ($,
     Backbone,
     _,
     EvolutionFeedViewTpl) {
	'use strict';

	var EvolutionFeedView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(EvolutionFeedViewTpl());
		}
	});

	return EvolutionFeedView;

});
