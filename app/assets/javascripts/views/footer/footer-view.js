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

        renderDropdown: function () {
            var self = this;
            var options = {
                theme: 'links',
                maxItems: null,
                valueField: 'id',
                searchField: 'title',
                options: this.dropdown_items,
                original: false,
                selectOnTab: false,
                openOnFocus: false,
                onFocus: function () {
                },
                onBlur: function() {
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
            this.footerDropdown.positionDropdown = function () {
                self.footerDropdown.$dropdown.css({
                    width: self.$el.width(),
                    bottom: 46,
                    left: -14
                });
            };

            selectize.on('dropdown_open', function () {
                self.footerDropdown.$dropdown.removeClass('hide-class');
                self.footerDropdown.$dropdown_content.removeClass('remove-class');
                $('footer').addClass('footer-dropdown-shown');
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
                    self.trigger('addItem', {
                        value: value,
                        animate: true
                    });
                }

            });
            selectize.on('item_remove', function (value, $item) {
                self.footerDropdownValue = selectize.getValue();
                self.getFilters();
            });

            $(document).click(function () {
                self.footerDropdown.blur();
                self.footerDropdown.$dropdown.addClass('hide-class');
                self.footerDropdown.$dropdown_content.addClass('remove-class');
                $('footer').removeClass('footer-dropdown-shown');
            });
        },

        getFilters: function () {
            var self = this;
        },

		render: function () {
			var self = this;
            this.$el.html(FooterViewTpl());
            this.renderDropdown();
            this.$el.find('.search-container').click(function (e) {
                e.stopPropagation();
            });
		}
	});

	return FooterView;

});
