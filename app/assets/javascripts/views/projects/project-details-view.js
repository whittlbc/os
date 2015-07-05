define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/project-details-view'
    ], function ($,
     Backbone,
     _,
     ProjectDetailsViewTpl) {
	'use strict';

	var ProjectDetailsView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(ProjectDetailsViewTpl());
		}
	});

	return ProjectDetailsView;

});
