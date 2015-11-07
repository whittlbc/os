define(['jquery',
    'backbone',
    'underscore',
    'models/os.util',
    'views/filters/license-filter-item-view',
    'stache!views/filters/license-filters-view',
    'velocity',
    'backbone-eventbroker'
], function ($,
     Backbone,
     _,
     OSUtil,
     LicenseFilterItemView,
     LicenseFiltersViewTpl) {
    'use strict';

    var LicenseFiltersView = Backbone.View.extend({

        initialize: function (options) {
            options = options || {};
            this.LICENSE_FILTERS = [];
        },

        events: {
            'click #clearLicenseFiltersBtn': 'clearLicenseFilters'
        },

        isEmpty: function () {
            return this.$list.children().length === 0;
        },

        toggleIconVisibility: function (opacity, duration) {
            this.$el.find('.minor-filters-type-icon').animate({opacity: opacity}, duration);
        },

        handleDeleteLicenseFilter: function(view) {
            var self = this;
            this.$list.empty();
            var tempArray = [];
            for (var i = 0; i < this.LICENSE_FILTERS.length; i++) {
                if (this.LICENSE_FILTERS[i].name != view.name) {
                    var licenseFilterItemView = this.LICENSE_FILTERS[i];
                    licenseFilterItemView.render();
                    this.addHoverListener(licenseFilterItemView);
                    var animate = false;
                    var $ball = licenseFilterItemView.$el.find('.license-filter-item');
                    var $name = licenseFilterItemView.$el.find('.name');
                    this.prepareItemForEntrance($ball, $name, licenseFilterItemView.name, animate);
                    this.$list.append(licenseFilterItemView.el);
                    tempArray.push(licenseFilterItemView);
                }
            }
            this.LICENSE_FILTERS = tempArray;
            Backbone.EventBroker.trigger('deleteLicenseFilter', view.name);
        },

        clearLicenseFilters: function () {
            var self = this;
            this.$list.empty();
            var licenseNamesArray = [];
            for (var i = 0; i < this.LICENSE_FILTERS.length; i++) {
                licenseNamesArray.push(self.LICENSE_FILTERS[i].name);
            }
            this.LICENSE_FILTERS = [];
            Backbone.EventBroker.trigger('clearLicenseFilters', licenseNamesArray);
        },

        setColorsAndInitials: function (colors_and_initials) {
            this.colors_and_initials = colors_and_initials;
        },

        addItem: function (data) {
            var licenseFilterItemView = new LicenseFilterItemView({
                tagName: 'li',
                name: data.value
            });
            licenseFilterItemView.render();
            this.addHoverListener(licenseFilterItemView);
            var $ball = licenseFilterItemView.$el.find('.license-filter-item');
            var $name = licenseFilterItemView.$el.find('.name');
            this.prepareItemForEntrance($ball, $name, data.value, data.animate);
            this.$list.append(licenseFilterItemView.el);
            this.LICENSE_FILTERS.push(licenseFilterItemView);
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
                self.handleDeleteLicenseFilter(view);
            });
        },

        prepareItemForEntrance: function ($ball, $name, value, animate) {
            var self = this;
            $ball.css({ backgroundColor: OSUtil.LICENSE_COLOR_MAP[value] });
            $name.html(value);
        },

        animateItemIn: function ($ball, $name) {
            $ball.velocity({width: 25, height: 25, top: 0, left: 0}, 690, [100, 15]);
            $name.animate({opacity: 1}, {duration: 300, queue: false});
        },

        render: function () {
            var self = this;
            this.$el.html(LicenseFiltersViewTpl());
            this.$list = this.$el.find('.license-filters-list');
        }
    });

    return LicenseFiltersView;

});
