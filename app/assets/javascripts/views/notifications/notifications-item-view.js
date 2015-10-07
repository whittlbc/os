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
            var positiveBtnText;
            var isRequest = this.data.is_request;

            switch (this.data.requested_asset) {
                case 0:
                    text = isRequest ? 'has requested to join your project, ' : 'has accepted your request to join the project, ';
                    positiveBtnText = isRequest ? 'Accept' : 'OK';
                    break;
                case 1:
                    text = isRequest ? 'has requested to join the <b>Slack</b> team for your project, ' :
                        'has accepted your request to join the <b>Slack</b> team for the project, ';
                    positiveBtnText = isRequest ? 'Invite' : 'OK';
                    break;
                case 2:
                    text = isRequest ? 'has requested to join the <b>HipChat</b> team for your project, ' :
                        'has accepted your request to join the <b>HipChat</b> team for the project, ';
                    positiveBtnText = isRequest ? 'Invite' : 'OK';
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
                projectLink: '/#projects/' + this.data.project_id,
                positiveBtnText: textData.positiveBtnText,
                showAccepted: options.showAccepted,
                acceptedText: this.data.requested_asset === 0 ? 'Accepted' : 'Invited',
                showRejected: options.showRejected,
                acceptedIntegration: !this.data.is_request && (this.data.requested_asset === 1 || this.data.requested_asset === 2),
                showNegativeBtn: this.data.is_request,
                projectName: this.data.project_name
            }));
        }
    });

    return NotificationsItemView;

});
