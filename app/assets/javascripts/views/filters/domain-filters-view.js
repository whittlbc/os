define(['jquery',
  'backbone',
  'underscore',
  'models/os.util',
  'views/os.view',
  'views/filters/domain-filter-item-view',
  'views/widgets/more-dropdown/more-dropdown',
  'stache!views/filters/domain-filters-view',
  'velocity',
  'backbone-eventbroker'
], function ($,
             Backbone,
             _,
             OSUtil,
             OSView,
             DomainFilterItemView,
             MoreDropdown,
             DomainFiltersViewTpl) {
  'use strict';

  var DomainFiltersView = OSView.extend({

    postInitialize: function (options) {
      options = options || {};
      this.DOMAIN_FILTERS = [];
      this.fullSize = 32;
    },

    events: {
      'click #clearDomainFiltersBtn': 'clearDomainFilters'
    },

    removeAllFilters: function () {
      this.DOMAIN_FILTERS = [];
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

    handleDeleteDomainFilter: function (view) {
      var self = this;
      this.$list.empty();
      var tempArray = [];
      for (var i = 0; i < this.DOMAIN_FILTERS.length; i++) {
        if (this.DOMAIN_FILTERS[i].name != view.name) {
          var domainFilterItemView = this.DOMAIN_FILTERS[i];
          domainFilterItemView.render();
          this.addHoverListener(domainFilterItemView);
          this.forceAddItem(domainFilterItemView);
          tempArray.push(domainFilterItemView);
        }
      }
      this.DOMAIN_FILTERS = tempArray;
      Backbone.EventBroker.trigger('deleteDomainFilter', view.name);
    },

    forceAddItem: function (domainFilterItemView) {
      var self = this;
      var $ball = domainFilterItemView.$el.find('.domain-filter-item');
      var $name = domainFilterItemView.$el.find('.name');
      $ball.css({
        width: this.fullSize,
        height: this.fullSize,
        top: 0,
        left: 0
      });
      $name.css({opacity: 1});
      $name.html(domainFilterItemView.name);
      this.$list.append(domainFilterItemView.el);
    },

    clearDomainFilters: function () {
      var self = this;
      this.$list.empty();
      var domainNamesArray = [];
      for (var i = 0; i < this.DOMAIN_FILTERS.length; i++) {
        domainNamesArray.push(self.DOMAIN_FILTERS[i].name);
      }
      this.DOMAIN_FILTERS = [];
      Backbone.EventBroker.trigger('clearDomainFilters', domainNamesArray);
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
        var domainFilterItemView = new DomainFilterItemView({
          tagName: 'li',
          name: data.value
        });

        domainFilterItemView.render();
        this.addHoverListener(domainFilterItemView);

        if (data.animate) {
          var $ball = domainFilterItemView.$el.find('.domain-filter-item');
          var $name = domainFilterItemView.$el.find('.name');
          this.prepareItemForEntrance($ball, $name, data.value);
          this.$list.append(domainFilterItemView.el);
          this.animateItemIn($ball, $name);
        } else {
          this.forceAddItem(domainFilterItemView);
        }

        this.DOMAIN_FILTERS.push(domainFilterItemView);
      }
    },

    shownFiltersFull: function () {
      var expectedHeightAfterAddingAnotherItem = this.$el.find('.domain-filters-list').height() + 43;
      return expectedHeightAfterAddingAnotherItem > this.getMaxHeightOfList();
    },

    getMaxHeightOfList: function () {
      var collectiveBottomMarginForMinorFilterViews = 20 + 20;
      var marginTopForTopMinorFilter = 16;
      var heightOfDropdown = 114; // not exactly the same I know

      var heightOfMinorFilters = window.innerHeight
        - $('#project-feed').offset().top
        - marginTopForTopMinorFilter
        - collectiveBottomMarginForMinorFilterViews
        - heightOfDropdown;

      if (!this.currentUser) {
        heightOfMinorFilters -= 92;
      }

      return 0.6 * heightOfMinorFilters;
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
        self.handleDeleteDomainFilter(view);
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
      this.$el.html(DomainFiltersViewTpl());
      this.$list = this.$el.find('.domain-filters-list');

      this.moreDropdown = new MoreDropdown({
        el: self.$el.find('#moreDomainFilters'),
        interactive: true,
        deleteEvent: 'deleteDomainFilter'
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

  return DomainFiltersView;

});
