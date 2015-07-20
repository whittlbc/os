define(['jquery',
	'backbone',
	'underscore',
    'views/os.view',
    'models/os.util',
    'views/home/project-feed-view',
    'models/project',
    'models/user',
    'models/language',
    'stache!views/home/index-view',
    "selectize"
], function ($,
     Backbone,
     _,
     OSView,
     OSUtil,
     ProjectFeedView,
     Project,
     User,
     Language,
     IndexViewTpl
     ) {
	'use strict';

    var master;

	var IndexView = OSView.extend({

		initialize: function () {
            this.osInitialize(this);
            master = this;
            this.filters = null;
            this.langsFramesValue = [];
            this.licenses = [];
            this.privacy = [];
		},

        events: {
            'click [data-trigger=popup]': 'onShowPopup',
            'click #submit-filters': 'getFilters',
            'click #filters-anon-checkbox': 'getFilters'
        },

        errorHandler: function(resp, status, xhr) {
            console.log('AJAX ERROR: ', xhr, resp);
        },

        getLanguages: function () {
            var self = this;
            var language = new Language();
            language.getAll({success: self.handleAllLanguages});
        },

        handleAllLanguages: function (resp) {

            var options = {
                theme: 'links',
                maxItems: null,
                valueField: 'id',
                searchField: 'title',
                options: resp.dropdown_items,
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
            selectize.on('change', function () {
                master.langsFramesValue = selectize.getValue();
                master.getFilters();
            });
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
            $('.header-user-pic').attr('src', data.pic);
            this.user_uuid = data.user_uuid;
            this.user_uuid = data.user_uuid;
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

		render: function () {
			var self = this;
            this.$el.html(IndexViewTpl({
            }));

            this.getLanguages();

            this.projectFeedView = new ProjectFeedView({
                el: '#project-feed'
            });

            this.projectFeedView.render();

            this.createLicenseAndPrivacyDropdown();
        }
	});

	return IndexView;

});