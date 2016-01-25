define(['jquery',
  'backbone',
  'underscore',
  'models/os.util',
  'views/filters/seeking-filter-item-view',
  'stache!views/filters/seeking-filters-view',
  'velocity',
  'backbone-eventbroker'
], function ($,
             Backbone,
             _,
             OSUtil,
             SeekingFilterItemView,
             SeekingFiltersViewTpl) {
  'use strict';

  var SeekingFiltersView = Backbone.View.extend({

    initialize: function (options) {
      options = options || {};
      this.SEEKING_FILTERS = [];
    },

    events: {
      'click #clearSeekingFiltersBtn': 'clearSeekingFilters'
    },

    isEmpty: function () {
      return this.$list.children().length === 0;
    },

    toggleIconVisibility: function (opacity, duration) {
      this.$el.find('.minor-filters-type-icon').animate({opacity: opacity}, duration);
    },

    handleDeleteSeekingFilter: function (view) {
      var self = this;
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
      Backbone.EventBroker.trigger('deleteSeekingFilter', view.name);
    },

    forceAddItem: function (seekingFilterItemView) {
      var self = this;
      var $ball = seekingFilterItemView.$el.find('.seeking-filter-item');
      var $name = seekingFilterItemView.$el.find('.name');
      $ball.css({
        width: 25,
        height: 25,
        top: 0,
        left: 0,
        backgroundColor: 'black'
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
      });
    },

    prepareItemForEntrance: function ($ball, $name, value) {
      var self = this;
      $ball.css({backgroundColor: 'black' });
      $name.html(value);
    },

    animateItemIn: function ($ball, $name) {
      $ball.velocity({width: 25, height: 25, top: 0, left: 0}, 690, [100, 15]);
      $name.animate({opacity: 1}, {duration: 300, queue: false});
    },

    render: function () {
      var self = this;
      this.$el.html(SeekingFiltersViewTpl());
      this.$list = this.$el.find('.seeking-filters-list');
    }
  });

  return SeekingFiltersView;

});
