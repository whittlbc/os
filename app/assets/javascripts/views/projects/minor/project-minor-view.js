define(['jquery',
	'backbone',
	'underscore',
    'views/projects/minor/minor-info-evolution-view',
	'stache!views/projects/minor/project-minor-view'
    ], function ($,
     Backbone,
     _,
     MinorInfoEvolutionView,
     ProjectMinorViewTpl) {
	'use strict';

	var ProjectMinorView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

        setHeight: function () {
            this.$el.find('#minorInfoEvolutionView').height(window.innerHeight - this.$el.find('#minorJoinFollowContainer').height());
        },

		render: function (windowHeight) {
			var self = this;
            this.$el.html(ProjectMinorViewTpl());
            this.minorInfoEvolutionView = new MinorInfoEvolutionView({
                el: '#minorInfoEvolutionView'
            });
            this.minorInfoEvolutionView.render();
            this.setHeight();
		}
	});

	return ProjectMinorView;

});
