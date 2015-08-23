define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/minor/minor-info-evolution-view'
    ], function ($,
     Backbone,
     _,
     MinorInfoEvolutionViewTpl) {
	'use strict';

	var MinorInfoEvolutionView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(MinorInfoEvolutionViewTpl());
		}
	});

	return MinorInfoEvolutionView;

});
