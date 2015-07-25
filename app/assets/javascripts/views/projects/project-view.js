define(['jquery',
    'backbone',
    'underscore',
    'views/os.view',
    'models/project',
    'views/projects/project-details-view',
    'views/projects/details-chat-feed-view',
    'stache!views/projects/project-view',
    'selectize'
], function ($,
     Backbone,
     _,
     OSView,
     Project,
     ProjectDetailsView,
     DetailsChatFeedView,
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
        },

        handleFetchedDetails: function (resp) {
            master.setProjectProperties(resp);
            master.render(resp);
        },

        cacheFeedBeforeSearch: function () {
        // just putting this here so that it's defined to be called by os.view
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

        addListeners: function () {
            var self = this;
            this.listenTo(this.projectDetailsView, 'comment:add', self.handleAddComment);
            this.listenTo(this.projectDetailsView, 'project:join', self.checkProjectPrivacy);
        },

        isContributor: function () {
            return _.contains(this.contributors, this.userID);
        },

        checkProjectPrivacy: function () {
            if (!this.isContributor()) {
                this.privacy == 'open' ? this.joinProject() : this.requestToJoin();
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
            var commentObj = {
                text: text,
                user_uuid: self.user_uuid,
                project_id: self.projectID
            };
            this.detailsChatFeedView.addComment(commentObj);
            var project = new Project();
            project.addComment(commentObj);
        },

        render: function (data) {

            var self = this;

            this.data = data;

            this.$el.html(ProjectViewTpl());

            this.projectDetailsView = new ProjectDetailsView({
                el: '#projectDetailsView'
            });

            this.projectDetailsView.render(data.project);

            this.detailsChatFeedView = new DetailsChatFeedView({
                el: '#detailsChatFeedView'
            });

            this.detailsChatFeedView.render(data.comments);

            this.addListeners();

            window.scrollTo(0, 0);

        }
    });

    return ProjectView;

});