define(['jquery',
	'backbone',
	'underscore',
    'views/projects/minor/minor-info/minor-info-view',
    'views/projects/minor/evolution/evolution-view',
	'stache!views/projects/minor/minor-info-evolution-view',
    'tabs'
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
                this.voidToggleClicks();
            } else if (e.currentTarget.id == 'evolution' && !$flipper.hasClass('flipped')) {
                $flipper.addClass('flipped');
                this.voidToggleClicks();
            }
        },

        voidToggleClicks: function () {
            var $infoBtn = this.$el.find('#info');
            var $evolutionBtn = this.$el.find('#evolution');
            $infoBtn.css('pointer-events', 'none');
            $evolutionBtn.css('pointer-events', 'none');
            setTimeout(function () {
                $infoBtn.css('pointer-events', 'initial');
                $evolutionBtn.css('pointer-events', 'initial');
            }, 400);
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
