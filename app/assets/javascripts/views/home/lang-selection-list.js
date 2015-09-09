define(['jquery',
	'backbone',
	'underscore',
    'views/home/lang-selection-view',
    'stache!views/home/lang-selection-list',
    'velocity',
    'backbone-eventbroker'
], function ($,
     Backbone,
     _,
     LangSelectionView,
     LangSelectionListTpl) {
	'use strict';

	var LangSelectionList = Backbone.View.extend({

		initialize: function () {
            this.LANG_ITEMS = [];
            this.baseX = -1*((window.innerWidth/2)-25);
            this.itemDiameter = 50;
        },

		events: {
            'click #clearLangFiltersBtn': 'clearLangFilters'
        },

        handleDeleteLangFilter: function(view) {
            var self = this;
            var $filtersUL = this.$el.find('.lang-selection-list');
            $filtersUL.empty();
            var tempArray = [];
            for (var i = 0; i < this.LANG_ITEMS.length; i++) {
                if (self.LANG_ITEMS[i].realName != view.realName) {
                    var langSelection = self.LANG_ITEMS[i];
                    langSelection.render();
                    self.addHoverListener(langSelection);
                    var animate = false;
                    self.prepareItemForEntrance(langSelection.el, langSelection.realName, animate);
                    $filtersUL.append(langSelection.el);
                    tempArray.push(langSelection);
                }
            }
            this.LANG_ITEMS = tempArray;
            Backbone.EventBroker.trigger('deleteLangFilter', view.realName);
        },

        clearLangFilters: function () {
            var self = this;
            var $filtersUL = this.$el.find('.lang-selection-list');
            $filtersUL.empty();
            var langNamesArray = [];
            for (var i = 0; i < this.LANG_ITEMS.length; i++) {
                langNamesArray.push(self.LANG_ITEMS[i].realName);
            }
            this.LANG_ITEMS = [];
            Backbone.EventBroker.trigger('clearLangFilters', langNamesArray);
        },

        setColorsAndInitials: function (colors_and_initials) {
            this.colors_and_initials = colors_and_initials;
        },

        addItem: function (value) {
            var langSelection = new LangSelectionView({
                tagName: 'li'
            });
            langSelection.passName(value);
            langSelection.render();
            this.addHoverListener(langSelection);
            var animate = true;
            this.prepareItemForEntrance(langSelection.el, value, animate);
            this.$el.find('.lang-selection-list').append(langSelection.el);
            this.LANG_ITEMS.push(langSelection);
            this.slideItemIn(langSelection.el);
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
            el.style.top = animate ? (window.innerHeight + 'px') : '0px';
            $(el.firstChild).html(self.colors_and_initials[value]["initials"]);
            var $p = $(el).children().eq(1);
            $p.html(value);
            if (value.length > 11) {
                $(el).children().eq(1)[0].style.fontSize = '11px';
            }
        },

        slideItemIn: function (el) {
            $(el).velocity({ top: 0}, 900, [100, 15]);
        },

        setSelfSize: function (width) {
            this.$el.find('.lang-selection-list')[0].style.width = this.langFrameWidth + 'px';
        },

		render: function (width) {
			var self = this;
            this.$el.html(LangSelectionListTpl());
            this.langFrameWidth = ((window.innerWidth-800)/2);
            this.setSelfSize(width);
            this.trigger('langFrameWidth', this.langFrameWidth);
            this.$el.find('.lang-selection-list').scroll(function(){
                self.$el.find('.lang-selection-list')[0].style.marginTop = '15px';
            });
		}
	});

	return LangSelectionList;

});
