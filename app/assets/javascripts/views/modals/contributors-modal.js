define(['jquery',
  'backbone',
  'underscore',
  'views/modals/modal-view',
  'views/contributors/contributors-feed-container-view',
  'stache!views/modals/contributors-modal'
], function ($,
             Backbone,
             _,
             ModalView,
             ContributorsFeedContainerView,
             ContributorsModalTpl) {
  'use strict';

  var ContributorsModal = ModalView.extend({

    initialize: function () {
      this.currentTopPos = 135;
      this.contributorsModalHeight = 460;
    },

    events: {},

    setAnonStatus: function (bool) {
      this.contributorsFeedContainerView.setAnonStatus(bool);
    },

    populate: function (data) {
      this.contributorsFeedContainerView.populate(data);
    },

    sizeModal: function () {
      var self = this;
      var contributorsModalMarginTop = ((window.innerHeight - this.contributorsModalHeight - this.currentTopPos) / 2);
      this.$modal.css('margin-top', contributorsModalMarginTop + 'px');
      this.$el.find('#contributorsModalContentContainer').width(650);
      this.$el.find('#contributorsModalContentContainer').css('left', '-25px');
    },

    render: function () {
      var self = this;
      this.$el.html(ContributorsModalTpl());

      this.$modal = this.$el.find('#contributorsModalView');

      this.sizeModal();

      this.contributorsFeedContainerView = new ContributorsFeedContainerView({
        el: this.$el.find('#contributorsModalContent')
      });

      this.contributorsFeedContainerView.render();

    }
  });

  return ContributorsModal;

});
