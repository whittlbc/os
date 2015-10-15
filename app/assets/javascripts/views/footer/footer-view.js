define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
	'stache!views/footer/footer-view',
    'selectize',
    'backbone-eventbroker'
    ], function ($,
     Backbone,
     _,
     OSUtil,
     FooterViewTpl) {
	'use strict';

	var FooterView = Backbone.View.extend({

		initialize: function (options) {
		    options = options || {};

            Backbone.EventBroker.register({
                'deleteLangFilter': 'deleteFilter',
                'deleteLicenseFilter': 'deleteFilter'
            }, this);

            this.setLangData(options.langData);
            this.licenseData = [
                {
                    "id": "MIT",
                    "title": "MIT"
                },
                {
                    "id": "GPL",
                    "title": "GPL"
                },
                {
                    "id": "BSD",
                    "title": "BSD"
                }
            ];
            this.filterType = null;
        },

        setLangData: function (data) {
            this.colors_and_initials = data.colors_and_initials;
            this.dropdown_items = data.dropdown_items;
            this.all_frames = data.all_frames;
        },

		events: {
            'click .btn-container > div': 'handleFilterBtnClicked'
        },

        deleteFilter: function (value) {
            this.footerDropdown.deleteFuckingSelection(value);
        },

        getItemsForDropdown: function () {
            switch (this.filterType) {
                case 0:
                    return this.dropdown_items;
                    break;
                case 1:
                    return this.licenseData;
                    break;
            }
        },

        renderDropdown: function () {
            var self = this;
            var options = {
                theme: 'links',
                maxItems: null,
                valueField: 'id',
                searchField: 'title',
                options: [],
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
                self.footerDropdownValue = selectize.getValue();
                if (!self.preventAddListener && self.all_frames[value] && !_.contains(self.footerDropdownValue, self.all_frames[value])){
                    selectize.lastQuery = null;
                    selectize.setTextboxValue('');
                    selectize.addItem(self.all_frames[value]);
                }

                if (!self.preventAddListener) {
                    self.trigger('addItem', {
                        set: self.filterType,
                        value: value,
                        dropdownValues: self.footerDropdownValue,
                        animate: true
                    });
                }

            });
            selectize.on('item_remove', function (value, $item) {
                self.footerDropdownValue = selectize.getValue();
                self.trigger('removeItem', {
                    set: self.filterType,
                    dropdownValues: self.footerDropdownValue
                });
            });

            $(document).click(function () {
                self.footerDropdown.blur();
                self.footerDropdown.$dropdown.addClass('hide-class');
                self.footerDropdown.$dropdown_content.addClass('remove-class');
                $('footer').removeClass('footer-dropdown-shown');
            });
        },

        addHoverListeners: function () {
            var self = this;
            this.$el.find('.filter-choice-container').hover(function () {
                if (self.filterType == null) {
                    $(this).addClass('hover-none-selected');
                }
            }, function () {
                if (self.filterType == null) {
                    $(this).removeClass('hover-none-selected');
                }
            });
        },

        handleFilterBtnClicked: function (e) {
            var self = this;
            // Language Filter Btn
            if (e.currentTarget.id === 'langFilterChoice' && this.filterType != 0) {
                this.filterType = 0;
                this.footerDropdown.clearOptions();
                this.footerDropdown.addOption(this.getItemsForDropdown());
            }
            // License Filter Btn
            else if (e.currentTarget.id === 'licenseFilterChoice' && this.filterType != 1) {
                this.filterType = 1;
                this.footerDropdown.clearOptions();
                this.footerDropdown.addOption(this.getItemsForDropdown());
            }
        },

        render: function () {
			var self = this;
            this.$el.html(FooterViewTpl());
            this.renderDropdown();
            this.$el.find('.search-container').click(function (e) {
                e.stopPropagation();
            });

            this.addHoverListeners();
		}
	});

	return FooterView;

});
