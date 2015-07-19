define(['jquery',
	'backbone',
	'underscore',
    'views/os.view',
    'models/os.util',
    'views/home/project-feed-view',
    'models/project',
    'models/user',
    'stache!views/home/index-view',
], function ($,
     Backbone,
     _,
     OSView,
     OSUtil,
     ProjectFeedView,
     Project,
     User,
     IndexViewTpl
     ) {
	'use strict';

    var master;

	var IndexView = OSView.extend({

		initialize: function () {
            this.osInitialize();
            this.erbEvents();
            master = this;
		},

        errorHandler: function(resp, status, xhr) {
            console.log('AJAX ERROR: ', xhr, resp);
        },

        erbEvents: function () {
            var self = this;
            $('#fetchGHProject').click(function() {
                self.handleFetchGHProject();
            });
            $('#submitNewProject').click(function() {
                self.handleCreateProject();
            });
            $('#getAllRepos').click(function() {
                self.getAllUserRepos();
            });
            $('#pullFromIdeas').click(function() {
                self.pullFromIdeas();
            });
        },

        pullFromIdeas: function () {
            var self = this;
            var project = new Project();
            project.pullFromIdeas({success: self.handlePullFromIdeas});
        },

        handlePullFromIdeas: function (resp) {
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
            this.ghAccessToken = data.password;
            this.gh_username = data.gh_username;
        },

		events: {
            'click [data-trigger=popup]': 'onShowPopup'
        },

        onShowPopup: function () {
            this.showLoginPopup();
        },

        showShouldStartFeed: function (status) {
            var self = this;
            var project = new Project();
            this.projectFeedView.setProjectTypeStatus(status)
            project.fetchFeedProjects({status: status}, {success: self.projectFeedView.handleFetchProjects, error: self.projectFeedView.errorHandler});
        },

        showStartingFeed: function (status) {
            var self = this;
            var project = new Project();
            this.projectFeedView.setProjectTypeStatus(status)
            project.fetchFeedProjects({status: status}, {success: self.projectFeedView.handleFetchProjects, error: self.projectFeedView.errorHandler});
        },

        showStartedFeed: function (status) {
            var self = this;
            var project = new Project();
            this.projectFeedView.setProjectTypeStatus(status)
            project.fetchFeedProjects({status: status}, {success: self.projectFeedView.handleFetchProjects, error: self.projectFeedView.errorHandler});
        },

		render: function () {
			var self = this;
            this.$el.html(IndexViewTpl({
            }));

            this.projectFeedView = new ProjectFeedView({
                el: '#project-feed'
            });

            this.projectFeedView.render();
		}
	});

	return IndexView;

});