define(['jquery',
    'backbone',
    'underscore',
    'models/project',
    'models/os.util',
    'integrations/github',
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
     Github,
     ProjectMajorView,
     ProjectMinorView,
     ProjectViewTpl) {
    'use strict';

    var ProjectView = Backbone.View.extend({

        initialize: function (options) {
            var self = this;
            var project = new Project();
            self.projectID = options.id;
            project.fetchDetails({id: options.id}, {success: function (data) {
                self.handleFetchedDetails(data);
            }});

            Backbone.EventBroker.register({
                'project:join': 'checkProjectPrivacy',
                'comment:add': 'handleAddComment',
                'comments:fetch': 'fetchComments'
            }, this);

            this.github = Github;
            this.github.setToken('202171c69b06bbe92b666e1a5e3a9b7981a6fced');

        },

        errorHandler: function(resp, status, xhr) {
            console.log('AJAX ERROR: ', xhr, resp);
        },

        events: {},

        handleAddComment: function (data) {
            var self = this;

            var obj = {
                text: data.text,
                //poster_uuid: this.user_uuid,
                poster_uuid: '35e982e1-c95d-43ac-ae60-a532596c5495',
                project_id: this.projectID,
                feed: data.feed,
                parent_id: data.parent_id
            };

            if (!_.isEmpty(obj.text)) {
                var project = new Project();
                project.postNewComment(obj, {success: function (comment) {
                    self.projectMajorView.showNewComment(comment);
                }, error: function () {
                    self.errorPostingComment();
                }});
            }
        },

        errorPostingComment: function () {
            var self = this;
            console.log('Error Posting Comment');
        },

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
                this.github.getContributors('yabwe', 'medium-editor', function (data) {
                    self.handleFetchedGHContribs(data, data.admin, data.owner_gh_username);
                });
                this.github.fetchRepoStats('yabwe', 'medium-editor', function (data) {
                    self.handleFetchedGHRepoStats(data);
                });
            } else {
                this.contributors = data.project.contributors;
            }
            this.fetchComments(0);
            this.setProjectProperties(data);
            this.render(data);
        },

        fetchComments: function (feedStatus) {
            var self = this;
            var project = new Project();
            project.fetchComments({project_id: self.projectID, feed: feedStatus}, {success: function (comments) {
                self.handleFetchedComments(comments);
            }});
        },

        handleFetchedComments: function (comments) {
            var self = this;
            self.projectMajorView.passComments(comments);
        },

        handleFetchedGHContribs: function (contribs, admin, owner_gh_username) {
            var sortedContribs = this.sortContribs(contribs, admin, owner_gh_username);
            this.projectMinorView.lazyLoadContribs(sortedContribs);
        },

        handleFetchedGHRepoStats: function (data) {
            this.projectMinorView.lazyLoadRepoStats(data);
        },

        sortContribs: function (contribs, admin, owner_gh_username) {
            var owner = [];
            var adminNotOwner = [];
            var others = [];
            for (var i = 0; i < contribs.length; i++) {
                if (contribs[i].login === owner_gh_username) {
                    contribs[i].admin = true;
                    owner.push(contribs[i]);
                } else if (_.contains(admin, contribs[i].login)) {
                    contribs[i].admin = true;
                    adminNotOwner.push(contribs[i]);
                } else {
                    others.push(contribs[i]);
                }
            }
            adminNotOwner = adminNotOwner.sort(function (a, b) {
                return (a.login > b.login) ? 1 : ((b.login > a.login) ? -1 : 0);
            });
            others = others.sort(function (a, b) {
                return (a.login > b.login) ? 1 : ((b.login > a.login) ? -1 : 0);
            });
            return _.union(owner, adminNotOwner, others);
        },

        passUserInfo: function (data) {
            var self = this;
            this.userData = data;
            this.user_uuid = data.user_uuid;
            this.userID = data.id;
            this.ghAccessToken = data.password;
            this.gh_username = data.gh_username;
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