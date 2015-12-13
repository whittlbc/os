define(['jquery',
	'backbone',
	'underscore',
	'stache!views/widgets/more-dropdown/more-dropdown-item'
    ], function ($,
     Backbone,
     _,
     MoreDropdownItemTpl) {
	'use strict';

	var MoreDropdownItem = Backbone.View.extend({

		initialize: function (options) {
            options = options || {};
            this.name = options.name;
            this.interactive = options.interactive;
		},

		events: {
            'click .remove-item-btn': 'removeItem'
        },

        removeItem: function (e) {
            e.stopPropagation();
            this.trigger('item:remove', this.name);
        },

		render: function () {
			var self = this;
            this.$el.html(MoreDropdownItemTpl({
                interactive: this.interactive,
                name: this.name
            }));
		}
	});

	return MoreDropdownItem;

});
