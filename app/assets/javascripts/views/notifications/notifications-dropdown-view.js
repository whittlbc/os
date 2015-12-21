define(['jquery',
  'backbone',
  'underscore',
  'views/notifications/notifications-item-view',
  'stache!views/notifications/notifications-dropdown-view'
], function ($,
             Backbone,
             _,
             NotificationsItemView,
             NotificationsDropdownViewTpl) {
  'use strict';

  var NotificationsDropdownView = Backbone.View.extend({

    initialize: function (options) {
      options = options || {};
      this.userAuthed = options.userAuthed;
    },

    events: {},

    populate: function (notifications) {
      var self = this;
      this.$mainList.empty();
      this.unseenNotificationsCount = 0;

      if (notifications.length > 0) {
        for (var i = 0; i < notifications.length; i++) {
          this.addItem(notifications[i]);
          if (!notifications[i].seen) {
            this.unseenNotificationsCount++;
          }
        }
      } else {
        var $zeroNotificationsView = $('<div>', {
          class: 'zero-notifications'
        });
        $zeroNotificationsView.html('No Notifications');
        this.$el.find('.main-list').append($zeroNotificationsView);
      }

      if (this.unseenNotificationsCount > 0) {
        $('#headerNotificationsCount').html(this.unseenNotificationsCount);
        $('#headerNotificationsCount').show();
      }

    },

    addItem: function (data) {
      var notificationsItemView = new NotificationsItemView({
        tagName: 'li',
        data: data
      });
      this.setListener(notificationsItemView);
      notificationsItemView.render();
      this.$mainList.append(notificationsItemView.el);
    },

    setListener: function (view) {
      var self = this;
      this.listenTo(view, 'accept', function (view) {
        self.trigger('accept-request', view.data);
        view.showAccepted();
        if (view.data.requested_asset === 1) {
          window.open(view.data.slack_url + '/admin');
        } else if (view.data.requested_asset === 2) {
          window.open(view.data.hipchat_url + '/admin'); // not actually a thing...fix this url
        }
        self.decreaseNotificationsCount();
      });
      this.listenTo(view, 'reject', function (view) {
        self.trigger('reject-request', view.data);
        view.showRejected();
        self.decreaseNotificationsCount();
      });
    },

    decreaseNotificationsCount: function () {
      var self = this;
      var $countTag = $('#headerNotificationsCount');
      if (this.unseenNotificationsCount >= 1) {
        this.unseenNotificationsCount--;
        this.unseenNotificationsCount == 0 ? $countTag.hide() : $countTag.html(this.unseenNotificationsCount);
      }
    },

    sawAllNotifications: function () {
      this.unseenNotificationsCount = 0;
      $('#headerNotificationsCount').hide();
    },

    render: function () {
      var self = this;
      this.$el.html(NotificationsDropdownViewTpl({
        userAuthed: this.userAuthed
      }));
      this.$mainList = this.$el.find('.main-list');

      // prevent a click anywhere on this view from causing it to disappear
      this.$el.click(function (e) {
        e.stopPropagation();
      });
    }
  });

  return NotificationsDropdownView;

});
