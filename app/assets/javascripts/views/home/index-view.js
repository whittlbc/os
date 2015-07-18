define(['jquery',
	'backbone',
	'underscore',
    'views/os.view',
    'models/os.util',
    'views/home/project-feed-view',
    'models/project',
    'stache!views/home/index-view',
], function ($,
     Backbone,
     _,
     OSView,
     OSUtil,
     ProjectFeedView,
     Project,
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
            $('#pullGHProject').click(function() {
                self.handlePullGHProject();
            });
            $('#submitNewProject').click(function() {
                self.handleCreateProject();
            });
        },

        handleCreateProject: function () {
            var self = this;
            this.newProjectData = this.getCreateProjectData();
            var project = new Project();
            project.create(this.newProjectData, {success: self.showNewProject, error: self.errorHandler});

        },

        showNewProject: function () {
            master.projectFeedView.addPost(master.newProjectData);
        },

        handlePullGHProject: function () {
            var self = this;

        },

        getCreateProjectData: function () {
            var self = this;
            return {
                title: $('#projectTitleField').val(),
                user_uuid: self.user_uuid,
                repo_name: $('#repoName').val(),
                description: $('#projectDescriptionField').val(),
                license: $('#license').val(),
                status: OSUtil.getProjectIntStatus($('#project-type-selection-dropdown').find(':selected').text()),
                langs_and_frames: [$('#langsAndFrames').val()],
                anon: $('#anonCheckbox').is(':checked')
            }
        },

        personalizePage: function (data) {
            var self = this;
            $('.header-user-pic').attr('src', data.pic);
            this.user_uuid = data.user_uuid;
            this.ghAccessToken = data.password;
        },

		events: {
            'click [data-trigger=popup]': 'onShowPopup'
        },

        onShowPopup: function () {
            this.showLoginPopup();
        },

        showShouldStartFeed: function () {
            var self = this;
            var project = new Project();
            this.projectFeedView.setProjectType('shouldStart')
            project.fetchFeedProjects({success: self.projectFeedView.populateFeed, error: self.projectFeedView.errorHandler});
        },

        showStartingFeed: function () {
            var self = this;
            var project = new Project();
            this.projectFeedView.setProjectType('starting')
            project.fetchFeedProjects({success: self.projectFeedView.populateFeed, error: self.projectFeedView.errorHandler});
        },

        showStartedFeed: function () {
            var self = this;
            var project = new Project();
            this.projectFeedView.setProjectType('started')
            project.fetchFeedProjects({success: self.projectFeedView.populateFeed, error: self.projectFeedView.errorHandler});
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