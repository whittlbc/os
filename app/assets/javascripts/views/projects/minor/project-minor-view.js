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

        lazyLoadContribs: function (contribs) {
            this.minorInfoEvolutionView.lazyLoadContribs(contribs);
        },

        lazyLoadRepoStats: function (data) {
            this.minorInfoEvolutionView.lazyLoadRepoStats(data);
        },

        showEditMode: function (data) {
            var self = this;
            this.minorInfoEvolutionView.showEditMode(data);
        },

        getSavedEditData: function () {
            return this.minorInfoEvolutionView.getSavedEditData();
        },

        render: function (options) {
			var self = this;
            this.$el.html(ProjectMinorViewTpl({
                voteCount: options && options.hasOwnProperty('vote_count') ? options.vote_count : '-'
            }));
            this.minorInfoEvolutionView = new MinorInfoEvolutionView({
                el: '#minorInfoEvolutionView'
            });

            this.minorInfoEvolutionView.render(options);
		}
	});

	return ProjectMinorView;

});
