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
		},

		events: {
        },

        addItem: function () {
            var langSelection = new LangSelectionView({
                tagName: 'li'
            });
            langSelection.render();
            this.prepareItemForEntrance(langSelection.el);
            this.$el.find('.lang-selection-list').append(langSelection.el);
            this.LANG_ITEMS.push(langSelection);
            this.slideItemIn(langSelection.el);
        },

        prepareItemForEntrance: function (el) {
            el.style.display = 'inline-block';
            el.style.listStyleType = 'none';
            el.style.position = 'relative';
            el.style.right = -1 * (window.innerWidth - (this.$el.find('.lang-selection-list').length * 50)) + 'px';
        },

        slideItemIn: function (el) {
            $(el).velocity({ right: 0}, 900, [100, 15]);
        },

		render: function () {
			var self = this;
            this.$el.html(LangSelectionListTpl());
		}
	});

	return LangSelectionList;

});
