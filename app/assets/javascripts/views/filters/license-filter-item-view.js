define(['jquery',
    'backbone',
    'underscore',
    'stache!views/filters/license-filter-item-view'
], function ($,
     Backbone,
     _,
     LicenseFilterItemViewTpl) {
    'use strict';

    var LicenseFilterItemView = Backbone.View.extend({

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
            self.$el.find('#removeLicenseFilter-' + self.name).show();
            self.$el.find('#removeLicenseFilter-' + self.name).animate({height: self.closeBtnDiameter}, options);
            self.$el.find('#removeLicenseFilter-' + self.name).animate({width: self.closeBtnDiameter}, options);
            self.$el.find('.name').show();
            self.$el.find('.name').animate({opacity: 1}, options);
        },

        fadeOut: function () {
            var self = this;
            var options = {
                duration: self.toggleDetailsDuration,
                queue: false
            };
            self.$el.find('#removeLicenseFilter-' + self.name).show();
            self.$el.find('#removeLicenseFilter-' + self.name).animate({height: 0}, options);
            self.$el.find('#removeLicenseFilter-' + self.name).animate({width: 0}, options);
            self.$el.find('.name').animate({opacity: 0}, options);
            setTimeout(function () {
                self.$el.find('#removeLicenseFilter-' + self.name).hide();
                self.$el.find('.name').hide();
            }, self.toggleDetailsDuration);
        },

        render: function () {
            var self = this;
            this.$el.html(LicenseFilterItemViewTpl({
                name: self.name
            }));
        }
    });

    return LicenseFilterItemView;

});
