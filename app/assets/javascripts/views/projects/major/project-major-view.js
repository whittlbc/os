define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/major-info-view',
    'views/projects/major/communication/communication-view',
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

        showNewComment: function (data) {
            var self = this;
            self.communicationView.showNewComment(data);
        },

        passComments: function (data) {
            var self = this;
            self.communicationView.passComments(data);
        },

        showEditMode: function (data) {
            var self = this;
            this.majorInfoView.showEditMode(data.project);
        },

        getSavedEditData: function () {
            return this.majorInfoView.getSavedEditData();
        },

		render: function (options) {
			var self = this;
            this.$el.html(ProjectMajorViewTpl());

            this.majorInfoView = new MajorInfoView({
                el: '#majorInfoView'
            });

            this.listenTo(this.majorInfoView, 'project:edit', function () {
                self.trigger('project:edit');
            });

            this.majorInfoView.render(options.project);

            var majorInfoHeight = window.innerHeight - this.$el.find('#majorInfoView').height(); // adding 10 because of the stupid margin-top: -10px you had to do for some reason

            this.communicationView = new CommunicationView({
                el: '#communicationView',
                height: majorInfoHeight
            });
            this.communicationView.render(options);
		}
	});

	return ProjectMajorView;

});
