define(['jquery',
    'backbone',
    'underscore',
    'models/os.util',
    'views/filters/privacy-filter-item-view',
    'stache!views/filters/privacy-filters-view',
    'velocity',
    'backbone-eventbroker'
], function ($,
     Backbone,
     _,
     OSUtil,
     PrivacyFilterItemView,
     PrivacyFiltersViewTpl) {
    'use strict';

    var PrivacyFiltersView = Backbone.View.extend({

        initialize: function (options) {
            options = options || {};
            this.PRIVACY_FILTERS = [];
        },

        events: {
            'click #clearPrivacyFiltersBtn': 'clearPrivacyFilters'
        },

        isEmpty: function () {
            return this.$list.children().length === 0;
        },

        toggleIconVisibility: function (opacity, duration) {
            this.$el.find('.minor-filters-type-icon').animate({opacity: opacity}, duration);
        },

        handleDeletePrivacyFilter: function(view) {
            var self = this;
            this.$list.empty();
            var tempArray = [];
            for (var i = 0; i < this.PRIVACY_FILTERS.length; i++) {
                if (this.PRIVACY_FILTERS[i].name != view.name) {
                    var privacyFilterItemView = this.PRIVACY_FILTERS[i];
                    privacyFilterItemView.render();
                    this.addHoverListener(privacyFilterItemView);
                    var animate = false;
                    var $ball = privacyFilterItemView.$el.find('.privacy-filter-item');
                    var $name = privacyFilterItemView.$el.find('.name');
                    this.prepareItemForEntrance($ball, $name, privacyFilterItemView.name, animate);
                    this.$list.append(privacyFilterItemView.el);
                    tempArray.push(privacyFilterItemView);
                }
            }
            this.PRIVACY_FILTERS = tempArray;
            Backbone.EventBroker.trigger('deletePrivacyFilter', view.name);
        },

        clearPrivacyFilters: function () {
            var self = this;
            this.$list.empty();
            var privacyNamesArray = [];
            for (var i = 0; i < this.PRIVACY_FILTERS.length; i++) {
                privacyNamesArray.push(self.PRIVACY_FILTERS[i].name);
            }
            this.PRIVACY_FILTERS = [];
            Backbone.EventBroker.trigger('clearPrivacyFilters', privacyNamesArray);
        },

        setColorsAndInitials: function (colors_and_initials) {
            this.colors_and_initials = colors_and_initials;
        },

        addItem: function (data) {
            var privacyFilterItemView = new PrivacyFilterItemView({
                tagName: 'li',
                name: data.value
            });
            privacyFilterItemView.render();
            this.addHoverListener(privacyFilterItemView);
            var $ball = privacyFilterItemView.$el.find('.privacy-filter-item');
            var $name = privacyFilterItemView.$el.find('.name');
            this.prepareItemForEntrance($ball, $name, data.value, data.animate);
            this.$list.append(privacyFilterItemView.el);
            this.PRIVACY_FILTERS.push(privacyFilterItemView);
            if (data.animate) {
                this.animateItemIn($ball, $name);
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
                self.handleDeletePrivacyFilter(view);
            });
        },

        prepareItemForEntrance: function ($ball, $name, value, animate) {
            var self = this;
            $ball.css({ backgroundColor: OSUtil.PRIVACY_COLOR_MAP[value] });
            $name.html(value);
        },

        animateItemIn: function ($ball, $name) {
            $ball.velocity({width: 25, height: 25, top: 0, left: 0}, 690, [100, 15]);
            $name.animate({opacity: 1}, {duration: 300, queue: false});
        },

        render: function () {
            var self = this;
            this.$el.html(PrivacyFiltersViewTpl());
            this.$list = this.$el.find('.privacy-filters-list');
        }
    });

    return PrivacyFiltersView;

});
