define(['jquery',
    'backbone',
    'underscore',
    'stache!views/filters/chat-filter-item-view'
], function ($,
     Backbone,
     _,
     ChatFilterItemViewTpl) {
    'use strict';

    var ChatFilterItemView = Backbone.View.extend({

        initialize: function (options) {
            options = options || {};
            this.name = options.name;
            this.toggleDetailsDuration = 130;
            this.closeBtnDiameter = 18;
        },

        fadeIn: function () {
            var self = this;
            var options = {
                duration: self.toggleDetailsDuration,
                queue: false
            };
            self.$el.find('#removeChatFilter-' + self.name).show();
            self.$el.find('#removeChatFilter-' + self.name).animate({height: self.closeBtnDiameter}, options);
            self.$el.find('#removeChatFilter-' + self.name).animate({width: self.closeBtnDiameter}, options);
            self.$el.find('.name').show();
            self.$el.find('.name').animate({opacity: 1}, options);
        },

        fadeOut: function () {
            var self = this;
            var options = {
                duration: self.toggleDetailsDuration,
                queue: false
            };
            self.$el.find('#removeChatFilter-' + self.name).show();
            self.$el.find('#removeChatFilter-' + self.name).animate({height: 0}, options);
            self.$el.find('#removeChatFilter-' + self.name).animate({width: 0}, options);
            self.$el.find('.name').animate({opacity: 0}, options);
            setTimeout(function () {
                self.$el.find('#removeChatFilter-' + self.name).hide();
                self.$el.find('.name').hide();
            }, self.toggleDetailsDuration);
        },

        render: function (options) {
            var self = this;
            options = options || {};

            this.$el.html(ChatFilterItemViewTpl({
                name: self.name,
                image: options.image
            }));
        }

    });

    return ChatFilterItemView;

});
