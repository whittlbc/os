define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/minor/evolution/evolution-view'
    ], function ($,
     Backbone,
     _,
     EvolutionViewTpl) {
	'use strict';

	var EvolutionView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(EvolutionViewTpl());
		}
	});

	return EvolutionView;

});
