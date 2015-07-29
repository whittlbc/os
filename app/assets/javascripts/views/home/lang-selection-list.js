define(['jquery',
	'backbone',
	'underscore',
    'views/home/lang-selection-view',
    'stache!views/home/lang-selection-list',
    'velocity'
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
            el.style.display = 'inline-block';
            el.style.listStyleType = 'none';
            el.style.position = 'relative';
            el.style.right = -1 * (window.innerWidth - (this.$el.find('.lang-selection-list').length * this.itemDiameter)) + 'px';
        },

        slideItemIn: function (el, newRight) {
            $(el).velocity({ right: newRight}, 900, [100, 15]);
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

		render: function () {
			var self = this;
            this.$el.html(LangSelectionListTpl());

            var $header = this.$el.find(".lang-selection-list");
            $(window).scroll(function(e){
                var scrollTop = $(window).scrollTop();
                if (scrollTop > 195 && $header.css('position') != 'fixed'){
                    $header.css({'position': 'fixed', 'top': '65px'});
                    self.toggleCollapse();
                }
                if (scrollTop < 255 && $header.css('position') == 'fixed')
                {
                    $header.css({'position': 'relative', 'top': '150px'});
                }
            });

		}
	});

	return LangSelectionList;

});
