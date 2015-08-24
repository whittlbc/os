define(['jquery',
	'backbone',
	'underscore',
    'views/projects/minor/evolution/evolution-feed-view',
	'stache!views/projects/minor/evolution/evolution-view'
    ], function ($,
     Backbone,
     _,
     EvolutionFeedView,
     EvolutionViewTpl) {
	'use strict';

	var EvolutionView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(EvolutionViewTpl());

            this.evolutionFeedView = new EvolutionFeedView({
                el: '#evolutionFeedView'
            });
            this.evolutionFeedView.render();
		}
	});

	return EvolutionView;

});
