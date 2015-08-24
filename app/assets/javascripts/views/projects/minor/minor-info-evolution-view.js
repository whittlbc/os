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

		events: {},

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

            this.$el.find('#minorInfoEvolutionContainer').click(function(){
                $(this).find('#minorInfoEvolutionFlipper').addClass('flipped').mouseleave(function(){
                    $(this).removeClass('flipped');
                });
                return false;
            });

		}
	});

	return MinorInfoEvolutionView;

});
