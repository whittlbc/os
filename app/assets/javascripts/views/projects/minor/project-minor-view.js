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
        //
        //setHeight: function () {
        //    this.$el.find('#minorInfoEvolutionView').height($(document).height() - this.$el.find('#minorJoinFollowContainer').height());
        //},

		render: function (options) {
            console.log(options);
			var self = this;
            this.$el.html(ProjectMinorViewTpl({
                voteCount: options && options.vote_count ? options.vote_count : '-'
            }));
            this.minorInfoEvolutionView = new MinorInfoEvolutionView({
                el: '#minorInfoEvolutionView'
            });
            this.minorInfoEvolutionView.render();
		}
	});

	return ProjectMinorView;

});
