define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
    'views/dropdowns/more-filters-dropup',
    'views/svgs/v-ellipsis',
	'stache!views/footer/footer-view',
    'selectize',
    'backbone-eventbroker'
    ], function ($,
     Backbone,
     _,
     OSUtil,
     MoreFiltersDropup,
     VEllipsis,
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

            this.chatData = [
                {
                    "id": "Slack",
                    "title": "Slack"
                },
                {
                    "id": "HipChat",
                    "title": "HipChat"
                },
                {
                    "id": "IRC",
                    "title": "IRC"
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
            'click .footer-filter-btn': 'handleFilterBtnClicked',
            'click .more-filters-btn': 'toggleMoreFiltersDropup'
        },

        toggleMoreFiltersDropup: function (e) {
            e.stopPropagation();
            if (this.moreFiltersDropup.$el.css('display') === 'none') {
                this.moreFiltersDropup.$el.show();
                this.trigger('hide-header-dropdowns-only');
            } else {
                this.moreFiltersDropup.$el.hide();
            }
        },

        // needed for calls from other views
        hideDropup: function () {
            this.moreFiltersDropup.$el.hide();
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
                case 2:
                    return this.chatData;
                    break;
            }
        },

        hideDropdown: function () {
            var self = this;
            self.footerDropdown.blur();
            self.footerDropdown.$dropdown.addClass('hide-class');
            self.footerDropdown.$dropdown_content.addClass('remove-class');
            $('footer').removeClass('footer-dropdown-shown');
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
                    self.hideDropdown();
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
                self.hideDropdown();
                self.moreFiltersDropup.$el.hide();
            });
        },

        addHoverListeners: function () {
            var self = this;
            this.$filterChoiceContainer.hover(function () {
                if (self.filterType == null) {
                    $(this).addClass('show-filter-btns');
                } else {
                    self.$filterBtns.addClass('show-all');
                }
            }, function () {
                if (self.filterType == null) {
                    $(this).removeClass('show-filter-btns');
                } else {
                    self.$filterBtns.removeClass('show-all');
                }
            });

            this.vEllipsis.$el.hover(function () {
                self.vEllipsis.changeColor('#00A6C9');
            }, function() {
                self.vEllipsis.changeColor('#cecece');
            });
        },

        handleFilterBtnClicked: function (e) {
            this.$filterBtns.removeClass('not-selected not-selected-hide-left not-selected-hide-right selected-filter show-all');

            switch (e.currentTarget.id) {
                case 'langFilterChoice':
                    $(e.currentTarget).addClass('selected-filter');
                    this.$licenseFilterBtn.addClass('not-selected-hide-right');
                    this.$chatFilterBtn.addClass('not-selected');
                    this.resetDropdown(0);
                    break;
                case 'licenseFilterChoice':
                    this.$langFilterBtn.addClass('not-selected');
                    $(e.currentTarget).addClass('selected-filter');
                    this.$chatFilterBtn.addClass('not-selected');
                    this.resetDropdown(1);
                    break;
                case 'chatFilterChoice':
                    this.$langFilterBtn.addClass('not-selected');
                    this.$licenseFilterBtn.addClass('not-selected-hide-left');
                    $(e.currentTarget).addClass('selected-filter');
                    this.resetDropdown(2);
                    break;
            }
        },

        resetDropdown: function (filterTypeInt) {
            if (this.filterType != filterTypeInt) {
                this.filterType = filterTypeInt;
                this.footerDropdown.clearOptions();
                this.footerDropdown.addOption(this.getItemsForDropdown());
                this.$el.find('.search-container input').focus();
            }
        },

        getFiltersWithStatus: function () {
            var self = this;
            switch (this.filterType) {
                case 0:
                    return {
                        selected: this.$el.find('#langFilterChoice'),
                        not: this.$el.find('#licenseFilterChoice')
                    };
                    break;
                case 1:
                    return {
                        selected: this.$el.find('#licenseFilterChoice'),
                        not: this.$el.find('#langFilterChoice')
                    };
                    break;
            }
        },

        forceSetFilter: function () {
            var self = this;
            var $filterBtn;
            this.$el.find('.filter-choice-container').addClass('hover-none-selected');
            switch (this.filterType) {
                case 0:
                    $filterBtn = self.$el.find('#langFilterChoice');
                    break;
                case 1:
                    $filterBtn = self.$el.find('#licenseFilterChoice');
                    break;

            }
            $filterBtn.addClass('selected-color selected-filter');
        },

        render: function () {
			var self = this;
            this.$el.html(FooterViewTpl());
            this.renderDropdown();

            this.moreFiltersDropup = new MoreFiltersDropup({
                el: '#moreFiltersDropUp'
            });

            this.listenTo(this.moreFiltersDropup, 'item:clicked', function (id) {
                self.trigger('more-filters-toggle', id);
            });

            this.moreFiltersDropup.render();

            this.$el.find('.search-container').click(function (e) {
                e.stopPropagation();
                self.moreFiltersDropup.$el.hide();
            });

            this.vEllipsis = new VEllipsis({
                el: '.more-filters-btn'
            });

            this.vEllipsis.render();

            this.$langFilterBtn = this.$el.find('#langFilterChoice');
            this.$licenseFilterBtn = this.$el.find('#licenseFilterChoice');
            this.$chatFilterBtn = this.$el.find('#chatFilterChoice');
            this.$filterChoiceContainer = this.$el.find('.filter-choice-container');
            this.$filterBtns = this.$el.find('.footer-filter-btn');
            this.addHoverListeners();

		}
	});

	return FooterView;

});
