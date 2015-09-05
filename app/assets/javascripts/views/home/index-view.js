define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
    'views/home/project-feed-view',
    'models/project',
    'models/user',
    'views/home/lang-selection-list',
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
     LangSelectionList,
     NonLangFiltersView,
     IndexViewTpl
     ) {
	'use strict';

	var IndexView = Backbone.View.extend({

		initialize: function () {
            Backbone.EventBroker.register({
                'showFilters': 'showLangFrameSelection',
                'deleteLangFilter': 'deleteLangFilter',
                'clearLangFilters': 'clearLangFilters',
                'addLicenseFilter': 'addLicenseFilter',
                'removeLicenseFilter': 'removeLicenseFilter',
                'addPrivacyFilter': 'addPrivacyFilter',
                'removePrivacyFilter': 'removePrivacyFilter',
                'clearNonLangFilters': 'clearNonLangFilters'
            }, this);
            this.filters = null;
            this.filtersShown = false;
            this.langsFramesValue = [];
            this.licenseFilters = [];
            this.privacyFilters = [];
            this.forcedItems = [];
            this.showLangFrameSelectionDuration = 350;
            this.selectizeOpenDuration = 290;
            this.zipUpDuration = 140;
            this.zipDownDuration = 250;
            this.zipDownCount = 0;
            this.ulSlideDownDuration = 500;
            this.ulSlideUpDuration = 550;
            this.tabSliderDuration = 255;
            this.langsFramesDropdownShown = false;
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
            this.getFilters();
        },

        ebTesting: function () {
            var self = this;
            console.log('heard event');
        },

        events: {
            'click [data-trigger=popup]': 'onShowPopup',
            'click #submit-filters': 'getFilters',
            'click #filters-anon-checkbox': 'getFilters',
            'click #launchProject': 'clickedLaunchProject',
            'click #toggleFiltersBtn': 'toggleFilters',
            'mousedown .project-type > a': 'handleSelectProjectTypeTab'
        },

        setActiveTabIndex: function (index) {
            var self = this;
            this.activeTabIndex = index;
            var $tabSlider = this.$el.find('.tab-slider');
            $tabSlider.css('left', (index-1)*$tabSlider.width());
            $tabSlider.animate({opacity: 1}, 100);
        },

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
            //    var $tabSlider = this.$el.find('.tab-slider');
            //    var tabWidth = $tabSlider.width();
            //    var strLeft = $tabSlider.css('left');
            //    var currentLeft = Number(strLeft.slice(0, strLeft.length-2));
            //    if (!isNaN(currentLeft)) {
            //        // slide LEFT
            //        if (selectedIndex < this.activeTabIndex) {
            //            $tabSlider.velocity({"left": currentLeft - ((this.activeTabIndex - selectedIndex) * tabWidth)}, {
            //                duration: self.tabSliderDuration,
            //                queue: false,
            //                easing: 'easeOutQuad'
            //            });
            //        }
            //        // slide RIGHT
            //        else {
            //            $tabSlider.velocity({"left": currentLeft + ((selectedIndex - this.activeTabIndex) * tabWidth)}, {
            //                duration: self.tabSliderDuration,
            //                queue: false,
            //                easing: 'easeOutQuad'
            //            });
            //        }
            //        this.activeTabIndex = selectedIndex;
            //    }
            //}
        },

        showLangFrameSelection: function () {
            var self = this;
            this.langsFramesDropdownShown = true;
            this.selectize.focus(true);
            this.$el.find('.selectize-control.multi').animate({opacity: 1}, {
                duration: this.showLangFrameSelectionDuration,
                queue: false
            });
            this.$el.find('.selectize-input').animate({opacity: 1}, {
                duration: this.showLangFrameSelectionDuration,
                queue: false
            });
            this.$el.find('.selectize-control.multi').animate({height: 35}, {
                duration: this.showLangFrameSelectionDuration,
                queue: false
            });
            this.$el.find('.selectize-input').animate({height: 35}, {
                duration: this.showLangFrameSelectionDuration,
                queue: false
            });
            this.langSelectionList.showClearAllBtn();
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
            this.langSelectionList.setColorsAndInitials(data.colors_and_initials);
            this.all_frames = data.all_frames;
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
                    if (self.langsFramesDropdownShown) {
                        self.zipDownDropdown();
                    }
                },
                onBlur: function() {
                    self.zipUpDropdown();
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
                if (self.all_frames[value] && !_.contains(self.langsFramesValue, self.all_frames[value])){
                    self.langsFramesValue = selectize.getValue();
                    selectize.lastQuery = null;
                    selectize.setTextboxValue('');
                    selectize.addItem(self.all_frames[value]);
                } else {
                    self.langsFramesValue = selectize.getValue();
                    self.getFilters();
                }

                self.langSelectionList.addItem(value);

            });
            selectize.on('item_remove', function (value, $item) {
                self.langsFramesValue = selectize.getValue();
                self.getFilters();
            });

            this.langSelectionList.showFiltersBtn();
        },

        zipUpDropdown: function () {
            var self = this;
            this.selectize.zipUp(this.zipUpDuration);
            this.langSelectionList.$el.find('.lang-selection-list').velocity({ top: 130 }, this.ulSlideUpDuration, [230, 20]);
        },

        zipDownDropdown: function () {
            var self = this;
            this.zipDownCount++;
            var duration = this.zipDownDuration;
            if (this.zipDownCount == 1){
                duration += 350;
            }
            this.selectize.zipDown(duration);
            this.langSelectionList.$el.find('.lang-selection-list').velocity({ top: 270 }, this.ulSlideDownDuration, [230, 20]);
        },

        getFilters: function () {
            var self = this;
            var any = false;
            var anon = self.$el.find('#filters-anon-checkbox').is(':checked');
            var obj = {
                filters: {
                    status: self.projectTypeStatus
                }
            };

            if (!_.isEmpty(self.langsFramesValue)) {
                obj.filters.langs_and_frames = self.langsFramesValue;
                any = true;
            }
            if (!_.isEmpty(self.privacyFilters) && self.privacyFilters.length < 2) {
                obj.filters.privacy = self.privacyFilters;
                any = true;
            }
            if (anon) {
                obj.filters.anon = anon;
                any = true;
            }
            if (!_.isEmpty(self.licenseFilters) && self.licenseFilters.length < 3) {
                obj.filters.license = self.licenseFilters;
                any = true;
            }

            self.filters = obj;

            self.getFilteredFeed(obj);

            if (!any) {
                self.filters = null;
            }
        },

        setLangFrameInputProps: function () {
            this.$el.find('.selectize-control.multi').css('width', (this.langFrameWidth-40) + 'px');
            this.$el.find('.selectize-control.multi').css('left', '20px');
            this.$el.find('.selectize-dropdown-content').height(140);
        },

        getFilteredFeed: function (obj) {
            var self = this;
            var project = new Project();
            project.filteredFeed(obj, {success: function (data) {
                self.handleFilteredFeed(data);
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
            var self = this;
            this.userData = data;
            this.user_uuid = data.user_uuid;
            this.userID = data.id;
            this.ghAccessToken = data.password;
            this.gh_username = data.gh_username;
        },

        addLicenseFilter: function (type) {
            var self = this;
            if (!_.contains(this.licenseFilters)) {
                this.licenseFilters.push(type);
            }
            self.getFilters();
        },

        removeLicenseFilter: function (type) {
            var self = this;
            if (!_.contains(this.licenseFilters)) {
                this.licenseFilters.splice(this.licenseFilters.indexOf(type), 1);
            }
            self.getFilters();
        },

        addPrivacyFilter: function (type) {
            var self = this;
            if (!_.contains(this.privacyFilters)) {
                this.privacyFilters.push(type);
            }
            self.getFilters();
        },

        removePrivacyFilter: function (type) {
            var self = this;
            if (!_.contains(this.privacyFilters)) {
                this.privacyFilters.splice(this.privacyFilters.indexOf(type), 1);
            }
            self.getFilters();
        },

        populateProjectFeed: function (status) {
            var self = this;
            var project = new Project();
            this.projectTypeStatus = status; // int value
            this.projectFeedView.setProjectTypeStatus(status);
            if (self.filters == null) {
                project.fetchFeedProjects({status: status}, {success: self.projectFeedView.handleFetchProjects, error: self.projectFeedView.errorHandler});
            } else {
                self.filters.filters.status = status;
                self.getFilteredFeed(self.filters);
            }
        },

        setLangFrameWidth: function (width) {
            var self = this;
            this.langFrameWidth = width;
            this.nonLangFiltersView.$el.find('#nonLangFiltersMaster').css('width', this.langFrameWidth + 'px');
            this.nonLangFiltersView.$el.find('#clearNonLangFiltersBtnContainer').css('width', this.langFrameWidth + 'px');
            this.langSelectionList.$el.find('#clearLangFiltersBtnContainer').css('width', this.langFrameWidth + 'px');
        },

		render: function (options) {
			var self = this;

            var upForGrabsActive = options && options.hasOwnProperty('index') ? options.index == 0 : false;
            var onTheFenceActive = options && options.hasOwnProperty('index') ? options.index == 1 : true;
            var launchedActive = options && options.hasOwnProperty('index') ? options.index == 2 : false;

            this.$el.html(IndexViewTpl({
                upForGrabsActive: upForGrabsActive,
                onTheFenceActive: onTheFenceActive,
                launchedActive: launchedActive
            }));

            this.projectFeedView = new ProjectFeedView({
                el: '#project-feed'
            });
            this.projectFeedView.render();

            var projectTypeStatus = options && options.hasOwnProperty('index') ? options.index : 1;
            this.populateProjectFeed(projectTypeStatus);

            this.nonLangFiltersView = new NonLangFiltersView({
                el: '#nonLangFiltersContainer'
            });

            this.nonLangFiltersView.render();

            this.langSelectionList = new LangSelectionList({
                el: '#langSelectionListContainer'
            });

            this.listenTo(this.langSelectionList, 'langFrameWidth', this.setLangFrameWidth);

            this.langSelectionList.render();

            this.$el.find('ul.tabs').tabs();

        }
	});

	return IndexView;

});