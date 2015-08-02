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

        getItemSlidePos: function () {
            var itemLength = this.LANG_ITEMS.length;
            var roundedDisplacement = Math.ceil(itemLength/2);
            var even = itemLength % 2;
            var side = even ? -1 : 1;
            var newRight = even ? this.baseX + ((roundedDisplacement+itemLength) * this.itemDiameter) : this.baseX - ((roundedDisplacement-itemLength) * this.itemDiameter);
            return newRight;
        },

        addItem: function () {
            var newRight = this.getItemSlidePos();
            var langSelection = new LangSelectionView({
                tagName: 'li'
            });
            langSelection.render();
            this.prepareItemForEntrance(langSelection.el);
            this.$el.find('.lang-selection-list').append(langSelection.el);
            this.LANG_ITEMS.push(langSelection);
            this.slideItemIn(langSelection.el, newRight);
        },

        prepareItemForEntrance: function (el) {
            el.style.listStyleType = 'none';
            el.style.display = 'inline-block';
            el.style.position = 'relative';
            el.style.top = window.innerHeight + 'px';
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

		render: function (width) {
			var self = this;
            this.$el.html(LangSelectionListTpl());
            this.langFrameWidth = ((window.innerWidth-800)/2);
            this.setSelfSize(width);
            this.trigger('langFrameWidth', this.langFrameWidth);
		}
	});

	return LangSelectionList;

});
