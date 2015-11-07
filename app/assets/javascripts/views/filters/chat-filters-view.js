define(['jquery',
    'backbone',
    'underscore',
    'models/os.util',
    'views/filters/chat-filter-item-view',
    'stache!views/filters/chat-filters-view',
    'velocity',
    'backbone-eventbroker'
], function ($,
     Backbone,
     _,
     OSUtil,
     ChatFilterItemView,
     ChatFiltersViewTpl) {
    'use strict';

    var ChatFiltersView = Backbone.View.extend({

        initialize: function (options) {
            options = options || {};
            this.CHAT_FILTERS = [];
        },

        events: {
            'click #clearChatFiltersBtn': 'clearChatFilters'
        },

        isEmpty: function () {
            return this.$list.children().length === 0;
        },

        toggleIconVisibility: function (opacity, duration) {
            this.$el.find('.minor-filters-type-icon').animate({opacity: opacity}, duration);
        },

        handleDeleteChatFilter: function(view) {
            var self = this;
            this.$list.empty();
            var tempArray = [];
            for (var i = 0; i < this.CHAT_FILTERS.length; i++) {
                if (this.CHAT_FILTERS[i].name != view.name) {
                    var chatFilterItemView = this.CHAT_FILTERS[i];
                    chatFilterItemView.render();
                    this.addHoverListener(chatFilterItemView);
                    var animate = false;
                    var $ball = chatFilterItemView.$el.find('.chat-filter-item');
                    var $icon = $ball.find('img');
                    var $name = chatFilterItemView.$el.find('.name');
                    this.prepareItemForEntrance($ball, $name, chatFilterItemView.name, animate);
                    this.$list.append(chatFilterItemView.el);
                    tempArray.push(chatFilterItemView);
                }
            }
            this.CHAT_FILTERS = tempArray;
            Backbone.EventBroker.trigger('deleteChatFilter', view.name);
        },

        clearChatFilters: function () {
            var self = this;
            this.$list.empty();
            var chatNamesArray = [];
            for (var i = 0; i < this.CHAT_FILTERS.length; i++) {
                chatNamesArray.push(self.CHAT_FILTERS[i].name);
            }
            this.CHAT_FILTERS = [];
            Backbone.EventBroker.trigger('clearChatFilters', chatNamesArray);
        },

        setColorsAndInitials: function (colors_and_initials) {
            this.colors_and_initials = colors_and_initials;
        },

        addItem: function (data) {
            var chatFilterItemView = new ChatFilterItemView({
                tagName: 'li',
                name: data.value
            });

            var options = {};

            if (data.value === 'Slack') {
                options.image = 'images/slack_icon.svg';
            }
            else if (data.value === 'HipChat') {
                options.image = 'images/hipchat.svg';
            }
            else {
                options.image = 'images/bubble.png';
            }

            chatFilterItemView.render(options);
            this.addHoverListener(chatFilterItemView);
            var $ball = chatFilterItemView.$el.find('.chat-filter-item');
            var $icon = $ball.find('img');
            var $name = chatFilterItemView.$el.find('.name');
            this.prepareItemForEntrance($ball, $name, data.value, data.animate);
            this.$list.append(chatFilterItemView.el);
            this.CHAT_FILTERS.push(chatFilterItemView);
            if (data.animate) {
                this.animateItemIn($ball, $name, $icon);
            }
        },

        addHoverListener: function (view) {
            var self = this;
            view.$el.hover(function(){
                    view.$el.addClass('expand');
                }, function () {
                    view.$el.removeClass('expand');
                }
            );
            view.$el.find('.filter-close-btn').click(function(){
                self.handleDeleteChatFilter(view);
            });
        },

        prepareItemForEntrance: function ($ball, $name, value, animate) {
            $name.html(value);
        },

        animateItemIn: function ($ball, $name, $icon) {
            $ball.velocity({width: 25, height: 25, top: 0, left: 0}, 690, [100, 15]);
            $icon.velocity({width: 25, height: 25, top: 0, left: 0}, 690, [100, 15]);
            $name.animate({opacity: 1}, {duration: 300, queue: false});
        },

        render: function () {
            var self = this;
            this.$el.html(ChatFiltersViewTpl());
            this.$list = this.$el.find('.chat-filters-list');
        }
    });

    return ChatFiltersView;

});
