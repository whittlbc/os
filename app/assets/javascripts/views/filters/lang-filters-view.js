define(['jquery',
  'backbone',
  'underscore',
  'models/os.util',
  'models/all-langs',
  'views/filters/lang-filter-item-view',
  'views/widgets/more-dropdown/more-dropdown',
  'views/svgs/svg-view',
  'views/dropdowns/lang-filters-options-bubble',
  'stache!views/filters/lang-filters-view',
  'velocity',
  'backbone-eventbroker'
], function ($,
   Backbone,
   _,
   OSUtil,
   AllLangs,
   LangFilterItemView,
   MoreDropdown,
   SVG,
   LangFiltersOptionsBubble,
   LangFiltersViewTpl) {
  'use strict';

  var LangFiltersView = Backbone.View.extend({

    initialize: function (options) {
      options = options || {};
      this.getAllLanguages();
      this.LANG_FILTERS = [];
      this.requiredBottomSpacing = 160;

      Backbone.EventBroker.register({
        'hide-more-langs-dropdown': 'forceHideDropdown'
      }, this);
    },

    events: {
      'click #clearLangFiltersBtn': 'clearLangFilters'
    },

    getAllLanguages: function () {
      this.allLangs = AllLangs.getAll();
      this.colors_and_initials = this.allLangs.colors_and_initials;
    },

    handleDeleteLangFilter: function (view) {
      var self = this;
      this.$list.empty();
      var tempArray = [];
      for (var i = 0; i < this.LANG_FILTERS.length; i++) {
        if (this.LANG_FILTERS[i].realName != view.realName) {
          var langFilterItemView = this.LANG_FILTERS[i];
          langFilterItemView.render();
          this.addHoverListener(langFilterItemView);
          this.prepareItemForEntrance(langFilterItemView.el, langFilterItemView.realName, false);
          this.$list.append(langFilterItemView.el);
          tempArray.push(langFilterItemView);
        }
      }
      this.LANG_FILTERS = tempArray;
      Backbone.EventBroker.trigger('deleteLangFilter', view.realName);
    },

    clearLangFilters: function () {
      var self = this;
      this.$list.empty();
      var langNamesArray = [];
      for (var i = 0; i < this.LANG_FILTERS.length; i++) {
        langNamesArray.push(self.LANG_FILTERS[i].realName);
      }
      this.LANG_FILTERS = [];
      Backbone.EventBroker.trigger('clearLangFilters', langNamesArray);
    },

    addItem: function (data) {
      if (this.shownFiltersFull()) {
        this.toggleMoreFiltersContainer(true);
        this.$el.find('.more-count > span').html(this.moreDropdown.getNumItems() + 1);
        this.moreDropdown.addItem(data.value);
      } else {
        var langFilterItemView = new LangFilterItemView({
          tagName: 'li',
          name: data.value
        });
        langFilterItemView.render();
        this.addHoverListener(langFilterItemView);
        this.prepareItemForEntrance(langFilterItemView.el, data.value, data.animate);
        this.$list.append(langFilterItemView.el);
        this.LANG_FILTERS.push(langFilterItemView);
        if (data.animate) {
          this.slideItemIn(langFilterItemView.el);
        }
      }

      if (this.needToShowInfoIcon()) {
        this.$el.find('.lang-filters-options > .fa').css('display', 'block');
      }
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
        // delete the filter they clicked on
        self.handleDeleteLangFilter(view);

        // if the extras dropdown has some langs, move the top one up out of the dropdown
        if (self.moreDropdown.hasItems()) {
          var langToMoveUpFromDrodown = self.moreDropdown.getTopItem();
          self.addItem({
            value: langToMoveUpFromDrodown,
            animate: false
          });
          self.moreDropdown.stripItemAndRepopulate(langToMoveUpFromDrodown);
          self.decreaseMoreDropdownCount();
        }

        if (self.needToHideInfoIcon()) {
          self.$el.find('.lang-filters-options > .fa').hide();
        }
      });
    },

    needToShowInfoIcon: function () {
      return (this.LANG_FILTERS.length + this.moreDropdown.getNumItems()) > 1;
    },

    needToHideInfoIcon: function () {
      return (this.LANG_FILTERS.length + this.moreDropdown.getNumItems()) <= 1;
    },

    prepareItemForEntrance: function (el, value, animate) {
      var self = this;
      el.style.position = 'relative';
      el.firstChild.style.backgroundColor = self.colors_and_initials[value]['color'];
      el.style.left = animate ? '-100px' : '0px';
      $(el.firstChild).html(self.colors_and_initials[value]['initials']);
      var $p = $(el).children().eq(1);
      $p.html(value);
      if (value.length > 11) {
        $p.css('font-size', '11px');
      }
    },

    slideItemIn: function (el) {
      $(el).velocity({left: 0}, 700, [100, 14]);
    },

    prePopulateFilters: function (filtersMap) {
      var self = this;
      var filters = Object.keys(filtersMap[0]);

      _.each(filters, function (lang) {
        self.addItem({
          value: lang,
          animate: false
        });
      });
    },

    shownFiltersFull: function () {
      var $list = this.$el.find('.lang-filters-list');
      var currentBottomPos = $list.offset().top + $list.height();
      var verticalSpaceLeft = window.innerHeight - currentBottomPos;
      return verticalSpaceLeft < this.requiredBottomSpacing;
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

    render: function (options) {
      options = options || {};
      var self = this;

      this.$el.html(LangFiltersViewTpl());

      this.$list = this.$el.find('.lang-filters-list');

      this.moreDropdown = new MoreDropdown({
        el: self.$el.find('#moreLangFilters'),
        interactive: true
      });

      this.listenTo(this.moreDropdown, 'item:remove', function () {
        self.decreaseMoreDropdownCount();
      });

      this.listenTo(this.moreDropdown, 'list:empty', function () {
        self.toggleMoreFiltersContainer(false);
      });

      this.moreDropdown.render();

      this.vEllipsis = new SVG({
        el: this.$el.find('.ellipsis'),
        svg: 'v-ellipsis'
      });

      this.vEllipsis.render();

      this.optionsBubble = new LangFiltersOptionsBubble({
        el: this.$el.find('#langFiltersOptionsBubble')
      });

      this.optionsBubble.render({
        orSelected: options.orSelected
      });

      $(document).click(function () {
        self.forceHideDropdown();
      });
    }
  });

  return LangFiltersView;

});
