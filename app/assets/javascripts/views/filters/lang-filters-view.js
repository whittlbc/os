define(['jquery',
    'backbone',
    'underscore',
    'models/os.util',
    'views/filters/lang-filter-item-view',
    'stache!views/filters/lang-filters-view',
    'velocity',
    'backbone-eventbroker'
], function ($,
     Backbone,
     _,
     OSUtil,
     LangFilterItemView,
     LangFiltersViewTpl) {
    'use strict';

    var LangFiltersView = Backbone.View.extend({

        initialize: function (options) {
            options = options || {};
            this.colors_and_initials = options.colorsAndInitials;
            this.LANG_FILTERS = [];
        },

        events: {
            'click #clearLangFiltersBtn': 'clearLangFilters'
        },

        handleDeleteLangFilter: function(view) {
            var self = this;
            this.$list.empty();
            var tempArray = [];
            for (var i = 0; i < this.LANG_FILTERS.length; i++) {
                if (this.LANG_FILTERS[i].realName != view.realName) {
                    var langFilterItemView = this.LANG_FILTERS[i];
                    langFilterItemView.render();
                    this.addHoverListener(langFilterItemView);
                    var animate = false;
                    this.prepareItemForEntrance(langFilterItemView.el, langFilterItemView.realName, animate);
                    this.$list.append(langFilterItemView.el);
                    tempArray.push(langFilterItemView);
                }
            }
            this.LANG_FILTERS = tempArray;
            Backbone.EventBroker.trigger('deleteLangFilter', view.realName);
        },

        clearLangFilters: function () {
            var self = this;
            this.$list.empty();
            var langNamesArray = [];
            for (var i = 0; i < this.LANG_FILTERS.length; i++) {
                langNamesArray.push(self.LANG_FILTERS[i].realName);
            }
            this.LANG_FILTERS = [];
            Backbone.EventBroker.trigger('clearLangFilters', langNamesArray);
        },

        setColorsAndInitials: function (colors_and_initials) {
            this.colors_and_initials = colors_and_initials;
        },

        addItem: function (data) {
            var langFilterItemView = new LangFilterItemView({
                tagName: 'li',
                name: data.value
            });
            langFilterItemView.render();
            this.addHoverListener(langFilterItemView);
            this.prepareItemForEntrance(langFilterItemView.el, data.value, data.animate);
            this.$list.append(langFilterItemView.el);
            this.LANG_FILTERS.push(langFilterItemView);
            if (data.animate) {
                this.slideItemIn(langFilterItemView.el);
            }
        },

        addHoverListener: function (view) {
            var self = this;
            view.$el.hover(function(){
                    view.showClose();
                }, function () {
                    view.hideClose();
                }
            );
            view.$el.find('.filter-close-btn').click(function(){
                self.handleDeleteLangFilter(view);
            });
        },

        prepareItemForEntrance: function (el, value, animate) {
            var self = this;
            el.style.listStyleType = 'none';
            el.style.display = 'inline-block';
            el.style.position = 'relative';
            el.firstChild.style.backgroundColor = self.colors_and_initials[value]['color'];
            el.style.top = animate ? (window.innerHeight + 'px') : '0px';
            $(el.firstChild).html(self.colors_and_initials[value]['initials']);
            var $p = $(el).children().eq(1);
            $p.html(value);
            if (value.length > 11) {
                $(el).children().eq(1)[0].style.fontSize = '11px';
            }
        },

        slideItemIn: function (el) {
            $(el).velocity({ top: 0}, 900, [100, 15]);
        },

        render: function () {
            var self = this;
            this.$el.html(LangFiltersViewTpl());
            this.$list = this.$el.find('.lang-filters-list');
        }
    });

    return LangFiltersView;

});
