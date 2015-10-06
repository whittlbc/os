define(['jquery',
    'backbone',
    'underscore',
    'stache!views/notifications/notifications-item-view'
], function ($,
     Backbone,
     _,
     NotificationsItemViewTpl) {
    'use strict';

    var NotificationsItemView = Backbone.View.extend({

        initialize: function (options) {
            options = options || {};
            this.data = options.data;
        },

        events: {},

        render: function () {
            var self = this;
            this.$el.html(NotificationsItemViewTpl());
        }
    });

    return NotificationsItemView;

});
