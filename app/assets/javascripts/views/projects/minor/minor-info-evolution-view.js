define(['jquery',
	'backbone',
	'underscore',
    'views/projects/minor/minor-info/minor-info-view',
    'views/projects/minor/evolution/evolution-view',
	'stache!views/projects/minor/minor-info-evolution-view'
    ], function ($,
     Backbone,
     _,
     MinorInfoView,
     EvolutionView,
     MinorInfoEvolutionViewTpl) {
	'use strict';

	var MinorInfoEvolutionView = Backbone.View.extend({

		initialize: function () {
		},

		events: {
            'click .info-evolution-toggle-btn': 'handleClickToggleBtn'
        },

        handleClickToggleBtn: function (e) {
            var self = this;
            var $flipper = this.$el.find('#minorInfoEvolutionFlipper');
            if (e.currentTarget.id == 'info' && $flipper.hasClass('flipped')) {
                $flipper.removeClass('flipped');
            } else if (e.currentTarget.id == 'evolution' && !$flipper.hasClass('flipped')) {
                $flipper.addClass('flipped');
            }
        },

		render: function () {
			var self = this;
            this.$el.html(MinorInfoEvolutionViewTpl());

            this.minorInfoView = new MinorInfoView({
                el: '#minorInfoView'
            });
            this.minorInfoView.render();

            this.evolutionView = new EvolutionView({
                el: '#evolutionView'
            });
            this.evolutionView.render();
		}
	});

	return MinorInfoEvolutionView;

});
