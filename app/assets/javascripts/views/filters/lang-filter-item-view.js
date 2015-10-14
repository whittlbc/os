define(['jquery',
	'backbone',
	'underscore',
	'stache!views/filters/lang-filter-item-view'
    ], function ($,
     Backbone,
     _,
     LangFIlterItemViewTpl) {
	'use strict';

	var LangFIlterItemView = Backbone.View.extend({

		initialize: function (options) {
            options = options || {};
            this.realName = options.name;
            if (this.realName) {
                this.name = this.realName.replace(/ /g,'').replace(/\+/g,'plus').replace(/#/g,'sharp').replace(/\./g,'dot');
            }
            this.toggleDetailsDuration = 130;
            this.closeBtnDiameter = 18;
            this.closeBtnInitialPos = 8;
		},
        
        showClose: function () {
            var self = this;
            var options = {
                duration: self.toggleDetailsDuration,
                queue: false
            };
            self.$el.find('#removeLangFilter-' + self.name).show();
            self.$el.find('#removeLangFilter-' + self.name).animate({height: self.closeBtnDiameter}, options);
            self.$el.find('#removeLangFilter-' + self.name).animate({width: self.closeBtnDiameter}, options);
            self.$el.find('#removeLangFilter-' + self.name).animate({top: self.closeBtnInitialPos - (self.closeBtnDiameter / 2)}, options);
            self.$el.find('#removeLangFilter-' + self.name).animate({right: self.closeBtnInitialPos - (self.closeBtnDiameter / 2)}, options);
        },

        hideClose: function () {
            var self = this;
            var options = {
                duration: self.toggleDetailsDuration,
                queue: false
            };
            self.$el.find('#removeLangFilter-' + self.name).show();
            self.$el.find('#removeLangFilter-' + self.name).animate({height: 0}, options);
            self.$el.find('#removeLangFilter-' + self.name).animate({width: 0}, options);
            self.$el.find('#removeLangFilter-' + self.name).animate({top: self.closeBtnInitialPos}, options);
            self.$el.find('#removeLangFilter-' + self.name).animate({right: self.closeBtnInitialPos}, options);
            setTimeout(function () {
                self.$el.find('#removeLangFilter-' + self.name).hide();
            }, self.toggleDetailsDuration);
        },

		render: function () {
			var self = this;
            this.$el.html(LangFIlterItemViewTpl({
                name: self.name
            }));
		}
	});

	return LangFIlterItemView;

});
