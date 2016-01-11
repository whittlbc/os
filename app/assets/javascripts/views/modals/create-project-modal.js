define(['jquery',
  'backbone',
  'underscore',
  'views/modals/modal-view',
  'views/add-project/create-new-project-popup',
  'stache!views/modals/create-project-modal'
], function ($,
             Backbone,
             _,
             ModalView,
             CreateNewProjectPopup,
             CreateProjectModalTpl) {
  'use strict';

  var CreateProjectModal = ModalView.extend({

    initialize: function () {
      this.currentTopPos = 135;
      this.createNewProjectModalHeight = 496;
    },

    events: {},

    resetPopup: function () {
      var self = this;
      if (this.createNewProjectPopup) {
        this.createNewProjectPopup.resetPopup();
      }
    },

    formatForPullProject: function (uuid) {
      var self = this;
      if (this.createNewProjectPopup) {
        this.createNewProjectPopup.formatForPullProject(uuid);
      }
    },

    sizeModal: function () {
      var self = this;
      var createNewProjectModalMarginTop = ((window.innerHeight - this.createNewProjectModalHeight - this.currentTopPos) / 2);
      this.$modal.css('margin-top', createNewProjectModalMarginTop + 'px');
      this.$el.find('#createNewProjectModalContentContainer').width(750);
      this.$el.find('#createNewProjectModalContentContainer').css('left', '-75px');
    },

    render: function () {
      var self = this;
      this.$el.html(CreateProjectModalTpl());

      this.$modal = this.$el.find('#createNewProjectModal');

      this.sizeModal();

      this.createNewProjectPopup = new CreateNewProjectPopup({
        el: this.$el.find('#createNewProjectModalContent')
      });

      this.createNewProjectPopup.render();
    }
  });

  return CreateProjectModal;

});
