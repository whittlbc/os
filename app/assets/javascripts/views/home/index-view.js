define(['jquery',
	'backbone',
	'underscore',
    'views/os.view',
    'models/os.util',
    'views/home/project-feed-view',
    'models/project',
    'models/user',
    'models/language',
    'views/home/lang-selection-list',
    'stache!views/home/index-view',
    'selectize',
    'velocity',
    'backbone-eventbroker'], function ($,
     Backbone,
     _,
     OSView,
     OSUtil,
     ProjectFeedView,
     Project,
     User,
     Language,
     LangSelectionList,
     IndexViewTpl
     ) {
	'use strict';

    var master;

	var IndexView = OSView.extend({

		initialize: function () {
            Backbone.EventBroker.register({
                'handleFetchGHProject': 'handleFetchGHProject',
                'handleCreateProject': 'handleCreateProject',
                'getAllUserRepos': 'getAllUserRepos',
                'pullFromIdeas': 'pullFromIdeas',
                'showLangFrameSelection': 'showLangFrameSelection'
            }, this);
            this.osInitialize();
            master = this;
            this.filters = null;
            this.filtersShown = false;
            this.langsFramesValue = [];
            this.licenses = [];
            this.privacy = [];
            this.forcedItems = [];
            this.gotLanguages = false;
            this.selectizeOpenDuration = 290;
            this.zipUpDuration = 250;
            this.zipDownDuration = 250;
            this.langsFramesDropdownShown = false;
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
            'click #toggleFiltersBtn': 'toggleFilters'
        },

        showLangFrameSelection: function () {
            var self = this;
            this.$el.find('.selectize-control.multi').show();
            this.$el.find('.selectize-control.multi').css('opacity', 1);
            this.$el.find('.selectize-control.multi').animate({ width: self.langFrameWidth - 20 }, {duration: self.selectizeOpenDuration, queue: false});
            this.$el.find('.selectize-control.multi').animate({ left: 10 }, {duration: self.selectizeOpenDuration, queue: false});
            this.$el.find('.lang-selection-list').velocity({ top: 240 }, 500, [200, 20]);
            //this.$el.find('.lang-selection-list').animate({ top: 240 }, {duration: self.selectizeOpenDuration, queue: false});
            setTimeout(function(){
                self.selectize.focus();
                self.langsFramesDropdownShown = true;
            }, self.selectizeOpenDuration);
        },

        hideLangFrameSelection: function () {
            var self = this;
            this.$el.find('.selectize-control.multi').velocity({ width: 0 }, { duration: self.selectizeOpenDuration, queue: false });
            this.$el.find('.selectize-control.multi').velocity({ left: (self.langFrameWidth/2) }, { duration: self.selectizeOpenDuration, queue: false });
            this.$el.find('.selectize-control.multi').velocity({ opacity: 0 }, { duration: self.selectizeOpenDuration, queue: false });
            setTimeout(function () {
                self.$el.find('.selectize-control.multi').hide();
            }, self.selectizeOpenDuration + 5);
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
            // master
            console.log(resp)
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

        getLanguages: function () {
            var self = this;
            var language = new Language();
            language.getAll({success: self.handleAllLanguages});
        },

        handleAllLanguages: function (resp) {
            master.all_langs = resp.all_langs;
            master.all_frames = resp.all_frames;

            var options = {
                theme: 'links',
                maxItems: null,
                valueField: 'id',
                searchField: 'title',
                options: resp.dropdown_items,
                selectOnTab: true,
                onFocus: function () {
                    if (master.langsFramesDropdownShown) {
                        master.zipDownDropdown();
                    }
                },
                onBlur: function() {
                    master.zipUpDropdown();
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

            var $select = master.$el.find('#filters-langs-frames').selectize(options);
            var selectize = $select[0].selectize;
            master.gotLanguages = true;
            if (master.langFrameWidth) {
                master.$el.find('.selectize-control.multi').css('left', (master.langFrameWidth/2) + 'px');
            }
            selectize.on('item_add', function (value, $item) {
                /* if you just entered the framework as a lang/frame filter, but haven't entered the language that framework
                goes with, then we'll go ahead and add that for you */
                if (master.all_frames[value] && !_.contains(master.langsFramesValue, master.all_frames[value])){
                    master.langsFramesValue = selectize.getValue();
                    selectize.lastQuery = null;
                    selectize.setTextboxValue('');
                    selectize.addItem(master.all_frames[value]);
                } else {
                    master.langsFramesValue = selectize.getValue();
                    master.getFilters();
                }

                master.langSelectionList.addItem();

            });
            selectize.on('item_remove', function (value, $item) {
                master.langsFramesValue = selectize.getValue();
                master.getFilters();
            });

            master.selectize = selectize;
        },

        zipUpDropdown: function () {
            var self = this;
            this.selectize.zipUp(this.zipUpDuration);
            this.$el.find('.lang-selection-list').velocity({ top: 130 }, 450, [230, 20]);
            //this.$el.find('.lang-selection-list').animate({ top: 130 }, this.zipUpDuration);
        },

        zipDownDropdown: function () {
            var self = this;
            this.selectize.zipDown(this.zipDownDuration);
            this.$el.find('.lang-selection-list').velocity({ top: 240 }, 500, [230, 20]);
            //this.$el.find('.lang-selection-list').animate({ top: 240 }, this.zipDownDuration);
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
            if (!_.isEmpty(self.privacy) && self.privacy.length < 2) {
                obj.filters.privacy = self.privacy;
                any = true;
            }
            if (anon) {
                obj.filters.anon = anon;
                any = true;
            }
            if (!_.isEmpty(self.licenses) && self.licenses.length < 3) {
                obj.filters.license = self.licenses;
                any = true;
            }

            self.filters = obj;

            self.getFilteredFeed(obj);

            if (!any) {
                self.filters = null;
            }
        },

        getFilteredFeed: function (obj) {
            var self = this;
            var project = new Project();
            project.filteredFeed(obj, {success: self.handleFilteredFeed});
        },

        handleFilteredFeed: function (resp) {
            console.log(resp);
            master.projectFeedView.populateFeed(resp)
        },

        pullFromIdeas: function () {
            var self = this;
            var project = new Project();
            project.pullFromIdeas({success: self.handlePullFromIdeas});
        },

        handlePullFromIdeas: function (resp) {
            // master
            console.log(resp);
        },

        getAllUserRepos: function () {
            var self = this;
            var user = new User();
            user.getAllUserRepos({gh_username: self.gh_username, password: self.ghAccessToken}, {success: self.handleAllReposResponse, error: self.errorHandler});
        },

        handleAllReposResponse: function (resp) {
            var self = this;
            console.log(resp);
        },

        handleCreateProject: function () {
            var self = this;
            var project = new Project();
            project.create(this.getCreateProjectData(), {success: self.showNewProject, error: self.errorHandler});
        },

        showNewProject: function (resp) {
            master.projectFeedView.handleShowNewProject(resp.new_project);
        },

        handleFetchGHProject: function () {
            var self = this;
            var project = new Project();
            project.createByGH(this.getCreateProjectData(), {success: self.showNewProject, error: self.errorHandler});
        },

        getCreateProjectData: function () {
            var self = this;
            return {
                title: $('#projectTitleField').val(),
                user_uuid: self.user_uuid,
                repo_name: $('#repoName').val(),
                description: $('#projectDescriptionField').val(),
                license: $('#license').val(),
                status: OSUtil.getProjectIntStatus($('#project-type-selection-dropdown').find(':selected').val()),
                langs_and_frames: [$('#langsAndFrames').val()],
                anon: $('#anonCheckbox').is(':checked'),
                privacy: $('#privacy-selection-dropdown').find(':selected').val()
            }
        },

        passUserInfo: function (data) {
            var self = this;
            console.log(data);
            $('.header-user-pic').attr('src', data.pic);
            this.user_uuid = data.user_uuid;
            this.userID = data.id;
            this.ghAccessToken = data.password;
            this.gh_username = data.gh_username;
        },

        createLicenseAndPrivacyDropdown: function () {
            var self = this;

            var genericOptions = {
                theme: 'links',
                valueField: 'id',
                maxItems: null,
                searchField: 'title',
                render: {
                    option: function (data, escape) {
                        return '<div class="option title">' + escape(data.title) + '</div>';
                    },
                    item: function (data, escape) {
                        return '<div class="item">' + escape(data.title) + '</div>';
                    }
                }
            };

            var licenseOptions = genericOptions;
            licenseOptions.options = [
                {id: 'MIT', title: 'MIT'},
                {id: 'GPL', title: 'GPL'},
                {id: 'BSD', title: 'BSD'}
            ];

            var $licenseSelect = this.$el.find('#filters-license-dropdown').selectize(licenseOptions);
            var licenseSelectize = $licenseSelect[0].selectize;
            licenseSelectize.on('change', function () {
                self.licenses = licenseSelectize.getValue();
                self.getFilters();
            });

            var privacyOptions = genericOptions;
            privacyOptions.options = [
                {id: 'open', title: 'Open'},
                {id: 'request', title: 'Request to join'}
            ];

            var $privacySelect = this.$el.find('#filters-privacy-dropdown').selectize(privacyOptions);
            var privacySelectize = $privacySelect[0].selectize;
            privacySelectize.on('change', function () {
                self.privacy = privacySelectize.getValue();
                self.getFilters();
            });
        },

        onShowPopup: function () {
            this.showLoginPopup();
        },

        showShouldStartFeed: function (status) {
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

        showStartingFeed: function (status) {
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

        showStartedFeed: function (status) {
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
            if (this.gotLanguages) {
                this.$el.find('.selectize-control.multi').css('left', (this.langFrameWidth/2) + 'px');
            }
        },

		render: function () {
			var self = this;

            this.$el.html(IndexViewTpl({
            }));

            this.getLanguages();

            this.projectFeedView = new ProjectFeedView({
                el: '#project-feed'
            });

            this.projectFeedView.render();

            this.langSelectionList = new LangSelectionList({
                el: '#langSelectionListContainer'
            });

            this.listenTo(this.langSelectionList, 'langFrameWidth', this.setLangFrameWidth);

            this.langSelectionList.render();

            this.createLicenseAndPrivacyDropdown();
        }
	});

	return IndexView;

});