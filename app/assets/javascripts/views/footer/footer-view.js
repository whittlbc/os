define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
    'views/dropdowns/more-filters-dropup',
    'views/svgs/svg-view',
	'stache!views/footer/footer-view',
    'selectize',
    'backbone-eventbroker'
    ], function ($,
     Backbone,
     _,
     OSUtil,
     MoreFiltersDropup,
     SVG,
     FooterViewTpl) {
	'use strict';

	var FooterView = Backbone.View.extend({

		initialize: function (options) {
		    options = options || {};

            Backbone.EventBroker.register({
                'deleteLangFilter': 'deleteFilter',
                'deleteLicenseFilter': 'deleteFilter',
                'deleteChatFilter': 'deleteFilter'
            }, this);

            this.setLangData(options.langData);

            this.licenseData = {
                "MIT": {
                    "id": "MIT",
                    "title": "MIT"
                },
                "GPL": {
                    "id": "GPL",
                    "title": "GPL"
                },
                "BSD": {
                    "id": "BSD",
                    "title": "BSD"
                }
            };

            this.chatData = {
                "Slack": {
                    "id": "Slack",
                    "title": "Slack"
                },
                "HipChat": {
                    "id": "HipChat",
                    "title": "HipChat"
                },
                "IRC": {
                    "id": "IRC",
                    "title": "IRC"
                }
            };

            this.filterType = null;

            // used to hold the cache for div items selected by dropdown
            this.removedItems = {
                0: {},
                1: {},
                2: {}
            };

            // used to hold the VALUES for those selected items
            this.removedValues = {
                0: {},
                1: {},
                2: {}
            };
        },

        setLangData: function (data) {
            this.colors_and_initials = data.colors_and_initials;
            this.langMap = data.langMap;
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
            var allItems;
            switch (this.filterType) {
                case 0:
                    allItems = this.langMap;
                    return this.getItemsStillUpForSelection(0, allItems);
                    break;
                case 1:
                    allItems = this.licenseData;
                    return this.getItemsStillUpForSelection(1, allItems);
                    break;
                case 2:
                    allItems = this.chatData;
                    return this.getItemsStillUpForSelection(2, allItems);
                    break;
            }
        },

        getItemsStillUpForSelection: function (int, allItems) {
            var alreadySelectedItems = this.removedValues[int];

            // return all items if none exist inside the removedValues map for that filter type
            if (_.isEmpty(alreadySelectedItems)) {
                return this.arrayFromMap(allItems);
            }

            var alreadySelectedItemsArray = Object.keys(alreadySelectedItems);

            for (var i = 0; i < alreadySelectedItemsArray.length; i++) {
                delete allItems[alreadySelectedItemsArray[i]];
            }
            return this.arrayFromMap(allItems);
        },

        arrayFromMap: function (map) {
            var values = [];
            for (var key in map) {
                values.push(map[key]);
            }
            return values;
        },

        addItemToSelectedMap: function (value) {
            this.removedValues[this.filterType][value] = value;
        },

        removeItemFromSelectedMap: function (value) {
            delete this.removedValues[this.filterType][value];
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
                self.addItemToSelectedMap(value);
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
                self.removeItemFromSelectedMap(value);
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
            // if this is not the same filter type, proceed
            if (this.filterType != filterTypeInt) {

                // cache the removed items for the current filter type
                this.removedItems[this.filterType] = this.footerDropdown.$removedItems;

                // set the new filterType
                this.filterType = filterTypeInt;

                // clear out all dropdown options
                this.footerDropdown.clearOptions();

                // add the new dropdown items for the new type, leaving out ones already selected
                this.footerDropdown.addOption(this.getItemsForDropdown());

                // check to see if you have a cache of the removed items for this new filter type
                var removedItemsForType = this.removedItems[filterTypeInt];
                // if you do, set it as the $removedItems for the dropdown
                if (removedItemsForType) {
                    this.footerDropdown.setRemovedItems(removedItemsForType);
                }
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

            this.vEllipsis = new SVG({
                el: '.more-filters-btn',
                svg: 'v-ellipsis'
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
