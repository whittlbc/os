define(['jquery',
  'backbone',
  'underscore',
  'views/modals/modal-view',
  'views/invite-members/invite-members-view',
  'stache!views/modals/invite-members-modal'
], function ($,
   Backbone,
   _,
   ModalView,
   InviteMembersView,
   InviteMembersModalTpl) {
  'use strict';

  var InviteMembersModal = ModalView.extend({

    initialize: function () {
      this.currentTopPos = 135;
      this.inviteMembersModalHeight = 300;
    },

    events: {},

    sizeModal: function () {
      var inviteMembersModalMarginTop = ((window.innerHeight - this.inviteMembersModalHeight - this.currentTopPos) / 2);
      this.$modal.css('margin-top', inviteMembersModalMarginTop + 'px');
      this.$el.find('#inviteMembersModalContentContainer').width(580);
    },

    render: function () {
      this.$el.html(InviteMembersModalTpl());

      this.$modal = this.$el.find('#inviteMembersModalView');

      this.sizeModal();

      this.inviteMembersView = new InviteMembersView({
        el: this.$el.find('#inviteMembersContentView')
      });

      this.inviteMembersView.render();
    }
  });

  return InviteMembersModal;

});
