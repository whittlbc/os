define(['jquery',
  'backbone',
  'underscore',
  'models/project',
  'views/search/search-result-view',
  'views/widgets/spinner-chasing-dots',
  'stache!views/search/search-container-view'
], function ($,
   Backbone,
   _,
   Project,
   SearchResultView,
   Spinner,
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
    },

    events: {},

    populate: function (projects) {
      var self = this;
      this.RESULTS = [];
      this.spinner.$el.hide();
      this.$dropdown.empty();
      if (projects.length > 0) {
        for (var i = 0; i < projects.length; i++) {
          this.addResult(projects[i]);
        }
      } else {
        this.$noResults.show();
      }
    },

    addResult: function (data) {
      var self = this;

      var searchResultView = new SearchResultView({
        tagName: 'li',
        data: data
      });

      searchResultView.$el.click(function (e) {
        e.stopPropagation();
        if (window.location.hash == ('#projects/' + data.uuid)) {
          window.location.reload();
        } else {
          window.location.hash = '#projects/' + data.uuid;
          setTimeout(function () {
            self.forceCloseSearchBar();
          }, 50)
        }
      });

      searchResultView.render();

      this.$dropdown.append(searchResultView.el);
      this.RESULTS.push(searchResultView);
    },

    forceCloseSearchBar: function () {
      var self = this;
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

      this.$input.keydown(function (e) {
        if (e.keyCode != 13 && e.keyCode != 9) {
          self.limit = 10;
          self.gettingMoreData = true;
          if (!self.dropdownShown) {
            self.dropdownShown = true;
            self.$dropdown.show();
          }
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
            self.$noResults.show();
          }
        }
      });
    },

    expandSearch: function () {
      var self = this;
      var searchContainerLeftPos = this.$searchContainer.offset().left;
      var searchContainerWidth = this.$searchContainer.width();
      var rightPosOfLogoContainer = $('.header-logo-container').offset().left + $('.header-logo-container').outerWidth(true);
      var diff = searchContainerLeftPos - rightPosOfLogoContainer;
      var endWidth = searchContainerWidth + diff - 38;
      if (endWidth > 0) {
        this.$searchContainer.width(endWidth);
      }
    },

    contractSearch: function () {
      var self = this;
      this.$searchContainer.width(250);
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
      this.$el.html(SearchContainerViewTpl());
      this.$searchContainer = $('.header-searchbar-container');
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
