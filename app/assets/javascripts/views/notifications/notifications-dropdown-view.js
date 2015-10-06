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

		initialize: function () {
		},

		events: {},

        populate: function (notifications) {
            var self = this;
            this.NOTIFICATIONS = [];
            this.$mainList.empty();

            if (notifications.length > 0) {
                $('#headerNotificationsCount').html(notifications.length);
                $('#headerNotificationsCount').show();
                for (var i = 0; i < notifications.length; i++) {
                    this.addItem(notifications[i]);
                }
            } else {
                $('#headerNotificationsCount').hide();
                var $zeroNotificationsView = $('<div>', {
                    class: 'zero-notifications'
                });
                $zeroNotificationsView.html('No Notifications');
                this.$el.find('.main-list').append($zeroNotificationsView);
            }
        },

        addItem: function(data) {
            var notificationsItemView = new NotificationsItemView({
                tagName: 'li',
                data: data
            });
            this.setListener(notificationsItemView);
            notificationsItemView.render();
            this.$mainList.append(notificationsItemView.el);
            this.NOTIFICATIONS.push(notificationsItemView);
        },

        setListener: function (view) {
            var self = this;
            this.listenTo(view, 'accept', function (view) {
                self.trigger('accept-request', view.data);
                switch (view.data.requested_asset) {
                    case 0:
                        view.showAccept();
                        break;
                    case 1:
                        window.open(view.data.slack_url + '/admin'); // will need to place them at the best position to invite someone
                        break;
                    case 2:
                        // this isn't right yet
                        window.open(view.data.hipchat_url + '/admin'); // will need to place them at the best position to invite someone
                        break;
                }
            });
            this.listenTo(view, 'reject', function (view) {
                self.trigger('reject-request', view.data)
            });
        },

		render: function () {
			var self = this;
            this.$el.html(NotificationsDropdownViewTpl());
            this.$mainList = this.$el.find('.main-list');

            // prevent a click anywhere on this view from causing it to disappear
            this.$el.click(function (e) {
                e.stopPropagation();
            });
		}
	});

	return NotificationsDropdownView;

});
