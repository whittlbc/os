define(['jquery',
  'backbone',
  'underscore',
  'models/os.util',
  'stache!views/notifications/notifications-item-view'
], function ($,
             Backbone,
             _,
             OSUtil,
             NotificationsItemViewTpl) {
  'use strict';

  var NotificationsItemView = Backbone.View.extend({

    initialize: function (options) {
      options = options || {};
      this.data = options.data;
    },

    events: {
      'click .action-btn': 'handleActionBtnClick'
    },

    handleActionBtnClick: function (e) {
      (e.currentTarget.id === 'accept') ? this.trigger('accept', this) : this.trigger('reject', this);
    },

    showAccepted: function () {
      var self = this;
      this.render({
        showAccepted: true
      });
    },

    showRejected: function () {
      var self = this;
      this.render({
        showRejected: true
      });
    },

    formatTextData: function () {
      var self = this;
      var text;
      var emailText = (self.data.email) ? ('(' + self.data.email + ') ') : '';
      var positiveBtnText;
      var isRequest = this.data.is_request;

      switch (this.data.requested_asset) {
        case 0:
          text = isRequest ? 'has requested to join your project, ' : 'has accepted your request to join the project, ';
          positiveBtnText = 'Accept';
          break;
        case 1:
          text = isRequest ? (emailText + 'has requested to join the <span style="font-family: \'Proxima-Nova-Bold\'">Slack</span> team for your project, ') :
            'has accepted your request to join the <span style="font-family: \'Proxima-Nova-Bold\'">Slack</span> team for the project, ';
          positiveBtnText = 'Invite';
          break;
        case 2:
          text = isRequest ? (emailText + 'has requested to join the <span style="font-family: \'Proxima-Nova-Bold\'">HipChat</span> team for your project, ') :
            'has accepted your request to join the <span style="font-family: \'Proxima-Nova-Bold\'">HipChat</span> team for the project, ';
          positiveBtnText = 'Invite';
          break;
      }

      return {
        text: text,
        positiveBtnText: positiveBtnText
      };
    },

    render: function (options) {
      var self = this;
      options = options || {};
      var textData = this.formatTextData();


      this.$el.html(NotificationsItemViewTpl({
        userGHLink: 'https://github.com/' + this.data.username,
        pic: this.data.pic,
        text: textData.text,
        username: this.data.username,
        projectLink: '/#projects/' + this.data.project_uuid,
        positiveBtnText: textData.positiveBtnText,
        showAccepted: options.showAccepted,
        acceptedText: this.data.requested_asset === 0 ? 'Accepted' : 'Invited',
        showRejected: options.showRejected,
        acceptedIntegration: !this.data.is_request && (this.data.requested_asset === 1 || this.data.requested_asset === 2),
        showActionBtns: this.data.is_request,
        projectName: this.data.project_name,
        date: this.data.date ? OSUtil.getTimeAgo(this.data.date) : ''
      }));
    }
  });

  return NotificationsItemView;

});
