define(['jquery',
  'backbone',
  'underscore',
  'models/os.util',
  'models/all-langs',
  'views/dropdowns/more-filters-dropup',
  'views/svgs/svg-view',
  'stache!views/footer/footer-view',
  'selectize',
  'backbone-eventbroker'
], function ($,
   Backbone,
   _,
   OSUtil,
   AllLangs,
   MoreFiltersDropup,
   SVG,
   FooterViewTpl
) {
  'use strict';

  var FooterView = Backbone.View.extend({

    initialize: function (options) {
      options = options || {};
      this.getAllLanguages();

      Backbone.EventBroker.register({
        'deleteLangFilter': 'deleteLangFilter',
        'deleteDomainFilter': 'deleteDomainFilter',
        'deleteSeekingFilter': 'deleteSeekingFilter'
      }, this);

      this.filterType = null;

      this.seekingMap = {
        0: OSUtil.SEEKING_IDEAS_FILTERS,
        1: OSUtil.SEEKING_LAUNCHED_FILTERS
      };

      // cache of selected values for each filter type
      this.removedValues = {
        0: {},
        1: {},
        2: {
          0: {},
          1: {}
        }
      };
    },

    setFeedStatus: function (status) {
      this.status = status;
    },

    changeFeedType: function (status) {
      this.status = status;
      // force reset dropdown if switching feed types while on Seeking filters
      if (this.filterType === OSUtil.SEEKING_FILTER_SET) {
        this.resetDropdown(this.filterType, true);
      }
    },

    getAllLanguages: function () {
      this.allLangs = AllLangs.getAll();
      this.langMap = this.allLangs.langMap;
      this.all_frames = this.allLangs.all_frames;
    },

    events: {
      'click .footer-filter-btn': 'handleFilterBtnClicked',
      'click .more-filters-btn': 'toggleMoreFiltersDropup'
    },

    deleteLangFilter: function (value) {
      var self = this;
      if (this.filterType === 0) {
        this.deleteFilter(value);
      } else {
        delete this.removedValues[0][value];
        self.trigger('removeItem', {
          set: 0,
          dropdownValues: self.getDropdownValues(0)
        });
      }

    },

    deleteDomainFilter: function (value) {
      var self = this;
      if (this.filterType === 1) {
        this.deleteFilter(value);
      } else {
        delete this.removedValues[1][value];
        self.trigger('removeItem', {
          set: 1,
          dropdownValues: self.getDropdownValues(1)
        });
      }
    },

    deleteSeekingFilter: function (value) {
      var self = this;
      if (this.filterType === 2) {
        this.deleteFilter(value);
      } else {
        delete this.removedValues[2][this.status][value];
        self.trigger('removeItem', {
          set: 2,
          dropdownValues: self.getDropdownValues(2)
        });
      }
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
      var items = {};
      var values = [];

      switch (this.filterType) {
        case 0:
          items = this.langMap;
          break;
        case 1:
          items = OSUtil.DOMAIN_FILTERS;
          break;
        case 2:
          items = this.seekingMap[this.status];
          break;
      }

      for (var key in items) {
        values.push(items[key]);
      }

      return values;
    },

    addItemToSelectedMap: function (value) {
      if (this.filterType === OSUtil.SEEKING_FILTER_SET) {
        this.removedValues[this.filterType][this.status][value] = value;
      } else {
        this.removedValues[this.filterType][value] = value;
      }
    },

    removeItemFromSelectedMap: function (value) {
      if (this.filterType === OSUtil.SEEKING_FILTER_SET) {
        delete this.removedValues[this.filterType][this.status][value];
      } else {
        delete this.removedValues[this.filterType][value];
      }
    },

    hideDropdown: function () {
      var self = this;
      self.footerDropdown.blur();
      self.footerDropdown.$dropdown.addClass('hide-class');
      self.footerDropdown.$dropdown_content.addClass('remove-class');
      $('footer').removeClass('footer-dropdown-shown');
    },

    getDropdownValues: function (int) {
      if (_.isUndefined(int)) {
        int = this.filterType;
      }

      var obj = this.removedValues[int];

      if (this.filterType === OSUtil.SEEKING_FILTER_SET) {
        obj = obj[this.status];
      }

      return Object.keys(obj);
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
        onBlur: function () {
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
          bottom: 50,
          left: '-2.8%'
        });
      };

      selectize.on('dropdown_open', function () {
        self.footerDropdown.$dropdown.removeClass('hide-class');
        self.footerDropdown.$dropdown_content.removeClass('remove-class');
        $('footer').addClass('footer-dropdown-shown');
      });

      selectize.on('item_add', function (value, $item) {
        self.addItemToSelectedMap(value);
        self.footerDropdownValue = self.getDropdownValues();
        if (!self.preventAddListener && self.all_frames[value] && !_.contains(self.footerDropdownValue, self.all_frames[value])) {
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
        self.removeItemFromSelectedMap(value);
        self.footerDropdownValue = self.getDropdownValues();
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
          self.$filterBtns.
            addClass('show-all');
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
      }, function () {
        self.vEllipsis.changeColor('#cecece');
      });
    },

    handleFilterBtnClicked: function (e) {
      this.$filterBtns.removeClass('not-selected not-selected-hide-left not-selected-hide-right selected-filter show-all');

      switch (e.currentTarget.id) {
        case 'langFilterChoice':
          $(e.currentTarget).addClass('selected-filter');
          this.$domainFilterBtn.addClass('not-selected-hide-right');
          this.$seekingFilterBtn.addClass('not-selected');
          this.resetDropdown(0);
          break;
        case 'domainFilterChoice':
          this.$langFilterBtn.addClass('not-selected');
          $(e.currentTarget).addClass('selected-filter');
          this.$seekingFilterBtn.addClass('not-selected');
          this.resetDropdown(1);
          break;
        case 'seekingFilterChoice':
          this.$langFilterBtn.addClass('not-selected');
          this.$domainFilterBtn.addClass('not-selected-hide-left');
          $(e.currentTarget).addClass('selected-filter');
          this.resetDropdown(2);
          break;
      }
    },

    resetDropdown: function (filterTypeInt, force) {
      var self = this;

      if ((this.filterType != filterTypeInt) || force) {

        // set the new filterType
        this.filterType = filterTypeInt;

        // clear out all dropdown options
        this.footerDropdown.clearOptions();

        // add the new dropdown items for the new type, leaving out ones already selected
        this.footerDropdown.addOption(this.getItemsForDropdown());

        // check to see if you have a cache of the removed values for this new filter type
        var removedValuesForType = this.removedValues[filterTypeInt];

        if (filterTypeInt === OSUtil.SEEKING_FILTER_SET) {
          removedValuesForType = removedValuesForType[this.status];
        }

        if (removedValuesForType) {
          this.preventAddListener = true;
          this.footerDropdown.addItems(Object.keys(removedValuesForType), true, function () {
            self.preventAddListener = false;
          });
        }
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
          $filterBtn = self.$el.find('#domainFilterChoice');
          break;

      }
      $filterBtn.addClass('selected-color selected-filter');
    },

    passCachedItems: function (data) {
      this.removedValues = data;
    },

    passFilterType: function (int) {
      this.filterType = null;
      this.$filterChoiceContainer.addClass('show-filter-btns');
      this.$el.find('#filterChoices').children().eq(int).click();
    },

    removeAllFilters: function () {
      var self = this;
      // do this
    },

    render: function () {
      var self = this;
      this.$el.html(FooterViewTpl({
        isSafari: $('body').attr('browser') === 'safari'
      }));
      this.renderDropdown();

      this.moreFiltersDropup = new MoreFiltersDropup({
        el: '#moreFiltersDropUp'
      });

      this.listenTo(this.moreFiltersDropup, 'item:clicked', function (id) {
        self.removeAllFilters();
        //self.trigger('more-filters-toggle', id);
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
      this.$domainFilterBtn = this.$el.find('#domainFilterChoice');
      this.$seekingFilterBtn = this.$el.find('#seekingFilterChoice');
      this.$filterChoiceContainer = this.$el.find('.filter-choice-container');
      this.$filterBtns = this.$el.find('.footer-filter-btn');
      this.addHoverListeners();

    }
  });

  return FooterView;

});
