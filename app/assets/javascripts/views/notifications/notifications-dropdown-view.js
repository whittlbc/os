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
            for (var i = 0; i < notifications.length; i++) {
                this.addItem(notifications[i]);
            }
        },

        addItem: function(data) {
            var notificationsItemView = new NotificationsItemView({
                tagName: 'li',
                data: data
            });
            notificationsItemView.render();
            this.$mainList.append(notificationsItemView.el);
            this.NOTIFICATIONS.push(notificationsItemView);
        },

		render: function () {
			var self = this;
            this.$el.html(NotificationsDropdownViewTpl());
            this.$mainList = this.$el.find('.main-list');
		}
	});

	return NotificationsDropdownView;

});
