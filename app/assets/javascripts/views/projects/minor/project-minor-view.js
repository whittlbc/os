define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/minor/project-minor-view'
    ], function ($,
     Backbone,
     _,
     ProjectMinorViewTpl) {
	'use strict';

	var ProjectMinorView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(ProjectMinorViewTpl());
		}
	});

	return ProjectMinorView;

});
