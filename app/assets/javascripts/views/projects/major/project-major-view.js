define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/major/project-major-view'
    ], function ($,
     Backbone,
     _,
     ProjectMajorViewTpl) {
	'use strict';

	var ProjectMajorView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(ProjectMajorViewTpl());
		}
	});

	return ProjectMajorView;

});
