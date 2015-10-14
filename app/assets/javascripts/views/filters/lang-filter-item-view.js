define(['jquery',
	'backbone',
	'underscore',
	'stache!views/filters/lang-filter-item-view'
    ], function ($,
     Backbone,
     _,
     LangFilterItemViewTpl) {
	'use strict';

	var LangFilterItemView = Backbone.View.extend({

		initialize: function (options) {
            options = options || {};
            this.realName = options.name;
            if (this.realName) {
                this.name = this.realName.replace(/ /g,'').replace(/\+/g,'plus').replace(/#/g,'sharp').replace(/\./g,'dot');
            }
            this.toggleDetailsDuration = 130;
            this.closeBtnDiameter = 18;
		},

        fadeIn: function () {
            var self = this;
            var options = {
                duration: self.toggleDetailsDuration,
                queue: false
            };
            self.$el.find('#removeLangFilter-' + self.name).show();
            self.$el.find('#removeLangFilter-' + self.name).animate({height: self.closeBtnDiameter}, options);
            self.$el.find('#removeLangFilter-' + self.name).animate({width: self.closeBtnDiameter}, options);
            self.$el.find('.name').show();
            self.$el.find('.name').animate({opacity: 1}, options);
        },

        fadeOut: function () {
            var self = this;
            var options = {
                duration: self.toggleDetailsDuration,
                queue: false
            };
            self.$el.find('#removeLangFilter-' + self.name).show();
            self.$el.find('#removeLangFilter-' + self.name).animate({height: 0}, options);
            self.$el.find('#removeLangFilter-' + self.name).animate({width: 0}, options);
            self.$el.find('.name').animate({opacity: 0}, options);
            setTimeout(function () {
                self.$el.find('#removeLangFilter-' + self.name).hide();
                self.$el.find('.name').hide();
            }, self.toggleDetailsDuration);
        },

		render: function () {
			var self = this;
            this.$el.html(LangFilterItemViewTpl({
                name: self.name
            }));
		}
	});

	return LangFilterItemView;

});
