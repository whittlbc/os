define(['jquery',
  'backbone',
  'underscore',
  'views/os.view',
  'views/projects/major/major-info-view',
  'views/projects/major/communication/communication-view',
  'stache!views/projects/major/project-major-view'
], function ($,
   Backbone,
   _,
   OSView,
   MajorInfoView,
   CommunicationView,
   ProjectMajorViewTpl) {
  'use strict';

  var ProjectMajorView = OSView.extend({

    postInitialize: function () {
    },

    events: {},

    showNewComment: function (data) {
      this.communicationView.showNewComment(data);
    },

    passComments: function (data) {
      this.communicationView.passComments(data);
    },

    showEditMode: function (data) {
      this.majorInfoView.showEditMode(data.project);
    },

    getSavedEditData: function () {
      return this.majorInfoView.getSavedEditData();
    },

    render: function (options) {
      var self = this;
      this.$el.html(ProjectMajorViewTpl());

      this.majorInfoView = new MajorInfoView({
        el: this.$el.find('#majorInfoView')
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
