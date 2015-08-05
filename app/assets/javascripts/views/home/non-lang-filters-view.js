define(['jquery',
	'backbone',
	'underscore',
	'stache!views/home/non-lang-filters-view',
    'backbone-eventbroker'
    ], function ($,
     Backbone,
     _,
     NonLangFiltersViewTpl) {
	'use strict';

	var NonLangFiltersView = Backbone.View.extend({

		initialize: function () {
            Backbone.EventBroker.register({
                'showFilters': 'showFilters'
            }, this);
            this.openFilterDuration = 625;
		},

		events: {
            'click .licenseFilterBtn': 'handleSelectLicenseFilter',
            'click .privacyFilterBtn': 'handleSelectPrivacyFilter',
            'click #clearNonLangFiltersBtn': 'clearNonLangFilters'
        },

        hasSelectedClass: function (target) {
            return $(target).hasClass('selectedFilter');
        },

        removeHoverClass: function (target, filterTypeClass) {
            $(target).removeClass(filterTypeClass);
            $(target).removeClass('z-depth-1-half');
        },

        addHoverClass: function (target, filterTypeClass) {
            $(target).addClass(filterTypeClass);
            $(target).addClass('z-depth-1-half');
        },

        addSelectedClass: function (target, filterTypeClass) {
            $(target.firstChild).css('opacity', 1);
            $(target).addClass('selectedFilter');
            $(target).addClass(filterTypeClass);
        },

        removeSelectedClass: function (target) {
            $(target.firstChild).css('opacity', 0);
            $(target).removeClass('selectedFilter');
        },


        handleSelectLicenseFilter: function (e) {
            if (!this.hasSelectedClass(e.currentTarget)) {
                this.addSelectedClass(e.currentTarget, 'licenseFilterBtnSelected');
                Backbone.EventBroker.trigger('addLicenseFilter', e.currentTarget.id);
            } else {
                this.removeSelectedClass(e.currentTarget);
                this.removeHoverClass(e.currentTarget, 'licenseFilterBtnSelected');
                Backbone.EventBroker.trigger('removeLicenseFilter', e.currentTarget.id);
            }
        },

        handleSelectPrivacyFilter: function (e) {
            if (!this.hasSelectedClass(e.currentTarget)) {
                this.addSelectedClass(e.currentTarget, 'privacyFilterBtnSelected');
                Backbone.EventBroker.trigger('addPrivacyFilter', e.currentTarget.id);
            } else {
                this.removeSelectedClass(e.currentTarget);
                this.removeHoverClass(e.currentTarget, 'privacyFilterBtnSelected');
                Backbone.EventBroker.trigger('removePrivacyFilter', e.currentTarget.id);
            }
        },

        clearNonLangFilters: function () {
            var self = this;
            Backbone.EventBroker.trigger('clearNonLangFilters');
            var $licenseFilterChildren = this.$el.find('.licenseFilters').children();
            var $privacyFilterChildren = this.$el.find('.privacyFilters').children();
            for (var i = 0; i < $licenseFilterChildren.length; i++) {
                self.removeSelectedClass($licenseFilterChildren[i]);
                self.removeHoverClass($licenseFilterChildren[i], 'licenseFilterBtnSelected');
            }
            for (var i = 0; i < $privacyFilterChildren.length; i++) {
                self.removeSelectedClass($privacyFilterChildren[i]);
                self.removeHoverClass($privacyFilterChildren[i], 'privacyFilterBtnSelected');
            }
        },

        showFilters: function () {
            var self = this;
            this.$el.find('#nonLangFiltersMaster').animate({ height: 400 }, {
                duration: this.openFilterDuration,
                queue: false
            });
            this.$el.find('#clearNonLangFiltersBtnContainer').show();
            this.$el.find('#clearNonLangFiltersBtn').animate({ opacity: 1 }, {
                duration: 300,
                queue: false
            });
            setTimeout(function(){
                self.$el.find('#nonLangFiltersMaster').css('overflow', 'scroll');
            }, self.openFilterDuration);
        },

        addClassListeners: function () {
            var self = this;

            // License Filter Btns
            this.$el.find('.licenseFilterBtn').mouseenter(function(e){
                self.addHoverClass(e.currentTarget, 'licenseFilterBtnSelected');
            });
            this.$el.find('.licenseFilterBtn').mouseleave(function(e){
                if (!self.hasSelectedClass(e.currentTarget)) {
                    self.removeHoverClass(e.currentTarget, 'licenseFilterBtnSelected');
                }
            });

            // Privacy Filter Btns
            this.$el.find('.privacyFilterBtn').mouseenter(function(e){
                self.addHoverClass(e.currentTarget, 'privacyFilterBtnSelected');
            });
            this.$el.find('.privacyFilterBtn').mouseleave(function(e){
                if (!self.hasSelectedClass(e.currentTarget)) {
                    self.removeHoverClass(e.currentTarget, 'privacyFilterBtnSelected');
                }
            });

        },

		render: function () {
			var self = this;
            this.$el.html(NonLangFiltersViewTpl());
            this.addClassListeners();
		}
	});

	return NonLangFiltersView;

});
