define(['jquery',
	'backbone',
	'underscore',
    'views/widgets/more-dropdown/more-dropdown-item',
	'stache!views/widgets/more-dropdown/more-dropdown',
    'backbone-eventbroker'
    ], function ($,
     Backbone,
     _,
     MoreDropdownItem,
     MoreDropdownTpl) {
	'use strict';

	var MoreDropdown = Backbone.View.extend({

		initialize: function () {
            this.ITEMS = [];
		},

		events: {},

        getNumItems: function () {
            return this.ITEMS.length;
        },

        populate: function (items) {
            var self = this;
            this.ITEMS = [];
            this.$list.empty();
            for (var i = 0; i < items.length; i++) {
                this.addItem(items[i]);
            }
        },

        addItem: function(name) {
            var item = new MoreDropdownItem({
                tagName: 'li',
                name: name
            });
            this.setItemListeners(item);
            item.render();
            this.$list.append(item.el);
            this.ITEMS.push(item);
        },

        setItemListeners: function (item) {
            var self = this;
            this.listenTo(item, 'item:remove', function(name) {
                self.trigger('item:remove');
                self.stripItemAndRepopulate(name);
                Backbone.EventBroker.trigger('deleteLangFilter', name);
            });
        },

        hideDropdown: function () {
            this.$el.find('.dropdown-container').hide();
        },

        showDropdown: function () {
            this.$el.find('.dropdown-container').show();
        },

        stripItemAndRepopulate: function (nameToRemove) {
            var newNamesArray = [];

            _.each(this.ITEMS, function(item) {
                if (item.name != nameToRemove) {
                    newNamesArray.push(item.name);
                }
            });

            if (_.isEmpty(newNamesArray)) {
                this.hideDropdown();
                this.trigger('list:empty');
                this.ITEMS = [];
                this.$list.empty();
            } else {
                this.populate(newNamesArray);
            }
        },

		render: function () {
			var self = this;
            this.$el.html(MoreDropdownTpl());
            this.$list = this.$el.find('.main-list');

            this.$el.hover(function () {
                self.showDropdown();
            }, function () {
                self.hideDropdown();
            });
		}
	});

	return MoreDropdown;

});
