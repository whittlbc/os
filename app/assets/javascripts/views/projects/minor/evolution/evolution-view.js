define(['jquery',
	'backbone',
	'underscore',
    'views/projects/minor/evolution/evolution-feed-view',
	'stache!views/projects/minor/evolution/evolution-view',
    'backbone-eventbroker'
    ], function ($,
     Backbone,
     _,
     EvolutionFeedView,
     EvolutionViewTpl) {
	'use strict';

	var EvolutionView = Backbone.View.extend({

		initialize: function () {
            Backbone.EventBroker.register({
                'evolution:pass': 'handlePassedEvolutionData'
            }, this);
		},

		events: {},

        handlePassedEvolutionData: function (data) {
            var self = this;
            this.evolutionFeedView.populate(data);
        },

		render: function (options) {
			var self = this;
            this.$el.html(EvolutionViewTpl());

            this.evolutionFeedView = new EvolutionFeedView({
                el: '#evolutionFeedView'
            });
            this.evolutionFeedView.render(options);
		}
	});

	return EvolutionView;

});
