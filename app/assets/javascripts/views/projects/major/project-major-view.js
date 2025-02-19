define(['jquery',
  'backbone',
  'underscore',
  'views/os.view',
  'models/os.util',
  'views/projects/major/major-info-view',
  'views/projects/major/communication/communication-view',
  'stache!views/projects/major/project-major-view'
], function ($,
   Backbone,
   _,
   OSView,
   OSUtil,
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

    passImplementations: function (data) {
      this.communicationView.passImplementations(data);
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

      this.communicationView = new CommunicationView({
        el: '#communicationView',
        ufg: options.project.up_for_grabs === true,
        isIdea: options.project.status == OSUtil.PROJECT_TYPES.indexOf('ideas')
      });

      this.communicationView.render(options);

      if (options.project.up_for_grabs === true) {
        Backbone.EventBroker.trigger('implementations:fetch');
      }
    }
  });

  return ProjectMajorView;

});
