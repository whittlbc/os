define(['jquery',
  'backbone',
  'underscore',
  'models/os.util',
  'views/os.view',
  'views/home/project-feed-view',
  'models/project',
  'models/user',
  'stache!views/home/index-view',
  'selectize',
  'velocity',
  'backbone-eventbroker',
  'tabs'
], function ($,
   Backbone,
   _,
   OSUtil,
   OSView,
   ProjectFeedView,
   Project,
   User,
   IndexViewTpl) {
  'use strict';

  var master;

  var IndexView = OSView.extend({

    postInitialize: function () {
      master = this;

      Backbone.EventBroker.register({
        'addDomainFilter': 'addDomainFilter',
        'removeDomainFilter': 'removeDomainFilter',
        'addPrivacyFilter': 'addPrivacyFilter',
        'removePrivacyFilter': 'removePrivacyFilter',
        'lang-filters-scope:change': 'updateLangFiltersScope',
        'clearNonLangFilters': 'clearNonLangFilters',
        'projects:fetch-by-sort-type': 'fetchProjectsWithSpecifiedSort',
        'filters:remove-all': 'resetAllFilters',
        'up-for-grabs-filter:toggled': 'toggleUpForGrabsFilter'
      }, this);

      this.resetAllFilters();

      this.sortType = OSUtil.SORT_BY_VOTES;
      this.resetProps();
    },

    toggleUpForGrabsFilter: function () {
      this.upForGrabsFilter = !this.upForGrabsFilter;
      this.getFilters();
    },

    resetAllFilters: function (andFetch) {
      this.filters = null;
      this.langsFramesValue = [];
      this.domainFilters = [];
      this.seekingFilters = {
        0: [],
        1: []
      };
      this.privacyFilters = [];
      this.upForGrabsFilter = false;

      if (andFetch) {
        this.getFilters();
      }
    },

    fetchProjectsWithSpecifiedSort: function (type) {
      this.sortType = type;
      this.populateProjectFeed(this.projectTypeStatus, false);
    },

    resetProps: function () {
      this.gettingMoreData = false;
      this.langFiltersOr = false;
    },

    deleteLangFilter: function (name) {
      this.selectize.deleteFuckingSelection(name);
    },

    clearLangFilters: function (langNamesArray) {
      this.selectize.deleteFuckingSelection(langNamesArray);
    },

    clearNonLangFilters: function () {
      this.domainFilters = [];
      this.privacyFilters = [];
      this.seekingFilters = {
        0: [],
        1: []
      };
      this.getFilters();
    },

    events: {},

    handleSelectProjectTypeTab: function (e) {
      var self = this;
      var selectedIndex = OSUtil.PROJECT_TYPES.indexOf($(e.currentTarget).attr('href').replace('/#', ''));
      if (selectedIndex == -1 || selectedIndex == this.activeTabIndex) {
        e.preventDefault();
        return;
      } else {
        setTimeout(function () {
          self.activeTabIndex = selectedIndex;
          window.location = $(e.currentTarget).attr('href');
        }, 300);
      }
    },

    errorHandler: function (resp, status, xhr) {
      console.log('AJAX ERROR: ', xhr, resp);
    },

    handleNewLangFilter: function (data) {
      var self = this;
      this.langsFramesValue = data.dropdownValues;
      this.getFilters();
    },

    handleNewDomainFilter: function (data) {
      var self = this;
      this.domainFilters = data.dropdownValues;
      this.getFilters();
    },

    handleNewSeekingFilter: function (data) {
      this.seekingFilters[this.projectTypeStatus] = data.dropdownValues;

      // if Feedback is included in selected filters, make sure it's included in both seekingFilters hashes
      if (_.contains(data.dropdownValues, 'Feedback')) {
        this.addFeedbackFilterToOtherSeekingFilter(this.projectTypeStatus);
      }

      this.getFilters();
    },

    addFeedbackFilterToOtherSeekingFilter: function (status) {
      var otherStatus = (status === 0) ? 1 : 0;
      if (!_.contains(this.seekingFilters[otherStatus], 'Feedback')) {
        this.seekingFilters[otherStatus].push('Feedback');
      }
    },

    handleRemoveLangFilter: function (data) {
      var self = this;
      this.langsFramesValue = data.dropdownValues;
      this.getFilters();
    },

    handleRemoveDomainFilter: function (data) {
      var self = this;
      this.domainFilters = data.dropdownValues;
      this.getFilters();
    },

    handleRemoveSeekingFilter: function (data) {
      var currentSeekingFiltersHasFeedback = _.contains(this.seekingFilters[this.projectTypeStatus], 'Feedback');
      var newSeekingFiltersHasFeedback = _.contains(data.dropdownValues, 'Feedback');

      // If Feedback was removed, also remove it from the other seekingFilters hash
      if (currentSeekingFiltersHasFeedback && !newSeekingFiltersHasFeedback) {
        var otherStatus = this.projectTypeStatus === 0 ? 1 : 0;
        this.seekingFilters[otherStatus].splice('Feedback', 1);
      }

      this.seekingFilters[this.projectTypeStatus] = data.dropdownValues;

      this.getFilters();
    },

    updateLangFiltersScope: function (checked) {
      this.langFiltersOr = !checked;
      this.getFilters();
    },

    getFilters: function () {
      var atLeastOneFilter = false;
      this.limit = 30;
      this.gettingMoreData = false;
      var obj = {
        status: this.projectTypeStatus,
        lang_filters_or: this.langFiltersOr,
        filters: {}
      };

      if (!_.isEmpty(this.langsFramesValue)) {
        obj.filters.langs_and_frames = this.langsFramesValue;
        atLeastOneFilter = true;
      }

      if (this.privacyFilters.length === 1) {
        obj.filters.privacy = this.privacyFilters;
        atLeastOneFilter = true;
      }

      if (!_.isEmpty(this.domainFilters)) {
        obj.filters.domains = this.domainFilters;
        atLeastOneFilter = true;
      }

      if (!_.isEmpty(this.seekingFilters[this.projectTypeStatus])) {
        obj.filters.seeking = this.seekingFilters[this.projectTypeStatus];
        atLeastOneFilter = true;
      }

      if ((this.projectTypeStatus === OSUtil.PROJECT_TYPES.indexOf('ideas')) && this.upForGrabsFilter === true) {
        obj.filters.up_for_grabs = true;
        atLeastOneFilter = true;
      }

      this.filters = atLeastOneFilter ? obj : null;

      this.filters == null ? this.getFeed() : this.getFilteredFeed(obj);
    },

    getFeed: function () {
      var self = this;

      var data = {
        status: this.projectTypeStatus,
        sortType: this.sortType
      };

      if (this.currentUser) {
        data.user_uuid = this.currentUser.get('uuid');
      }

      var project = new Project();
      project.fetchFeedProjects(data, {
        success: function (data) {
          Backbone.EventBroker.trigger('header-footer:force-show');
          self.limit += 30;
          if (!data.gotAll) {
            self.gettingMoreData = false;
          }
          self.projectFeedView.handleFetchProjects(data.projects)
        }
      });
    },

    getFilteredFeed: function (obj) {
      var self = this;
      var project = new Project();

      if (this.currentUser) {
        obj.user_uuid = this.currentUser.get('uuid');
      }

      project.filteredFeed(obj, {
        success: function (data) {
          Backbone.EventBroker.trigger('header-footer:force-show');
          self.limit += 30;
          if (!data.gotAll) {
            self.gettingMoreData = false;
          }
          self.handleFilteredFeed(data.projects);
        }
      });
    },

    handleFilteredFeed: function (resp) {
      this.projectFeedView.populateFeed(resp)
    },

    pullFromIdeas: function () {
      var self = this;
      var project = new Project();
      project.pullFromIdeas();
    },

    addDomainFilter: function (type) {
      var self = this;
      if (!_.contains(this.domainFilters, type)) {
        this.domainFilters.push(type);
      }
      self.getFilters();
    },

    removeDomainFilter: function (type) {
      var self = this;
      if (_.contains(this.domainFilters, type)) {
        this.domainFilters.splice(this.domainFilters.indexOf(type), 1);
      }
      self.getFilters();
    },

    addPrivacyFilter: function (type) {
      this.privacyFilters = [type];
      this.getFilters();
    },

    removePrivacyFilter: function () {
      this.privacyFilters = [];
      this.getFilters();
    },

    changeActiveTab: function (status) {
      var shouldBeActiveTab = this.$el.find('li.project-type > a')[status];
      if (!$(shouldBeActiveTab).hasClass('active')) {
        $(shouldBeActiveTab).click();
      }
    },

    populateProjectFeed: function (status, initial) {
      this.limit = 30;
      this.gettingMoreData = false;
      Backbone.EventBroker.trigger('adjust-seeking-filters', this.seekingFilters[status]);

      if (!initial) {
        this.changeActiveTab(status);
      }

      this.projectTypeStatus = status;

      this.projectFeedView.setProjectTypeStatus(status);

      this.getFilters();
    },

    addScrollLoadListener: function () {
      $(window).bind('scroll', master.homeViewScrollListener);
    },

    homeViewScrollListener: function () {
      if (!master.gettingMoreData && master.$thirdToLastProj) {
        if ((master.$thirdToLastProj.offset().top - $(window).scrollTop()) < window.innerHeight) {
          master.gettingMoreData = true;
          master.getMoreProjects();
        }
      }
    },

    removeScrollListener: function () {
      $(window).unbind('scroll', master.homeViewScrollListener);
    },

    getMoreProjects: function () {
      var self = this;
      if (this.filters == null) {

        var data = {
          status: this.projectTypeStatus,
          limit: this.limit,
          sortType: this.sortType
        };

        if (this.currentUser) {
          data.user_uuid = this.currentUser.get('uuid');
        }

        var project = new Project();
        project.fetchFeedProjects(data, {
          success: function (data) {
            self.limit += 30;
            if (!data.gotAll) {
              self.gettingMoreData = false;
            }
            self.projectFeedView.handleFetchProjects(data.projects)
          }
        });
      } else {
        this.filters.status = this.projectTypeStatus;
        this.filters.limit = this.limit;
        this.filters.sortType = this.sortType;
        this.getFilteredFeed(this.filters);
      }
    },

    addListeners: function () {
      var self = this;
      this.$el.find('.project-type > a').mousedown(function (e) {
        self.handleSelectProjectTypeTab(e);
      });
    },

    passFilters: function (obj, index) {
      this.filters = obj;
      this.langsFramesValue = obj.filters.langs_and_frames || [];
      this.privacyFilters = obj.filters.privacy || [];
      this.domainFilters = obj.filters.domains || [];
      this.seekingFilters = {
        0: [],
        1: []
      };
      this.seekingFilters[index] = obj.filters.seeking;

      if (_.contains(obj.filters.seeking, 'Feedback')) {
        this.addFeedbackFilterToOtherSeekingFilter(index);
      }

      this.langFiltersOr = obj.lang_filters_or;
    },

    setProjectToWatchScrollingPos: function (numProjects) {
      this.$thirdToLastProj = (numProjects >= 30) ?
        this.$el.find('ul.project-feed-list').children().last().prev().prev() : null;
    },

    render: function (options) {
      var self = this;
      var ideasActive = false;

      if (!options || !options.hasOwnProperty('index') || options.index == 0) {
        ideasActive = true;
      }

      var launchedActive = options && options.hasOwnProperty('index') ? options.index == 1 : false;

      this.$el.html(IndexViewTpl({
        ideasActive: ideasActive,
        launchedActive: launchedActive
      }));

      this.projectFeedView = this.projectFeedView || new ProjectFeedView();

      this.projectFeedView.$el = this.$el.find('#project-feed');

      this.listenTo(this.projectFeedView, 'projects:populated', function (numProjects) {
        self.setProjectToWatchScrollingPos(numProjects);
      });

      this.projectFeedView.render();

      var projectTypeStatus = options && options.hasOwnProperty('index') ? options.index : 0;

      this.populateProjectFeed(projectTypeStatus, true);

      this.addScrollLoadListener();

      this.addListeners();

      this.$el.find('ul.tabs').tabs();

    }
  });

  return IndexView;

});