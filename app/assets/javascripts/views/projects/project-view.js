define(['jquery',
    'backbone',
    'underscore',
    'views/os.view',
    'models/project',
    'models/os.util',
    'views/projects/major/project-major-view',
    'views/projects/minor/project-minor-view',
    'stache!views/projects/project-view',
    'selectize'
], function ($,
     Backbone,
     _,
     OSView,
     Project,
     OSUtil,
     ProjectMajorView,
     ProjectMinorView,
     ProjectViewTpl) {
    'use strict';

    var master;

    var ProjectView = OSView.extend({

        initialize: function (options) {
            var self = this;
            master = this;
            this.osInitialize();
            var project = new Project();
            self.projectID = options.id;
            project.fetchDetails({id: options.id}, {success: self.handleFetchedDetails, error: self.errorHandler});
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
            self.contributors = data.project.contributors;
            self.owner_gh_username = data.project.owner_gh_username;
        },

        handleFetchedDetails: function (data) {
            console.log(data);
            master.setProjectProperties(data);
            master.render(data);
        },

        cacheFeedBeforeSearch: function () {
        // just putting this here so that it's defined to be called by os.view
        },

        passUserInfo: function (data) {
            var self = this;
            $('.header-user-pic').attr('src', data.pic);
            this.userData = data;
            this.user_uuid = data.user_uuid;
            this.userID = data.id;
            this.ghAccessToken = data.password;
            this.gh_username = data.gh_username;
            this.passUserInfoToParent(this.userData);
        },

        addListeners: function () {
            var self = this;
        },

        isContributor: function () {
            return _.contains(this.contributors, this.userID);
        },

        checkProjectPrivacy: function () {
            if (!this.isContributor()) {
                this.privacy == OSUtil.OPEN_PRIVACY ? this.joinProject() : this.requestToJoin();
            }
        },

        requestToJoin: function () {
            // send an email I guess and store it in their messages box somewhere
        },

        joinProject: function () {
            var self = this;
            var project = new Project();
            var obj = {
                project_uuid: self.uuid,
                owner_id: self.owner_id,
                joiner_uuid: self.user_uuid
            };
            project.join(obj, {success: self.handleJoinProjectSuccess});
        },

        handleJoinProjectSuccess: function (resp) {
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