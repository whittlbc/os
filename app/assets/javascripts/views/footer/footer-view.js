define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
	'stache!views/footer/footer-view',
    'selectize'
    ], function ($,
     Backbone,
     _,
     OSUtil,
     FooterViewTpl) {
	'use strict';

	var FooterView = Backbone.View.extend({

		initialize: function (options) {
		    options = options || {};
            this.setLangData(options.langData);
        },

        setLangData: function (data) {
            this.colors_and_initials = data.colors_and_initials;
            this.dropdown_items = data.dropdown_items;
            this.all_frames = data.all_frames;
        },

		events: {},

        renderSearchBar: function () {
            var self = this;
            var options = {
                theme: 'links',
                maxItems: null,
                valueField: 'id',
                searchField: 'title',
                options: this.dropdown_items,
                original: false,
                selectOnTab: false,
                onFocus: function () {
                    if (!self.footerDropdownShown) {
                    }
                },
                onBlur: function() {
                    if (self.footerDropdownShown) {
                    }
                },
                render: {
                    option: function (data, escape) {
                        return '<div class="option title">' + escape(data.title) + '</div>';
                    },
                    item: function (data, escape) {
                        return '<div class="item">' + escape(data.title) + '</div>';
                    }
                }
            };

            var $select = this.$el.find('#footerSelect').selectize(options);
            var selectize = $select[0].selectize;
            this.footerDropdown = selectize;
            this.footerDropdown.$dropdown.width(self.$el.width());
            this.footerDropdown.
            this.footerDropdown.$dropdown.css({
                top: -200,
                left: 0
            });
            selectize.on('item_add', function (value, $item) {
                if (!self.preventAddListener && self.all_frames[value] && !_.contains(self.footerDropdownValue, self.all_frames[value])){
                    self.footerDropdownValue = selectize.getValue();
                    selectize.lastQuery = null;
                    selectize.setTextboxValue('');
                    selectize.addItem(self.all_frames[value]);
                } else {
                    self.footerDropdownValue = selectize.getValue();
                    self.getFilters();
                }

                if (!self.preventAddListener) {
                    self.langSelectionList.addItem(value, true);
                }

            });
            selectize.on('item_remove', function (value, $item) {
                self.footerDropdownValue = selectize.getValue();
                self.getFilters();
            });
        },

        getFilters: function () {
            var self = this;

        },

		render: function () {
			var self = this;
            this.$el.html(FooterViewTpl());

            this.renderSearchBar();
		}
	});

	return FooterView;

});
