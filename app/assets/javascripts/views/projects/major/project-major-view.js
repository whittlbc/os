define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/major-info-view',
    'views/projects/major/communication-view',
	'stache!views/projects/major/project-major-view',
    ], function ($,
     Backbone,
     _,
     MajorInfoView,
     CommunicationView,
     ProjectMajorViewTpl) {
	'use strict';

	var ProjectMajorView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(ProjectMajorViewTpl());

            this.majorInfoView = new MajorInfoView({
                el: '#majorInfoView'
            });
            this.majorInfoView.render();

            this.communicationView = new CommunicationView({
                el: '#communicationView'
            });
            this.communicationView.render();
		}
	});

	return ProjectMajorView;

});
