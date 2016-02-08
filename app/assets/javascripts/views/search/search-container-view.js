define(['jquery',
  'backbone',
  'underscore',
  'models/project',
  'views/search/search-result-view',
  'views/widgets/spinner-chasing-dots',
  'models/session',
  'models/os.util',
  'stache!views/search/search-container-view'
], function ($,
   Backbone,
   _,
   Project,
   SearchResultView,
   Spinner,
   Session,
   OSUtil,
   SearchContainerViewTpl) {
  'use strict';

  var master;

  var SearchContainerView = Backbone.View.extend({

    initialize: function () {
      master = this;
      this.isOpen = false;
      this.searchTimeout = null;
      this.dropdownShown = false;
      this.gettingMoreData = false;
      this.spinnerTimeout = null;
      this.GET_MORE_DATA_SCROLL_FRACTION = 0.71;

      this.$noResultsView = $('<div>', {class: 'no-search-results'});
      this.$noResultsView.html('No Results');
    },

    events: {},

    populate: function (projects) {
      var self = this;
      this.RESULTS = [];
      this.spinner.$el.hide();
      this.$dropdown.empty();

      if (!this.dropdownShown) {
        this.$dropdown.show();
        this.dropdownShown = true;
      }

      if (projects.length > 0) {
        for (var i = 0; i < projects.length; i++) {
          this.addResult(projects[i]);
        }
        this.$el.find('.search-results-list > li:first-child').addClass('active');
      } else {
        this.$dropdown.append(this.$noResultsView);
      }
    },

    addResult: function (data) {
      var self = this;

      var searchResultView = new SearchResultView({
        tagName: 'li',
        data: data
      });

      searchResultView.$el.click(function (e) {
        var openInNewTab = false;
        e.stopPropagation();

        if ((Session.isMac() && e.metaKey) || (!Session.isMac() && e.ctrlKey)) {
          openInNewTab = true;
        }

        OSUtil.navToProject(data.uuid, openInNewTab);

        if (!openInNewTab){
          setTimeout(function () {
            self.forceCloseSearchBar();
          }, 50)
        }

        document.body.style.overflow = 'auto';
      });

      searchResultView.render();

      this.$dropdown.append(searchResultView.el);
      this.RESULTS.push(searchResultView);
    },

    forceCloseSearchBar: function () {
      if (this.isOpen) {
        this.contractSearch();
        this.isOpen = false;
      }
      this.$input.blur();
      this.$dropdown.hide();
      this.$noResults.hide();
      this.dropdownShown = false;
    },

    renderSearchBar: function () {
      var self = this;
      var project = new Project();

      this.$input.click(function (e) {
        e.stopPropagation();
        Backbone.EventBroker.trigger('hide-header-dropdowns');
      });

      this.$input.focus(function () {
        if (!self.isOpen) {
          Backbone.EventBroker.trigger('hide-header-dropdowns');
          self.expandSearch();
          self.isOpen = true;
        }
      });

      $(document).click(function () {
        self.forceCloseSearchBar();
      });

      this.$dropdown.on('mouseenter', 'li', function() {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
      });

      this.$input.keydown(function (e) {
        // UP ARROW
        if (e.which == 38) {
          self.navUpToFocus();
        }
        // DOWN ARROW
        else if (e.which == 40) {
          self.navDownToFocus();
        }
        else if (e.which == 13) {
          var $activeResult = self.$dropdown.find('li.active');
          if ($activeResult) {
            $activeResult.click();
          }
        }
        else if (e.which != 13 && e.which != 9) {
          self.limit = 10;
          self.gettingMoreData = true;

          if (self.searchTimeout != null) {
            clearTimeout(self.searchTimeout);
          }

          self.searchTimeout = setTimeout(function () {
            var query = self.$input.val();
            self.query = query;
            if (_.isEmpty(query)) {
              self.$dropdown.empty();
              self.RESULTS = [];
              self.$noResults.show();
            } else {
              self.$noResults.hide();
              self.showSpinner();
              project.search({query: query, limit: self.limit}, {
                success: function (data) {
                  self.handleProjectsFetched(data);
                }
              });
            }
          }, 175);
        }
      });

      this.$input.keyup(function (e) {
        if (e.keyCode != 13 && e.keyCode != 9) {
          if (_.isEmpty(self.$input.val())) {
            self.dropdownShown = false;
            self.$dropdown.hide();
          }
        }
      });
    },

    navUpToFocus: function () {
      var $currentFocusedItem = this.getCurrentFocusedItem();

      if ($currentFocusedItem && $currentFocusedItem.prev()) {
        this.focusOnItem($currentFocusedItem.prev(), false);
      }
    },

    navDownToFocus: function () {
      var $currentFocusedItem = this.getCurrentFocusedItem();

      if ($currentFocusedItem &&
        $currentFocusedItem.next() &&
        $currentFocusedItem.index() < (this.$dropdown.children().length - 1)) {

        this.focusOnItem($currentFocusedItem.next(), true);
      }
    },

    focusOnItem: function ($item, down) {
      $item.addClass('active');
      $item.siblings().removeClass('active');
      var topOfItem = $item.index() * $item.outerHeight();
      var bottomOfItem = topOfItem + $item.outerHeight();
      var topScrollPos = this.$dropdown.scrollTop();
      var bottomScrollPos = topScrollPos + 220;
      var newPos;

      if (down && bottomOfItem > bottomScrollPos) {
        newPos = topOfItem;
      }
      else if (!down && topOfItem < topScrollPos) {
        newPos = bottomOfItem - 220;
      }

      if (newPos || newPos === 0) {
        this.$dropdown.scrollTop(newPos);
      }
    },

    getCurrentFocusedItem: function () {
      return this.$el.find('.search-results-list > li.active');
    },

    expandSearch: function () {
      this.$el.find('.searchbox').addClass('expand');
    },

    contractSearch: function () {
      this.$el.find('.searchbox').removeClass('expand');
    },

    showSpinner: function () {
      var self = this;
      this.spinnerTimeout = setTimeout(function () {
        self.spinnerTimeout = null;
        self.$dropdown.empty();
        self.spinner.$el.show();
      }, 200);
    },

    handleProjectsFetched: function (data) {
      var self = this;
      if (this.spinnerTimeout != null) {
        clearTimeout(this.spinnerTimeout);
      }
      this.limit += 10;
      if (!data.gotAll) {
        this.gettingMoreData = false;
      }
      this.populate(data.projects);
    },

    getMoreResults: function () {
      var self = this;
      var project = new Project();
      project.search({query: self.query, limit: self.limit}, {
        success: function (data) {
          self.handleProjectsFetched(data);
        }
      })
    },

    addScrollLoadListener: function () {
      this.$el.find('.search-results-list').bind('scroll', master.searchResultsScrollListener);
    },

    searchResultsScrollListener: function () {
      if (!master.gettingMoreData) {
        var pos = master.$el.find('.search-results-list').scrollTop();
        var numItems = master.$el.find('.search-results-list > li').length;
        var itemHeight = master.$el.find('.search-results-list > li').height();
        if (pos > (master.GET_MORE_DATA_SCROLL_FRACTION * numItems * itemHeight)) {
          master.gettingMoreData = true;
          master.getMoreResults();
        }
      }
    },

    removeScrollListener: function () {
      this.$el.find('.search-results-list').unbind('scroll', master.searchResultsScrollListener);
    },

    render: function () {
      var self = this;
      this.$el.html(SearchContainerViewTpl({
        isSafari: $('body').attr('browser') === 'safari'
      }));
      this.$input = this.$el.find('.searchbox > input');
      this.$dropdown = this.$el.find('.search-results-list');
      this.$noResults = this.$el.find('.no-search-results');

      this.spinner = new Spinner({
        el: '#searchSpinner',
        width: '60px',
        height: '60px'
      });

      this.spinner.render();

      this.renderSearchBar();
      this.addScrollLoadListener();
    }
  });

  return SearchContainerView;

});
