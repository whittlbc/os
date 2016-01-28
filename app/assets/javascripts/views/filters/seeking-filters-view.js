define(['jquery',
  'backbone',
  'underscore',
  'models/os.util',
  'views/os.view',
  'views/filters/seeking-filter-item-view',
  'views/widgets/more-dropdown/more-dropdown',
  'stache!views/filters/seeking-filters-view',
  'velocity',
  'backbone-eventbroker'
], function ($,
             Backbone,
             _,
             OSUtil,
             OSView,
             SeekingFilterItemView,
             MoreDropdown,
             SeekingFiltersViewTpl) {
  'use strict';

  var SeekingFiltersView = OSView.extend({

    postInitialize: function (options) {
      options = options || {};
      this.SEEKING_FILTERS = [];
      this.fullSize = 32;
      Backbone.EventBroker.register({
        'seeking-filters:reset': 'resetSeekingFilters'
      }, this);
    },

    events: {
      'click #clearSeekingFiltersBtn': 'clearSeekingFilters'
    },

    resetSeekingFilters: function () {
      this.SEEKING_FILTERS = [];
    },

    removeAllFilters: function () {
      this.SEEKING_FILTERS = [];
      this.$list.empty();
      this.moreDropdown.reset();
      this.toggleMoreFiltersContainer(false);
    },

    isEmpty: function () {
      return this.$list.children().length === 0;
    },

    toggleIconVisibility: function (opacity, duration) {
      this.$el.find('.minor-filters-type-icon').animate({opacity: opacity}, duration);
    },

    handleDeleteSeekingFilter: function (view, preventTrigger) {
      this.$list.empty();
      var tempArray = [];

      for (var i = 0; i < this.SEEKING_FILTERS.length; i++) {
        if (this.SEEKING_FILTERS[i].name != view.name) {
          var seekingFilterItemView = this.SEEKING_FILTERS[i];
          seekingFilterItemView.render();
          this.addHoverListener(seekingFilterItemView);
          this.forceAddItem(seekingFilterItemView);
          tempArray.push(seekingFilterItemView);
        }
      }

      this.SEEKING_FILTERS = tempArray;

      if (!preventTrigger) {
        Backbone.EventBroker.trigger('deleteSeekingFilter', view.name);
      }
    },

    forceAddItem: function (seekingFilterItemView) {
      var self = this;
      var $ball = seekingFilterItemView.$el.find('.seeking-filter-item');
      var $name = seekingFilterItemView.$el.find('.name');
      $ball.css({
        width: this.fullSize,
        height: this.fullSize,
        top: 0,
        left: 0
      });
      $name.css({opacity: 1});
      $name.html(seekingFilterItemView.name);
      this.$list.append(seekingFilterItemView.el);
    },

    clearSeekingFilters: function () {
      var self = this;
      this.$list.empty();
      var seekingNamesArray = [];
      for (var i = 0; i < this.SEEKING_FILTERS.length; i++) {
        seekingNamesArray.push(self.SEEKING_FILTERS[i].name);
      }
      this.SEEKING_FILTERS = [];
      Backbone.EventBroker.trigger('clearSeekingFilters', seekingNamesArray);
    },

    setColorsAndInitials: function (colors_and_initials) {
      this.colors_and_initials = colors_and_initials;
    },

    addItem: function (data) {
      if (this.shownFiltersFull()) {
        this.toggleMoreFiltersContainer(true);
        this.$el.find('.more-count > span').html(this.moreDropdown.getNumItems() + 1);
        this.moreDropdown.addItem(data.value);
      } else {
        var seekingFilterItemView = new SeekingFilterItemView({
          tagName: 'li',
          name: data.value
        });
        seekingFilterItemView.render();
        this.addHoverListener(seekingFilterItemView);

        if (data.animate) {
          var $ball = seekingFilterItemView.$el.find('.seeking-filter-item');
          var $name = seekingFilterItemView.$el.find('.name');
          this.prepareItemForEntrance($ball, $name, data.value);
          this.$list.append(seekingFilterItemView.el);
          this.animateItemIn($ball, $name);
        } else {
          this.forceAddItem(seekingFilterItemView);
        }

        this.SEEKING_FILTERS.push(seekingFilterItemView);
      }
    },

    shownFiltersFull: function () {
      var expectedHeightAfterAddingAnotherItem = this.$el.find('.seeking-filters-list').height() + 43;
      return expectedHeightAfterAddingAnotherItem > this.getMaxHeightOfList();
    },

    getMaxHeightOfList: function () {
      var projectFeedTopOffset = 134;
      var collectiveBottomMarginForMinorFilterViews = 20 + 20;
      var marginTopForTopMinorFilter = 16;
      var heightOfDropdown = 109;

      var heightOfMinorFilters = window.innerHeight
        - projectFeedTopOffset
        - marginTopForTopMinorFilter
        - collectiveBottomMarginForMinorFilterViews
        - heightOfDropdown;

      if (!this.currentUser) {
        heightOfMinorFilters -= 85;
      }

      return 0.4 * heightOfMinorFilters;
    },

    addHoverListener: function (view) {
      var self = this;
      view.$el.hover(function () {
          view.$el.addClass('expand');
        }, function () {
          view.$el.removeClass('expand');
        }
      );
      view.$el.find('.filter-close-btn').click(function () {
        self.handleDeleteSeekingFilter(view);
        self.moveItemUpFromDropdownIfNeeded();
      });
    },

    moveItemUpFromDropdownIfNeeded: function () {
      // if the extras dropdown has some items, move the top one out
      if (this.moreDropdown.hasItems()) {
        var itemToMoveUpFromDrodown = this.moreDropdown.getTopItem();
        this.addItem({
          value: itemToMoveUpFromDrodown,
          animate: false
        });
        this.moreDropdown.stripItemAndRepopulate(itemToMoveUpFromDrodown);
        this.decreaseMoreDropdownCount();
      }
    },

    prepareItemForEntrance: function ($ball, $name, value) {
      $name.html(value);
    },

    animateItemIn: function ($ball, $name) {
      $ball.velocity({width: this.fullSize, height: this.fullSize, top: 0, left: 0}, 690, [100, 15]);
      $name.animate({opacity: 1}, {duration: 300, queue: false});
    },

    namesForFilters: function () {
      var names = _.map(this.SEEKING_FILTERS, function (view) {
        return view.name
      });

      return names;
    },

    forceDeleteItem: function (name) {
      for (var i = 0; i < this.SEEKING_FILTERS.length; i++) {
        var view = this.SEEKING_FILTERS[i];
        if (view.name === name) {
          this.handleDeleteSeekingFilter(view, true);
          break;
        }
      }
    },

    forceHideDropdown: function () {
      this.moreDropdown.hideDropdown();
    },

    toggleMoreFiltersContainer: function (show) {
      var $btn = this.$el.find('.more-dropdown-container');
      show ? $btn.show() : $btn.hide();
    },

    decreaseMoreDropdownCount: function () {
      var $countEl = this.$el.find('.more-count > span');
      $countEl.html(Number($countEl.html()) - 1);
    },

    render: function () {
      var self = this;
      this.$el.html(SeekingFiltersViewTpl());
      this.$list = this.$el.find('.seeking-filters-list');

      this.moreDropdown = new MoreDropdown({
        el: self.$el.find('#moreSeekingFilters'),
        interactive: true,
        deleteEvent: 'deleteSeekingFilter'
      });

      this.listenTo(this.moreDropdown, 'item:remove', function () {
        self.decreaseMoreDropdownCount();
      });

      this.listenTo(this.moreDropdown, 'list:empty', function () {
        self.toggleMoreFiltersContainer(false);
      });

      this.moreDropdown.render();

      $(document).click(function () {
        self.forceHideDropdown();
      });
    }
  });

  return SeekingFiltersView;

});
