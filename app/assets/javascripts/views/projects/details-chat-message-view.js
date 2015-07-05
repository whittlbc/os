define(['jquery',
    'backbone',
    'underscore',
    'stache!views/projects/details-chat-message-view'
], function ($,
     Backbone,
     _,
     DetailsChatMessageViewTpl) {
    'use strict';

    var DetailsChatMessageView = Backbone.View.extend({

        initialize: function () {
        },

        events: {},

        render: function () {
            var self = this;
            this.$el.html(DetailsChatMessageViewTpl());
        }
    });

    return DetailsChatMessageView;

});