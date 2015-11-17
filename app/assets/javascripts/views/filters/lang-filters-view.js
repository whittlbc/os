define(['jquery',
    'backbone',
    'underscore',
    'models/os.util',
    'views/filters/lang-filter-item-view',
    'views/widgets/more-dropdown/more-dropdown',
    'stache!views/filters/lang-filters-view',
    'velocity',
    'backbone-eventbroker'
], function ($,
     Backbone,
     _,
     OSUtil,
     LangFilterItemView,
     MoreDropdown,
     LangFiltersViewTpl) {
    'use strict';

    var LangFiltersView = Backbone.View.extend({

        initialize: function (options) {
            options = options || {};
            this.colors_and_initials = options.colorsAndInitials;
            this.LANG_FILTERS = [];
            Backbone.EventBroker.register({
                'hide-more-langs-dropdown': 'forceHideDropdown'
            }, this);

            this.requiredBottomSpacing = 160;
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
                    this.prepareItemForEntrance(langFilterItemView.el, langFilterItemView.realName, false);
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
            if (this.shownFiltersFull()) {
                this.toggleMoreFiltersContainer(true);
                this.$el.find('.more-count > span').html(this.moreDropdown.getNumItems() + 1);
                this.moreDropdown.addItem(data.value);
            } else {
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
                self.handleDeleteLangFilter(view);
            });
        },

        prepareItemForEntrance: function (el, value, animate) {
            var self = this;
            el.style.position = 'relative';
            el.firstChild.style.backgroundColor = self.colors_and_initials[value]['color'];
            el.style.left = animate ? '-100px' : '0px';
            $(el.firstChild).html(self.colors_and_initials[value]['initials']);
            var $p = $(el).children().eq(1);
            $p.html(value);
            if (value.length > 11) {
                $p.css('font-size', '11px');
            }
        },

        slideItemIn: function (el) {
            $(el).velocity({ left: 0}, 700, [100, 14]);
        },

        prePopulateFilters: function (filtersMap) {
            var self = this;
            var filters = Object.keys(filtersMap[0]);

            _.each(filters, function (lang) {
                self.addItem({
                    value: lang,
                    animate: false
                });
            });
        },

        shownFiltersFull: function () {
            var $list = this.$el.find('.lang-filters-list');
            var currentBottomPos = $list.offset().top + $list.height();
            var verticalSpaceLeft = window.innerHeight - currentBottomPos;
            return verticalSpaceLeft < this.requiredBottomSpacing;
        },

        forceHideDropdown: function () {
            this.moreDropdown.hideDropdown();
        },

        toggleMoreFiltersContainer: function (show) {
            var $btn = this.$el.find('.more-dropdown-container');
            show ? $btn.show() : $btn.hide();
        },

        render: function () {
            var self = this;
            this.$el.html(LangFiltersViewTpl());

            this.$list = this.$el.find('.lang-filters-list');

            this.moreDropdown = new MoreDropdown({
                el: self.$el.find('#moreLangFilters')
            });

            this.listenTo(this.moreDropdown, 'item:remove', function () {
                var $countEl = self.$el.find('.more-count > span');
                $countEl.html(Number($countEl.html()) - 1);
            });

            this.listenTo(this.moreDropdown, 'list:empty', function () {
                self.toggleMoreFiltersContainer(false);
            });

            this.moreDropdown.render();

            $(document).click(function () {
                self.forceHideDropdown();
            });
        }
    });

    return LangFiltersView;

});
