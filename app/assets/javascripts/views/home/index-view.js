define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
    'views/home/project-feed-view',
    'models/project',
    'models/user',
    //'views/home/lang-selection-list',
    'views/home/non-lang-filters-view',
    'stache!views/home/index-view',
    'selectize',
    'velocity',
    'backbone-eventbroker',
    'tabs'
], function ($,
     Backbone,
     _,
     OSUtil,
     ProjectFeedView,
     Project,
     User,
     //LangSelectionList,
     NonLangFiltersView,
     IndexViewTpl
     ) {
	'use strict';

    var master;

	var IndexView = Backbone.View.extend({

		initialize: function () {
            master = this;
            Backbone.EventBroker.register({
                //'deleteLangFilter': 'deleteLangFilter',
                //'clearLangFilters': 'clearLangFilters',
                'addLicenseFilter': 'addLicenseFilter',
                'removeLicenseFilter': 'removeLicenseFilter',
                'addPrivacyFilter': 'addPrivacyFilter',
                'removePrivacyFilter': 'removePrivacyFilter',
                //'addAnonFilter': 'addAnonFilter',
                //'removeAnonFilter': 'removeAnonFilter',
                'clearNonLangFilters': 'clearNonLangFilters',
                'projects:fetch-by-sort-type': 'fetchProjectsWithSpecifiedSort'
            }, this);
            this.filters = null;
            this.langsFramesValue = [];
            this.licenseFilters = [];
            this.chatFilters = [];
            this.privacyFilters = [];
            //this.anonFilters = [];
            this.sortType = OSUtil.SORT_BY_VOTES;

            this.resetProps();
        },

        fetchProjectsWithSpecifiedSort: function (type) {
            this.sortType = type;
            this.populateProjectFeed(this.projectTypeStatus, false);
        },

        resetProps: function () {
            this.zipUpDuration = 140;
            this.zipDownDuration = 250;
            this.ulSlideDownDuration = 500;
            this.ulSlideUpDuration = 550;
            this.langsFramesDropdownShown = false;
            this.gettingMoreData = false;
        },

        passCookieGHUsername: function (cookieGHUsername) {
            var self = this;
            this.cookieGHUsername = cookieGHUsername;
        },

        deleteLangFilter: function (name) {
            this.selectize.deleteFuckingSelection(name);
        },

        clearLangFilters: function (langNamesArray) {
            this.selectize.deleteFuckingSelection(langNamesArray);
        },

        clearNonLangFilters: function () {
            this.licenseFilters = [];
            this.privacyFilters = [];
            this.chatFilters = [];
            //this.anonFilters = [];
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
                this.activeTabIndex = selectedIndex;
                window.location = $(e.currentTarget).attr('href');
            }
        },

        clickedLaunchProject: function () {
            var self = this;
            var project = new Project();
            var obj = {
                project_uuid: 'jhgfdsedrfghjhgfdf',
                user_uuid: 'yrdyftughgrdtuyfgih'
            };
            project.launch(obj, {success: self.successfullyLaunchProject})
        },

        successfullyLaunchProject: function (resp) {
            console.log(resp);
        },

        errorHandler: function(resp, status, xhr) {
            console.log('AJAX ERROR: ', xhr, resp);
        },

        cacheFeedBeforeSearch: function () {
            var self = this;
            self.cachedFeed = self.projectFeedView.POST_VIEWS.map(function(project){
                return project;
            });
        },

        showCachedFeed: function () {
            var self = this;
            self.projectFeedView.populateFeed(self.cachedFeed);
        },

        passUniveralSearchResults: function (projects) {
            window.scrollTo(0,0);
            this.projectFeedView.populateFeed(projects);
        },

        passLanguages: function (data) {
            this.projectFeedView.passColorsAndInitials(data.colors_and_initials);
            this.colors_and_initials = data.colors_and_initials;
            this.dropdown_items = data.dropdown_items;
            //this.langSelectionList.setColorsAndInitials(data.colors_and_initials);
            this.all_frames = data.all_frames;
        },

        handleNewLangFilter: function (data) {
            var self = this;
            this.langsFramesValue = data.dropdownValues;
            this.getFilters();
        },

        handleNewLicenseFilter: function (data) {
            var self = this;
            this.licenseFilters = data.dropdownValues;
            this.getFilters();
        },

        handleNewChatFilter: function (data) {
            var self = this;
            this.chatFilters = data.dropdownValues;
            this.getFilters();
        },

        handleRemoveLangFilter: function (data) {
            var self = this;
            this.langsFramesValue = data.dropdownValues;
            this.getFilters();
        },

        handleRemoveLicenseFilter: function (data) {
            var self = this;
            this.licenseFilters = data.dropdownValues;
            this.getFilters();
        },

        handleRemoveChatFilter: function (data) {
            var self = this;
            this.chatFilters = data.dropdownValues;
            this.getFilters();
        },

        createLangsFilterDropdown: function (resp) {
            var self = this;
            var options = {
                theme: 'links',
                maxItems: null,
                valueField: 'id',
                searchField: 'title',
                options: this.dropdown_items,
                original: false,
                selectOnTab: false,
                onFocus: function () {
                    if (!self.langsFramesDropdownShown) {
                        self.zipDownDropdown();
                    }
                },
                onBlur: function() {
                    if (self.langsFramesDropdownShown) {
                        self.zipUpDropdown();
                    }
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

            var $select = this.$el.find('#filters-langs-frames').selectize(options);
            var selectize = $select[0].selectize;
            this.selectize = selectize;
            this.selectize.zipUp(0);
            this.setLangFrameInputProps();
            selectize.on('item_add', function (value, $item) {
                /* if you just entered the framework as a lang/frame filter, but haven't entered the language that framework
                goes with, then we'll go ahead and add that for you */
                if (!self.preventAddListener && self.all_frames[value] && !_.contains(self.langsFramesValue, self.all_frames[value])){
                    self.langsFramesValue = selectize.getValue();
                    selectize.lastQuery = null;
                    selectize.setTextboxValue('');
                    selectize.addItem(self.all_frames[value]);
                } else {
                    self.langsFramesValue = selectize.getValue();
                    self.getFilters();
                }

                if (!self.preventAddListener) {
                    self.langSelectionList.addItem(value, true);
                }

            });
            selectize.on('item_remove', function (value, $item) {
                self.langsFramesValue = selectize.getValue();
                self.getFilters();
            });
        },

        zipUpDropdown: function () {
            var self = this;
            this.selectize.zipUp(this.zipUpDuration);
            this.langSelectionList.$el.find('.lang-selection-list').velocity({ top: 130 }, this.ulSlideUpDuration, [230, 20]);
            this.langsFramesDropdownShown = false;
        },

        zipDownDropdown: function () {
            var self = this;
            var duration = this.zipDownDuration;
            this.selectize.zipDown(duration);
            this.langSelectionList.$el.find('.lang-selection-list').velocity({ top: 270 }, this.ulSlideDownDuration, [230, 20]);
            this.langsFramesDropdownShown = true;
        },

        getFilters: function () {
            var self = this;
            var atleastOneFilter = false;
            this.limit = 30;
            this.gettingMoreData = false;
            var obj = {
                status: self.projectTypeStatus,
                filters: {}
            };

            if (!_.isEmpty(self.langsFramesValue)) {
                obj.filters.langs_and_frames = self.langsFramesValue;
                atleastOneFilter = true;
            }
            if (!_.isEmpty(self.privacyFilters) && self.privacyFilters.length < 2) {
                obj.filters.privacy = self.privacyFilters;
                atleastOneFilter = true;
            }
            //if (!_.isEmpty(self.anonFilters) && self.anonFilters.length < 2) {
            //    obj.filters.anon = self.anonFilters;
            //    atleastOneFilter = true;
            //}
            if (!_.isEmpty(self.licenseFilters) && self.licenseFilters.length < 3) {
                obj.filters.license = self.licenseFilters;
                atleastOneFilter = true;
            }

            if (!_.isEmpty(self.chatFilters) && self.chatFilters.length < 3) {
                obj.filters.chat = self.chatFilters;
                atleastOneFilter = true;
            }

            self.filters = obj;

            self.getFilteredFeed(obj);

            if (!atleastOneFilter) {
                self.filters = null;
            }
        },

        setLangFrameInputProps: function () {
            this.$el.find('.selectize-dropdown-content').height(120);
        },

        getFilteredFeed: function (obj) {
            var self = this;
            if (this.userData) {
                obj.gh_username = this.userData.gh_username;
            }
            if (!this.userData && this.cookieGHUsername) {
                obj.gh_username = this.cookieGHUsername;
            }
            var project = new Project();
            project.filteredFeed(obj, {success: function (data) {
                self.limit += 30;
                if (!data.gotAll) {
                    self.gettingMoreData = false;
                }
                self.handleFilteredFeed(data.projects);
            }});
        },

        handleFilteredFeed: function (resp) {
            this.projectFeedView.populateFeed(resp)
        },

        pullFromIdeas: function () {
            var self = this;
            var project = new Project();
            project.pullFromIdeas({success: function (data) {
                self.handlePullFromIdeas(data);
            }});
        },

        handlePullFromIdeas: function (resp) {
            console.log(resp);
        },

        passUserInfo: function (data) {
            this.userData = data;
            this.user_uuid = data.user_uuid;
            this.userID = data.id;
            this.ghAccessToken = data.password;
            this.gh_username = data.gh_username;
        },

        addLicenseFilter: function (type) {
            var self = this;
            if (!_.contains(this.licenseFilters, type)) {
                this.licenseFilters.push(type);
            }
            self.getFilters();
        },

        removeLicenseFilter: function (type) {
            var self = this;
            if (_.contains(this.licenseFilters, type)) {
                this.licenseFilters.splice(this.licenseFilters.indexOf(type), 1);
            }
            self.getFilters();
        },

        addPrivacyFilter: function (type) {
            var self = this;
            if (!_.contains(this.privacyFilters, type)) {
                this.privacyFilters.push(type);
            }
            self.getFilters();
        },

        removePrivacyFilter: function (type) {
            var self = this;
            if (_.contains(this.privacyFilters, type)) {
                this.privacyFilters.splice(this.privacyFilters.indexOf(type), 1);
            }
            self.getFilters();
        },

        //addAnonFilter: function (val) {
        //    var self = this;
        //    if (val === 'anonYes') {
        //        val = true;
        //    }
        //    if (val === 'anonNo') {
        //        val = false;
        //    }
        //    if (!_.contains(this.anonFilters, val)) {
        //        this.anonFilters.push(val);
        //    }
        //    self.getFilters();
        //},

        //removeAnonFilter: function (val) {
        //    var self = this;
        //    if (val === 'anonYes') {
        //        val = true;
        //    }
        //    if (val === 'anonNo') {
        //        val = false;
        //    }
        //    if (_.contains(this.anonFilters, val)) {
        //        this.anonFilters.splice(this.anonFilters.indexOf(val), 1);
        //    }
        //    self.getFilters();
        //},

        //toggleAnonFilters: function (status) {
        //    if (status == 0) {
        //        this.nonLangFiltersView.showAnon();
        //    } else {
        //        this.nonLangFiltersView.hideAnon();
        //        if (this.filters && this.filters.filters && this.filters.filters.hasOwnProperty('anon')) {
        //            delete this.filters.filters.anon;
        //        }
        //        this.anonFilters = [];
        //    }
        //},

        changeActiveTab: function (status) {
            var self = this;
            var shouldBeActiveTab = this.$el.find('li.project-type > a')[status];
            if (!$(shouldBeActiveTab).hasClass('active')) {
                $(shouldBeActiveTab).click();
            }
        },

        populateProjectFeed: function (status, initial) {
            var self = this;
            this.limit = 30;
            this.gettingMoreData = false;
            //this.toggleAnonFilters(status);
            if (!initial) {
                this.changeActiveTab(status);
            }
            this.projectTypeStatus = status; // int value
            this.projectFeedView.setProjectTypeStatus(status);
            if (this.filters == null) {
                var data = {
                    status: status,
                    sortType: this.sortType
                };
                if (this.userData) {
                    data.gh_username = this.userData.gh_username;
                }
                if (!this.userData && this.cookieGHUsername) {
                    data.gh_username = this.cookieGHUsername;
                }
                var project = new Project();
                project.fetchFeedProjects(data, {success: function (data) {
                    self.limit += 30;
                    if (!data.gotAll) {
                        self.gettingMoreData = false;
                    }
                    self.projectFeedView.handleFetchProjects(data.projects)
                }});
            } else {
                this.filters.status = status;
                this.filters.sortType = this.sortType;
                this.getFilteredFeed(this.filters);
            }
        },

        addScrollLoadListener: function () {
            $(window).bind('scroll', master.homeViewScrollListener);
        },

        homeViewScrollListener: function () {
            if (!master.gettingMoreData) {
                var pos = $(window).scrollTop();
                if (pos > (0.85 * $('#project-feed').height())) {
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
                if (this.userData) {
                    data.gh_username = this.userData.gh_username;
                }
                if (!this.userData && this.cookieGHUsername) {
                    data.gh_username = this.cookieGHUsername;
                }
                var project = new Project();
                project.fetchFeedProjects(data, {success: function (data) {
                    self.limit += 30;
                    if (!data.gotAll) {
                        self.gettingMoreData = false;
                    }
                    self.projectFeedView.handleFetchProjects(data.projects)
                }});
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

        prePopulateLangFilters: function () {
            var self = this;
            this.langSelectionList.$el.find('.lang-selection-list').css('top', '130px');
            var prepopFilters = this.filters.filters.langs_and_frames.reverse();
            this.preventAddListener = true;
            for (var i = 0; i < prepopFilters.length; i++) {
                this.selectize.addItem(prepopFilters[i]);
                this.langSelectionList.addItem(prepopFilters[i], false);
            }
            this.preventAddListener = false;
            this.langsFramesValue = this.selectize.getValue();
        },

		render: function (options) {
			var self = this;
            var onTheFenceActive = false;

            if (!options || !options.hasOwnProperty('index') || options.index == 1) {
                onTheFenceActive = true;
            }

            var upForGrabsActive = options && options.hasOwnProperty('index') ? options.index == 0 : false;
            var launchedActive = options && options.hasOwnProperty('index') ? options.index == 2 : false;

            this.$el.html(IndexViewTpl({
                upForGrabsActive: upForGrabsActive,
                onTheFenceActive: onTheFenceActive,
                launchedActive: launchedActive
            }));

            this.projectFeedView = new ProjectFeedView({
                el: '#project-feed'
            });

            if (this.colors_and_initials) {
                this.projectFeedView.passColorsAndInitials(this.colors_and_initials);
            }

            this.projectFeedView.render();

            var projectTypeStatus = options && options.hasOwnProperty('index') ? options.index : 1;

            this.nonLangFiltersView = new NonLangFiltersView({
                el: '#nonLangFiltersContainer',
                filters: self.filters
            });

            this.nonLangFiltersView.render();

            this.populateProjectFeed(projectTypeStatus, true);
            //
            //this.langSelectionList = new LangSelectionList({
            //    el: '#langSelectionListContainer',
            //});

            //if (this.colors_and_initials) {
            //    this.langSelectionList.setColorsAndInitials(this.colors_and_initials);
            //}
            //
            //this.langSelectionList.render();

            if (this.filters && this.filters.filters && this.filters.filters.langs_and_frames) {
                //this.selectize.fuckingReset();
                //this.prePopulateLangFilters();
            }

            this.addScrollLoadListener();

            this.addListeners();

            this.$el.find('ul.tabs').tabs();

        }
	});

	return IndexView;

});