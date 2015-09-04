define(['jquery',
    'backbone',
    'underscore',
    'models/project',
    'models/os.util',
    'views/projects/major/project-major-view',
    'views/projects/minor/project-minor-view',
    'stache!views/projects/project-view',
    'selectize',
    'backbone-eventbroker'
], function ($,
     Backbone,
     _,
     Project,
     OSUtil,
     ProjectMajorView,
     ProjectMinorView,
     ProjectViewTpl) {
    'use strict';

    var ProjectView = Backbone.View.extend({

        initialize: function (options) {
            var self = this;
            this.osInitialize();
            var project = new Project();
            self.projectID = options.id;
            project.fetchDetails({id: options.id}, {success: function (data) {
                self.handleFetchedDetails(data);
            }});

            Backbone.EventBroker.register({
                'project:join': 'checkProjectPrivacy'
            }, this);
        },

        errorHandler: function(resp, status, xhr) {
            console.log('AJAX ERROR: ', xhr, resp);
        },

        events: {},

        setProjectProperties: function (data) {
            var self = this;
            self.privacy = data.project.privacy;
            self.owner_id = data.project.user_id;
            self.repo_name = data.project.repo_name;
            self.uuid = data.project.uuid;
            self.owner_gh_username = data.project.owner_gh_username;
        },

        handleFetchedDetails: function (data) {
            var self = this;
            if (data.project.getting_repo_data && data.project.repo_name && data.project.owner_gh_username) {
                var params = {
                    //repo_name: data.project.repo_name,
                    //owner_gh_username: data.project.owner_gh_username,
                    repo_name: 'medium-editor',
                    owner_gh_username: 'yabwe',
                    project_id: data.project.id,
                    app_contributors: data.project.contributors
                };
                var project = new Project();
                project.fetchGHContributors(params, {success: function (data) {
                    self.handleFetchedGHContribs(data);
                }});
                project.fetchGHRepoStats({repoPath: 'yabwe/medium-editor'}, {success: function () {
                    self.handleFetchedGHRepoStats();
                }});
            } else {
                this.contributors = data.project.contributors;
            }
            this.setProjectProperties(data);
            this.render(data);
        },

        handleFetchedGHContribs: function (data) {
            this.projectMinorView.lazyLoadContribs(data);
        },

        handleFetchedGHRepoStats: function (data) {
            this.projectMinorView.lazyLoadRepoStats(data);
        },

        passUserInfo: function (data) {
            var self = this;
            this.userData = data;
            this.user_uuid = data.user_uuid;
            this.userID = data.id;
            this.ghAccessToken = data.password;
            this.gh_username = data.gh_username;
            this.passUserInfoToParent(this.userData);
        },

        passLanguages: function (data) {
            // not actually using this rn, but might utilize in future, so keep it
        },

        checkProjectPrivacy: function () {
            if (!this.isContributor()) {
                this.privacy == OSUtil.OPEN_PRIVACY ? this.joinProject() : this.requestToJoin();
            }
        },

        isContributor: function () {
            return _.contains(this.contributors, this.userID);
        },

        joinProject: function () {
            var self = this;
            var project = new Project();
            var obj = {
                project_uuid: self.uuid,
                owner_id: self.owner_id,
                joiner_uuid: self.user_uuid
            };
            project.join(obj, {success: function (data) {
                self.handleJoinProjectSuccess(data);
            }});
        },

        requestToJoin: function () {
            // send an email I guess and store it in their messages box somewhere
        },

        handleJoinProjectSuccess: function (data) {
            console.log('Successfully joined project');
        },

        handleAddComment: function (text) {
            var self = this;
        },

        render: function (data) {

            var self = this;

            this.data = data;

            this.$el.html(ProjectViewTpl());

            this.projectMajorView = new ProjectMajorView({
                el: '#projectMajorView'
            });
            this.projectMajorView.render(data);

            this.projectMinorView = new ProjectMinorView({
                el: '#projectMinorView'
            });
            this.projectMinorView.render(data.project);

            window.scrollTo(0, 0);

        }
    });

    return ProjectView;

});