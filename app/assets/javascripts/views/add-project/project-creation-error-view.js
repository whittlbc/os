define(['jquery',
	'backbone',
	'underscore',
	'stache!views/add-project/project-creation-error-view',
    'backbone-eventbroker'
], function ($,
     Backbone,
     _,
     ProjectCreationErrorViewTpl) {
	'use strict';

	var ProjectCreationErrorView = Backbone.View.extend({

		initialize: function () {
		},

		events: {
            'click .project-creation-error-retry-container': 'handleRetry'
        },

        handleRetry: function () {
            Backbone.EventBroker.trigger('create-project:retry');
        },

		render: function () {
			var self = this;
            this.$el.html(ProjectCreationErrorViewTpl());
		}
	});

	return ProjectCreationErrorView;

});
