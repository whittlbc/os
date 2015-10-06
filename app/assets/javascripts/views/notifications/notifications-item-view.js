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

        render: function () {
            var self = this;
            var notificationInfoForType = OSUtil.NOTIFICATIONS[this.data.requested_asset.toString()];

            this.$el.html(NotificationsItemViewTpl({
                userGHLink: 'https://github.com/' + this.data.requester_gh_username,
                pic: this.data.pic,
                text: notificationInfoForType.text,
                requesterName: this.data.requester_gh_username,
                projectLink: '/#projects/' + this.data.project_id,
                positiveBtnText: notificationInfoForType.positiveBtnText
            }));
        }
    });

    return NotificationsItemView;

});
