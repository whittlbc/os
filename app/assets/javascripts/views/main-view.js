define(['jquery',
	'backbone',
	'underscore',
    'views/home/index-view',
    'views/projects/project-view',
    'models/os.util',
    'models/project',
    'views/modals/create-project-modal',
    'models/all-langs',
    'models/user',
    'integrations/github',
    'sifter.min',
    'views/modals/login-modal',
    'views/modals/contributors-modal',
    'views/modals/basic-question-modal',
    'views/search/search-container-view',
    'views/notifications/notifications-dropdown-view',
    'stache!views/main-view',
    'backbone-eventbroker'
], function ($,
     Backbone,
     _,
     IndexView,
     ProjectView,
     OSUtil,
     Project,
     CreateProjectModal,
     AllLangs,
     User,
     Github,
     Sifter,
     LoginModal,
     ContributorsModal,
     BasicQuestionModal,
     SearchContainerView,
     NotificationsDropdownView,
     MainViewTpl) {
	'use strict';

	var MainView = Backbone.View.extend({

		initialize: function () {
            Backbone.EventBroker.register({
                'pull-project': 'showCreateModalOnPullProject',
                'project:vote': 'loginOrProjectVote',
                'comment:vote': 'loginOrCommentVote',
                'comment:reply': 'loginOrReplyToComment',
                'comment:delete': 'showDeleteCommentModal',
                'post-comment:click': 'loginOrPostComment',
                'comment-input:click': 'loginOrAllowCommentInput',
                'login:gh': 'loginWithGH',
                'contribs-modal:show': 'showContribsModal',
                'create-project-modal:hide': 'hideCreateProjectModal',
                'send-invites-modal:show': 'showSendInvitesModal',
                'project:star': 'handleStarProject',
                'project:delete': 'showDeleteProjectModal',
                'updateUpvotedProjectsArray': 'updateUpvotedProjectsArray',
                'updateUpvotedCommentsArray': 'updateUpvotedCommentsArray',
                'evolution-item:delete': 'showDeleteEvolutionItemModal',
                'invite-gh-contributors': 'getAllContributorsForRepo'
            }, this);
            this.userAuthed = false;

            this.github = Github;
            this.github.setToken('202171c69b06bbe92b666e1a5e3a9b7981a6fced');

        },

		events: {},

        getAllContributorsForRepo: function (projectUUID) {
            var self = this;
            this.github.getContributors('cosmicexplorer', 'imposters', function (contribData) {
            //this.github.getContributors(this.userData.gh_username, project.repo_name, function (contribData) {
                var usernames = [];
                _.each(contribData, function (contributor) {
                    if (contributor.login != self.userData.gh_username) {
                        usernames.push(contributor.login);
                    }
                });
                var project = new Project();
                project.sendInviteEmails({user_uuid: self.userData.user_uuid, project_uuid: projectUUID, usernames: usernames});
            });
        },

        showDeleteCommentModal: function (data) {
            var self = this;
            this.commentToDeleteOptions = data;
            this.deleteCommentModal.showModal();
        },

        deleteComment: function () {
            var self = this;
            var project = new Project();
            project.destroyComment({
                comment_id: self.commentToDeleteOptions.id,
                user_uuid: self.userData.user_uuid,
                project_id: self.projectView.projectID,
                feed: self.commentToDeleteOptions.feed
            }, {success: function (comments) {
                self.projectView.handleFetchedComments(comments);
            }});
        },

        showDeleteProjectModal: function () {
            this.deleteProjectModal.showModal();
        },

        showDeleteEvolutionItemModal: function (view) {
            var self = this;
            self.passedEvolutionFeedView = view;
            this.deleteEvolutionItemModal.showModal();
        },

        deleteProject: function () {
            var self = this;
            var project = new Project();
            project.destroyProject({id: self.projectView.projectID}, {success: function () {
                window.location.hash = '#on-the-fence';
                // show tiny success popup
            }, error: function () {
                // show an error message
            }});
        },

        updateUpvotedProjectsArray: function (arr) {
            var self = this;
            this.userData.upvotedProjects = arr;
        },

        updateUpvotedCommentsArray: function (arr) {
            var self = this;
            this.userData.upvotedComments = arr;
        },

        handleStarProject: function (bool) {
            var self = this;
            var user = new User();
            user.star({user_uuid: self.userData.user_uuid, project_id: Number(self.projectView.projectID), star: bool});
        },

        hideCreateProjectModal: function () {
            var self = this;
            this.createProjectModal.hideModal();
            this.forceHideModalBackdrop();
        },

        forceHideModalBackdrop: function () {
            var self = this;
            var $backdrop = $('.modal-backdrop');
            $backdrop.animate({opacity: 0}, 400);
            setTimeout(function () {
                $backdrop.hide();
                $('body').removeClass('modal-open');
            }, 400)

        },

        showContribsModal: function () {
            var self = this;
            if (this.projectView && this.projectView.contributors) {
                this.contribsModal.populate(this.projectView.contributors);
                this.contribsModal.showModal();
            }
        },

        showSendInvitesModal: function () {
            this.sendInvitesModal.showModal();
        },

        passActiveHomeIndex: function (index) {
            this.activeHomeIndex = index;
        },

        loginWithGH: function () {
            var self = this;
            var state;

            if (this.showHomeView) {
                switch (this.activeHomeIndex) {
                    case 0:
                        state = OSUtil.UP_FOR_GRABS_STATE;
                        break;
                    case 1:
                        state = OSUtil.ON_THE_FENCE_STATE;
                        break;
                    case 2:
                        state = OSUtil.LAUNCHED_STATE;
                        break;
                }
            } else {
                state = OSUtil.PROJECT_STATE + 'num' + this.projectView.projectID;
            }

            window.location = 'https://github.com/login/oauth/authorize?client_id=bfdb73ed12138dddbfcc&scope=public_repo&state=' + state;
        },

        // either show the login modal or vote on the passed projectPostView
        loginOrProjectVote: function (data) {
            var self = this;
            if (this.userAuthed) {
                if (!_.contains(this.userData.upvotedProjects, data.projectID)) {
                    this.userData.upvotedProjects.push(data.projectID);
                    data.view.handleVote(self.userData.user_uuid);
                }
            } else {
                this.loginModal.setMessage('You must be logged in to vote on projects.');
                this.loginModal.showModal();
            }
        },

        loginOrCommentVote: function (view) {
            var self = this;
            if (this.userAuthed) {
                if (!_.contains(this.userData.upvotedComments, view.id)) {
                    this.userData.upvotedComments.push(view.id);
                    view.handleVote(self.userData.user_uuid);
                }
            } else {
                this.loginModal.setMessage('You must be logged in to vote on comments.');
                this.loginModal.showModal();
            }
        },

        loginOrReplyToComment: function (view) {
            var self = this;
            if (this.userAuthed) {
                view.handleShowReplyInput();
            } else {
                this.loginModal.setMessage('You must be logged in to participate in the discussion.');
                this.loginModal.showModal();
            }
        },

        loginOrPostComment: function (view) {
            var self = this;
            if (this.userAuthed) {
                view.handleAddComment();
            } else {
                this.loginModal.setMessage('You must be logged in to participate in the discussion.');
                this.loginModal.showModal();
            }
        },

        loginOrAllowCommentInput: function (view) {
            var self = this;
            if (this.userAuthed) {
                this.loginModal.setMessage('You must be logged in to participate in the discussion.');
                this.loginModal.showModal();
            }
        },

        showCreateModalOnPullProject: function (id) {
            var self = this;
            this.createProjectModal.resetPopup();
            this.createProjectModal.formatForPullProject(id);
            setTimeout(function () {
                self.createProjectModal.showModal();
            }, 10)
        },

        changeHomeFeedType: function (index) {
            this.homeView.populateProjectFeed(index);
        },

        passCookieUser: function (cookieGHUsername) {
            var self = this;
            this.cookieGHUsername = cookieGHUsername;
            if (_.isEmpty(cookieGHUsername)) {
                // user cookie wan't set
                console.log('user cookie wasnt set');
            } else {
                this.userAuthed = true;
                var user = new User();
                user.getByGHUsername({gh_username: cookieGHUsername}, {success: function (user) {
                    self.setUserFromResponse(user);
                    self.notificationsDropdown.populate(user.notifications);
                }});
            }
        },

        setUserFromResponse: function(user) {
            this.userData = user;
            this.setUserHeaderPic(user.pic);
            if (this.createProjectModal) {
                this.createProjectModal.passUserData(user);
            }
            this.trigger('cookie:set', user.gh_username);
            this.passUserToNestedViews(user);
        },

        passUserToNestedViews: function (user) {
            if (this.homeView) {
                this.homeView.passUserInfo(user);
            }
            if (this.projectView) {
                this.projectView.passUserInfo(user);
            }
        },

        setUserHeaderPic: function (url) {
            $('#header-user-pic').attr('src', url);
        },

        getAllLanguages: function () {
            this.handleAllLanguages(AllLangs.getAll());
        },

        handleAllLanguages: function (data) {
            this.allLangs = data;
            if (this.homeView) {
                this.homeView.passLanguages(data);
                this.homeView.createLangsFilterDropdown();
            }
            if (this.projectView) {
                this.projectView.passLanguages(data);
            }
            if (this.createProjectModal) {
                this.createProjectModal.passLangData(data);
            }
        },

        addHeaderClickListeners: function () {
            var self = this;
            $('#headerAddProjectBtn').click(function () {
                if (self.userAuthed) {
                    self.createProjectModal.showModal();
                } else {
                    self.loginModal.setMessage('You must be logged in to add a project.');
                    self.loginModal.showModal();
                }
            });

            $(document).click(function () {
                self.notificationsDropdown.$el.hide();
            });

            $('#headerNotificationsIcon').click(function (e) {
                e.stopPropagation();
                self.searchView.forceCloseSearchBar();
                self.notificationsDropdown.$el.css('display') === 'none' ? self.notificationsDropdown.$el.show() : self.notificationsDropdown.$el.hide();
            });
        },

        respondToRequest: function (notificationData, answer) {
            var self = this;
            var project = new Project();
            project.respondToRequest({
                requester_uuid: notificationData.requester_uuid,
                responder_uuid: self.userData.user_uuid,
                project_uuid: notificationData.project_uuid,
                pending_request_uuid: notificationData.uuid,
                response: answer
            }, {success: function (notifications) {
                // only repopulate if a request was requested. You're showing the acceptance screen otherwise
                if (!answer) {
                    self.notificationsDropdown.populate(notifications);
                }
            }});
        },

		render: function (options) {
			var self = this;
            this.showHomeView = options && options.view == OSUtil.HOME_PAGE;
            this.showProjectView = options && options.view == OSUtil.PROJECT_PAGE;

            this.$el.html(MainViewTpl({
                showHomeView: this.showHomeView,
                showProjectView: this.showProjectView
            }));

            if (this.showHomeView) {
                if (this.homeView) {
                    this.homeView.$el = this.$el.find('#homeViewContainer');
                    this.homeView.resetProps();
                } else {
                    this.homeView = new IndexView({
                        el: this.$el.find('#homeViewContainer')
                    });
                }
                this.homeView.passCookieGHUsername(this.cookieGHUsername);
                this.listenTo(this.homeView, 'languages:all');
                this.homeView.render({
                    index: options && options.hasOwnProperty('index') ? options.index : 1
                });
            }
            if (this.showProjectView) {
                if (this.homeView) {
                    this.homeView.removeScrollListener();
                }
                if (this.projectView) {
                    this.projectView.$el = this.$el.find('#projectViewContainer');
                    this.projectView.reInitialize(options.id, this.cookieGHUsername);
                } else {
                    this.projectView = new ProjectView({
                        el: this.$el.find('#projectViewContainer'),
                        id: options ? options.id : null,
                        cookieGHUsername: this.cookieGHUsername
                    });
                }
            }

            this.allLangs ? this.handleAllLanguages(this.allLangs) : this.getAllLanguages();

            this.createProjectModal = new CreateProjectModal({
                el: this.$el.find('#modalCreateProject')
            });
            if (this.userData) {
                this.createProjectModal.passUserData(this.userData);
            }
            if (this.allLangs) {
                this.createProjectModal.passLangData(this.allLangs);
            }
            this.createProjectModal.render();

            this.loginModal = new LoginModal({
               el: this.$el.find('#modalLogin')
            });
            this.loginModal.render();

            this.contribsModal = new ContributorsModal({
                el: this.$el.find('#modalContribs')
            });
            this.contribsModal.render();

            this.deleteCommentModal = new BasicQuestionModal({
                el: this.$el.find('#modalDeleteComment'),
                message: 'Are you sure you want to delete this comment?'
            });
            this.listenTo(this.deleteCommentModal, 'confirm', function () {
                self.deleteComment();
            });
            this.deleteCommentModal.render();

            this.deleteProjectModal = new BasicQuestionModal({
                el: this.$el.find('#modalDeleteProject'),
                message: 'Are you sure you want to delete this project?'
            });
            this.listenTo(this.deleteProjectModal, 'confirm', function () {
                self.deleteProject();
            });
            this.deleteProjectModal.render();

            this.deleteEvolutionItemModal = new BasicQuestionModal({
                el: this.$el.find('#modalDeleteEvolutionItem'),
                message: 'Are you sure you want to delete this item from the Coming Soon list?'
            });
            this.listenTo(this.deleteEvolutionItemModal, 'confirm', function () {
                self.passedEvolutionFeedView.deleteEvolutionItem();
            });
            this.deleteEvolutionItemModal.render();

            this.sendInvitesModal = new BasicQuestionModal({
                el: this.$el.find('#modalSendInvites'),
                message: 'Send invitations to join this project to all contributors of this Github repo?'
            });
            this.listenTo(this.sendInvitesModal, 'confirm', function () {
                self.getAllContributorsForRepo(self.projectView.uuid);
            });
            this.sendInvitesModal.render();

            this.searchView = new SearchContainerView({
                el: '#mainSearchBar'
            });
            
            this.listenTo(this.searchView, 'hide-menu-dropdowns', function () {
                self.notificationsDropdown.$el.hide();
            });
            
            this.searchView.render();

            this.notificationsDropdown = new NotificationsDropdownView({
                el: '#notificationsDropdown'
            });

            this.listenTo(this.notificationsDropdown, 'accept-request', function (notificationData) {
                self.respondToRequest(notificationData, true);
            });

            this.listenTo(this.notificationsDropdown, 'reject-request', function (notificationData) {
                self.respondToRequest(notificationData, false);
            });

            this.notificationsDropdown.render();

            this.addHeaderClickListeners();
        }

	});

	return MainView;

});
