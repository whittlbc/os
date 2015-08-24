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

            var majorInfoHeight = window.innerHeight - this.$el.find('#majorInfoView').height() + 10; // adding 10 because of the stupid margin-top: -10px you had to do for some reason

            this.communicationView = new CommunicationView({
                el: '#communicationView',
                height: majorInfoHeight
            });
            this.communicationView.render();
		}
	});

	return ProjectMajorView;

});
