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
            this.collapsed = false;
        },

		events: {
            'click #addLangSelection': 'handleAddBtnClick'
        },

        handleAddBtnClick: function () {
            var self = this;
            this.hideFiltersBtn();
            Backbone.EventBroker.trigger('showFilters');
        },

        hideFiltersBtn: function () {
            var self = this;
            this.$el.find('#addLangSelection').css('opacity', 100);
            setTimeout(function () {
                self.$el.find('#addLangSelection').hide();
            },100);
        },

        setColorsAndInitials: function (colors_and_initials) {
            this.colors_and_initials = colors_and_initials;
        },

        getItemSlidePos: function () {
            var itemLength = this.LANG_ITEMS.length;
            var roundedDisplacement = Math.ceil(itemLength/2);
            var even = itemLength % 2;
            var side = even ? -1 : 1;
            var newRight = even ? this.baseX + ((roundedDisplacement+itemLength) * this.itemDiameter) : this.baseX - ((roundedDisplacement-itemLength) * this.itemDiameter);
            return newRight;
        },

        addItem: function (value) {
            var newRight = this.getItemSlidePos();
            var langSelection = new LangSelectionView({
                tagName: 'li'
            });
            langSelection.passName(value);
            langSelection.render();
            this.addHoverListener(langSelection);
            this.prepareItemForEntrance(langSelection.el, value);
            this.$el.find('.lang-selection-list').append(langSelection.el);
            this.LANG_ITEMS.push(langSelection);
            this.slideItemIn(langSelection.el, newRight);
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

            });
        },

        prepareItemForEntrance: function (el, value) {
            var self = this;
            el.style.listStyleType = 'none';
            el.style.display = 'inline-block';
            el.style.position = 'relative';
            el.style.top = window.innerHeight + 'px';
            //Here's the color:   self.colors_and_initials[value]["color"]  do something with it maybe?
            //el.firstChild.style.color = self.colors_and_initials[value]["color"];
            var firstLetter = value[0] == '.' ? value[1].toUpperCase() : value[0].toUpperCase();
            $(el.firstChild).html(firstLetter);
            var $p = $(el).children().eq(1);
            $p.html(value);
            if (value.length > 11) {
                $(el).children().eq(1)[0].style.fontSize = '11px';
            }
            // also set the initial to self.colors_and_initials[value]["initials"];
        },

        slideItemIn: function (el, newRight) {
            $(el).velocity({ top: 0}, 900, [100, 15]);
        },

        toggleCollapse: function () {
            if (this.collapsed) {
                console.log('expand');
                //for (var i = 0; i < this.LANG_ITEMS.length; i++) {
                //    console.log(this.LANG_ITEMS[i].el.style.right);
                //}
            } else {
                console.log('collapse');
            }
            this.collapsed = !this.collapsed;
        },

        setSelfSize: function (width) {
            this.$el.find('.lang-selection-list')[0].style.width = this.langFrameWidth + 'px';
        },

        showFiltersBtn: function () {
            var self = this;
            var $filtersBtn = this.$el.find('#addLangSelection');
            $filtersBtn.css('opacity', 0);
            $filtersBtn.show();
            $filtersBtn.animate({ opacity: 1 }, 200);
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
