define(['jquery',
  'backbone',
  'underscore',
  'views/os.view',
  'views/home/index-view',
  'views/projects/project-view',
  'models/os.util',
  'models/project',
  'models/session',
  'views/modals/create-project-modal',
  'integrations/github',
  'views/modals/login-modal',
  'views/modals/contributors-modal',
  'views/modals/basic-question-modal',
  'views/search/search-container-view',
  'views/notifications/notifications-dropdown-view',
  'views/account/account-dropdown-view',
  'views/dropdowns/extras-dropdown-view',
  'views/modals/my-projects-modal',
  'views/modals/starred-modal',
  'views/modals/about-modal',
  'views/modals/rules-modal',
  'views/modals/suggestions-modal',
  'views/modals/add-implementation-modal',
  'views/footer/footer-view',
  'views/filters/lang-filters-view',
  'views/filters/minor-filters-view',
  'views/tutorial/tutorial-manager',
  'stache!views/main-view',
  'backbone-eventbroker'
], function ($,
   Backbone,
   _,
   OSView,
   IndexView,
   ProjectView,
   OSUtil,
   Project,
   Session,
   CreateProjectModal,
   Github,
   LoginModal,
   ContributorsModal,
   BasicQuestionModal,
   SearchContainerView,
   NotificationsDropdownView,
   AccountDropdownView,
   ExtrasDropdownView,
   MyProjectsModal,
   StarredModal,
   AboutModal,
   RulesModal,
   SuggestionsModal,
   AddImplementationModal,
   FooterView,
   LangFiltersView,
   MinorFiltersView,
   TutorialManager,
   MainViewTpl) {
  'use strict';

  var MainView = OSView.extend({

    postInitialize: function () {
      this.getNonCachedUserInfo();

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
        'evolution-item:delete': 'showDeleteEvolutionItemModal',
        'invite-gh-contributors': 'getAllContributorsForRepo',
        'force-hide-starred-modal': 'forceHideStarredModal',
        'force-hide-my-projects-modal': 'forceHideMyProjectsModal',
        'hide-header-dropdowns': 'hideHeaderDropdowns',
        'add-new-proj-clicked': 'addNewProjectBtnClicked',
        'notifications-icon-clicked': 'notificationsIconClicked',
        'header-ellipsis-clicked': 'headerEllipsisClicked',
        'header-user-pic-clicked': 'headerUserPicClicked',
        'open-project': 'openProject',
        'project:confirm-launch': 'confirmProjectLaunch',
        'project:major-action-btn-clicked': 'majorProjectActionBtnClickOrLogin',
        'all-user-repos:request': 'getAllUserRepos',
        'window:resize': 'positionFooterAndHeaderTutorialBubbles',
        'tutorial:login-with-gh': 'loginWithGHFromTutorial',
        'project:login-or-star': 'loginOrStar',
        'header-footer:force-show': 'forceShowHeaderFooter',
        'login-or-add-implementation': 'loginOrShowAddImplementationModal',
        'hide-add-implementations-modal': 'hideImplementationModal',
        'login-or-implementation-vote': 'loginOrImplementationVote'
      }, this);

      this.lastAddProjectPopupShownForGrab = false;
    },

    events: {},

    hideImplementationModal: function () {
      var self = this;
      this.addImplementationModal.hideModal();

      setTimeout(function () {
        self.addImplementationModal.reset();
      }, 100);
    },

    loginWithGHFromTutorial: function () {
      this.$el.find('#floatingLoginWithGHBtn').click();
      this.loginWithGH();
    },

    resetNotifications: function () {
      this.notificationsDropdown.populated = false;
    },

    getNonCachedUserInfo: function () {
      var self = this;

      this.notificationsDropdown = new NotificationsDropdownView({
        el: '#notificationsDropdown'
      });

      if (this.currentUser) {
        this.currentUser.getNonCachedInfo({ success: function (data) {
          self.ghAccessToken = data.gh_access_token;
          self.notifications = data.notifications;
          self.notificationsDropdown.populate(self.notifications);
          self.createGHInstance();
        }});
      }
    },

    createGHInstance: function () {
      this.github = Github;
      this.github.setToken(this.ghAccessToken);
    },

    getAllUserRepos: function () {
      this.github.getReposForUser(this.currentUser.get('gh_username'), function (repos) {
        var repoNames = _.map(repos, function (repo) { return repo.name });

        Backbone.EventBroker.trigger('all-user-repos:response', repoNames);
      });
    },

    majorProjectActionBtnClickOrLogin: function (data) {
      if (this.currentUser) {
        data.view.handleProjectMajorActionBtnClick();
      } else {
        var text = data.upForGrabs ? 'You must be logged in to grab an idea.' : 'You must be logged in to join a project.';
        this.loginModal.setMessage(text);
        this.loginModal.showModal();
      }
    },

    confirmProjectLaunch: function () {
      this.confirmLaunchProjectModal.showModal();
    },

    launchProject: function () {
      var project = new Project();
      project.launch({uuid: this.projectView.projectUUID}, { success: function () {
        window.location.reload();
      }});
    },

    openProject: function (uuid, e) {
      var openInNewTab = false;

      if ((Session.isMac() && e.metaKey) || (!Session.isMac() && e.ctrlKey)) {
        openInNewTab = true;
      }

      OSUtil.navToProject(uuid, openInNewTab);
    },

    showMyProjectsModal: function () {
      var self = this;
      this.myProjectsModal.showModal();

      if (this.currentUser) {
        this.currentUser.getMyProjects({
          success: function (projects) {
            self.myProjectsModal.populate(projects);
          }
        });
      }
    },

    showStarredModal: function () {
      var self = this;
      this.starredModal.showModal();

      if (this.currentUser) {
        this.currentUser.getStarredProjects({
          success: function (projects) {
            self.starredModal.populate(projects);
          }
        });
      }
    },

    forceShowHeaderFooter: function () {
      this.forceShowHeader();
      this.forceShowFooter();
    },

    forceShowHeader: function () {
      $('header').removeClass('header-nav-up').addClass('header-nav-down');
    },

    forceShowFooter: function () {
      $('footer').removeClass('footer-nav-up').addClass('footer-nav-down');
    },

    forceHideStarredModal: function (uuid, e) {
      this.switchToProjectAndHideModal(this.starredModal, uuid, e);
    },

    forceHideMyProjectsModal: function (uuid, e) {
      this.switchToProjectAndHideModal(this.myProjectsModal, uuid, e);
    },

    switchToProjectAndHideModal: function (modal, uuid, e) {
      var openInNewTab = false;

      if ((Session.isMac() && e.metaKey) || (!Session.isMac() && e.ctrlKey)) {
        openInNewTab = true;
      }

      OSUtil.navToProject(uuid, openInNewTab);

      if (!openInNewTab){
        modal.hideModal();
        this.forceHideModalBackdrop();
      }

    },

    // used to get people to send email invites to
    getAllContributorsForRepo: function (projectUUID) {
      var self = this;
      this.github.getContributors('cosmicexplorer', 'imposters', function (contribData) {
      //this.github.getContributors(this.currentUser.get('gh_username'), project.repo_name, function (contribData) {
        var usernames = [];

        _.each(contribData, function (contributor) {
          if (contributor.login != self.currentUser.get('gh_username')) {
            usernames.push(contributor.login);
          }
        });

        var project = new Project();
        project.sendInviteEmails({
          user_uuid: self.currentUser.get('uuid'),
          uuid: projectUUID,
          usernames: usernames
        });
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
        comment_uuid: self.commentToDeleteOptions.uuid,
        user_uuid: self.currentUser.get('uuid'),
        uuid: self.projectView.projectUUID,
        feed: self.commentToDeleteOptions.feed
      }, {
        success: function (comments) {
          self.projectView.projectMajorView.passComments({ comments: comments });
        }
      });
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
      project.destroyProject({uuid: self.projectView.projectUUID}, {
        success: function () {
          OSUtil.navToIdeas();
        }
      });
    },

    loginOrStar: function (view) {
      if (this.currentUser) {
        view.handleStarProject();
      } else {
        this.loginModal.setMessage('You must be logged in to star projects.');
        this.loginModal.showModal();
      }
    },

    handleStarProject: function (bool) {
      this.currentUser.star({
        project_uuid: this.projectView.projectUUID,
        star: bool
      });
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
      if (this.projectView && this.projectView.contributors) {
        this.contribsModal.populate({
          contribs: this.projectView.contributors,
          showContributions: this.projectView.projectHasRepo
        });

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
      window.location = 'https://github.com/login/oauth/authorize?client_id=' + OSUtil.GH_CLIENT_ID + '&scope=public_repo';
    },

    // either show the login modal or vote on the passed projectPostView
    loginOrProjectVote: function (view) {
      if (this.currentUser) {
        if (!view.voted) {
          view.handleVote();
        }
      } else {
        this.loginModal.setMessage('You must be logged in to vote on projects.');
        this.loginModal.showModal();
      }
    },

    loginOrCommentVote: function (view) {
      var self = this;
      if (this.currentUser) {
        if (!view.voted) {
          view.handleVote();
        }
      } else {
        this.loginModal.setMessage('You must be logged in to vote on comments.');
        this.loginModal.showModal();
      }
    },

    loginOrReplyToComment: function (view) {
      var self = this;
      if (this.currentUser) {
        view.handleShowReplyInput();
      } else {
        this.loginModal.setMessage('You must be logged in to participate in the discussion.');
        this.loginModal.showModal();
      }
    },

    loginOrPostComment: function (view) {
      var self = this;
      if (this.currentUser) {
        view.handleAddComment();
      } else {
        this.loginModal.setMessage('You must be logged in to participate in the discussion.');
        this.loginModal.showModal();
      }
    },

    loginOrAllowCommentInput: function (view) {
      var self = this;
      if (!this.currentUser) {
        this.loginModal.setMessage('You must be logged in to participate in the discussion.');
        this.loginModal.showModal();
      }
    },

    loginOrShowAddImplementationModal: function () {
      if (this.currentUser) {
        this.addImplementationModal.showModal();
      } else {
        this.loginModal.setMessage('You must be logged in to add an implementation.');
        this.loginModal.showModal();
      }
    },

    loginOrImplementationVote: function (view) {
      if (this.currentUser) {
        if (!view.model.get('voted')) {
          view.handleVote(this.currentUser.get('uuid'));
        }
      } else {
        this.loginModal.setMessage('You must be logged in to vote on implementations.');
        this.loginModal.showModal();
      }
    },

    showCreateModalOnPullProject: function (uuid) {
      var self = this;
      if (this.currentUser) {
        this.lastAddProjectPopupShownForGrab = true;
        this.createProjectModal.resetPopup();
        this.createProjectModal.formatForPullProject(uuid);
        setTimeout(function () {
          self.createProjectModal.showModal();
        }, 10)
      } else {
        this.loginModal.setMessage('You must be logged in to grab a project.');
        this.loginModal.showModal();
      }
    },

    changeHomeFeedType: function (index) {
      this.footerView.changeFeedType(index);
      this.homeView.populateProjectFeed(index);
      this.forceShowHeader();
      this.forceShowFooter();
    },

    addNewProjectBtnClicked: function () {
      var self = this;
      if (this.currentUser) {
        if (this.lastAddProjectPopupShownForGrab) {
          this.lastAddProjectPopupShownForGrab = false;
          this.createProjectModal.resetPopup();
          setTimeout(function () {
            self.createProjectModal.showModal();
          }, 5)
        } else {
          self.createProjectModal.showModal();
        }
      } else {
        this.loginModal.setMessage('You must be logged in to add a project.');
        this.loginModal.showModal();
      }
    },

    notificationsIconClicked: function (e) {
      var self = this;
      e.stopPropagation();
      self.searchView.forceCloseSearchBar();
      self.accountDropdown.$el.hide();
      self.extrasDropdown.$el.hide();
      if (self.footerView) {
        self.footerView.hideDropup();
      }
      Backbone.EventBroker.trigger('hide-more-langs-dropdown');
      if (self.notificationsDropdown.$el.css('display') === 'none') {
        self.handleSeen();
        self.notificationsDropdown.$el.show();
      } else {
        self.notificationsDropdown.$el.hide();
      }
    },

    headerUserPicClicked: function (e) {
      var self = this;
      e.stopPropagation();
      self.searchView.forceCloseSearchBar();
      self.notificationsDropdown.$el.hide();
      Backbone.EventBroker.trigger('hide-more-langs-dropdown');
      self.extrasDropdown.$el.hide();
      if (self.footerView) {
        self.footerView.hideDropup();
      }
      self.accountDropdown.$el.css('display') === 'none' ? self.accountDropdown.$el.show() : self.accountDropdown.$el.hide();
    },

    headerEllipsisClicked: function (e) {
      var self = this;
      e.stopPropagation();
      self.searchView.forceCloseSearchBar();
      self.notificationsDropdown.$el.hide();
      self.accountDropdown.$el.hide();
      Backbone.EventBroker.trigger('hide-more-langs-dropdown');
      if (self.footerView) {
        self.footerView.hideDropup();
      }
      self.extrasDropdown.$el.css('display') === 'none' ? self.extrasDropdown.$el.show() : self.extrasDropdown.$el.hide();
    },

    handleSeen: function () {
      var self = this;
      var unseen = [];

      if (this.notifications) {

        for (var i = 0; i < this.notifications.length; i++) {
          if (!this.notifications[i].seen) {
            this.notifications[i].seen = true;
            unseen.push({
              uuid: this.notifications[i].uuid,
              is_request: this.notifications[i].is_request
            });
          }
        }
        if (unseen.length > 0) {
          this.notificationsDropdown.sawAllNotifications();
          var project = new Project();
          project.sawNotifications({notifications: unseen});
        }
      }

    },

    respondToRequest: function (notificationData, answer) {
      var self = this;
      var project = new Project();
      project.respondToRequest({
        requester_uuid: notificationData.requester_uuid,
        uuid: notificationData.project_uuid,
        pending_request_uuid: notificationData.uuid,
        response: answer
      });
    },

    showLoginModalFromAccountTabClick: function () {
      this.loginModal.setMessage('Go ahead and login!');
      this.loginModal.showModal();
    },

    signOut: function () {
      Backbone.EventBroker.trigger('session:signOut');
      setTimeout(function () {
        window.location.reload();
      }, 5)
    },

    hideHeaderDropdowns: function (hideSearchResults) {
      var self = this;
      this.notificationsDropdown.$el.hide();
      this.accountDropdown.$el.hide();
      this.extrasDropdown.$el.hide();
      if (this.footerView) {
        this.footerView.hideDropup();
      }
      if (hideSearchResults) {
        this.searchView.forceCloseSearchBar();
      }
    },

    captureFilters: function () {
      if (this.showHomeView) {
        this.cachedFilters = this.homeView.filters;
        this.cachedItems = this.footerView.removedValues;
        this.lastFilterType = this.footerView.filterType;
      }
    },

    cachedItemsExist: function () {
      if (!this.cachedItems) {
        return false;
      }

      var self = this;
      var itemsExist = false;

      _.each(['0', '1', '2'], function (key) {
        if (!_.isEmpty(self.cachedItems[key])) {
          itemsExist = true;
        }
      });

      return itemsExist;
    },

    handleLoginWithGHBtnClick: function () {
      this.loginWithGH();
      this.$el.find('#floatingLoginWithGHBtn + .tooltip').hide();
      var $ghLoginBtn = this.$el.find('#floatingLoginWithGHBtn');
      var $loadingContainer = $('<div>', {class: 'gh-login-loading'});
      var $loadingSpinner = $('<div>', {class: 'growing-circle-spinner'});

      $loadingContainer.append($loadingSpinner);
      $ghLoginBtn.after($loadingContainer);
      $ghLoginBtn.hide();
    },

    handleFilterAdded: function (data) {
      var self = this;

      // LANGUAGES/FRAMEWORKS
      if (data.set === OSUtil.LANGS_FILTER_SET) {
        self.langFiltersView.addItem({
          value: data.value,
          animate: data.animate
        });

        // keep setTimeout so that filter animation is smooth
        setTimeout(function () {
          self.homeView.handleNewLangFilter(data);
        }, 250);
      }

      // DOMAINS
      else if (data.set === OSUtil.DOMAIN_FILTER_SET) {
        self.minorFiltersView.addDomainItem(data);

        // keep setTimeout so that filter animation is smooth
        setTimeout(function () {
          self.homeView.handleNewDomainFilter(data);
        }, 250);
      }

      // SEEKING
      else if (data.set === OSUtil.SEEKING_FILTER_SET) {
        self.minorFiltersView.addSeekingItem(data);

        // keep setTimeout so that filter animation is smooth
        setTimeout(function () {
          self.homeView.handleNewSeekingFilter(data);
        }, 250);
      }
    },

    handleFilterRemoved: function (data) {
      var self = this;
      if (data.set === OSUtil.LANGS_FILTER_SET) {
        self.homeView.handleRemoveLangFilter(data);
      } else if (data.set === OSUtil.DOMAIN_FILTER_SET) {
        self.minorFiltersView.removeDomainItem();
        self.homeView.handleRemoveDomainFilter(data);
      } else if (data.set === OSUtil.SEEKING_FILTER_SET) {
        self.minorFiltersView.removeSeekingItem();
        self.homeView.handleRemoveSeekingFilter(data);
      }
    },

    handleMoreFiltersToggle: function (id) {
      if (id === 'privacy') {
        this.minorFiltersView.togglePrivacyFilters();
      }
    },

    hideHeaderDropdownsOnly: function () {
      var self = this;
      self.notificationsDropdown.$el.hide();
      self.accountDropdown.$el.hide();
      self.extrasDropdown.$el.hide();
      Backbone.EventBroker.trigger('hide-more-langs-dropdown');
      self.searchView.forceCloseSearchBar();
    },

    renderHomeView: function (options) {
      var self = this;

      this.forceShowHeader();
      this.forceShowFooter();

      if (this.homeView) {
        this.homeView.$el = this.$el.find('#homeViewContainer');
        this.homeView.resetProps();
      } else {
        this.homeView = new IndexView({
          el: this.$el.find('#homeViewContainer')
        });
      }

      var index = _.has(options, 'index') ? options.index : 0;

      if (this.cachedFilters) {
        this.homeView.passFilters(this.cachedFilters, index);
      }

      this.homeView.render({
        index: index
      });

      this.footerView = this.footerView || new FooterView({
        el: '#mainFooter'
      });

      this.footerView.setFeedStatus(options.index);

      this.footerView.unbind();

      this.listenTo(this.footerView, 'addItem', function (data) {
        self.handleFilterAdded(data);
      });

      this.listenTo(this.footerView, 'removeItem', function (data) {
        self.handleFilterRemoved(data);
      });

      this.listenTo(this.footerView, 'more-filters-toggle', function (id) {
        self.handleMoreFiltersToggle(id);
      });

      this.listenTo(this.footerView, 'hide-header-dropdowns-only', function () {
        self.hideHeaderDropdownsOnly();
      });

      this.footerView.render();

      if (this.cachedItemsExist()) {
        this.footerView.passCachedItems(this.cachedItems);
      }

      if (_.has(this, 'lastFilterType') && this.lastFilterType != null) {
        this.footerView.passFilterType(this.lastFilterType);
      }

      if (!this.currentUser) {
        this.renderLoginWithGHBtn();
      }
    },

    renderProjectView: function (options) {
      var self = this;

      this.forceShowHeader();

      if (this.homeView) {
        this.homeView.removeScrollListener();
      }

      if (this.projectView) {
        this.projectView.$el = this.$el.find('#projectViewContainer');
        this.projectView.reInitialize(options.uuid);
      } else {
        this.projectView = new ProjectView({
          el: this.$el.find('#projectViewContainer'),
          uuid: options.uuid
        });
      }
    },

    renderModals: function () {
      var self = this;

      this.createProjectModal = new CreateProjectModal({
        el: this.$el.find('#modalCreateProject')
      });

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
        self.forceHideModalBackdrop();
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

      this.confirmLaunchProjectModal = new BasicQuestionModal({
        el: this.$el.find('#modalConfirmLaunch'),
        message: 'Are you sure you want to launch this project?'
      });

      this.listenTo(this.confirmLaunchProjectModal, 'confirm', function () {
        self.launchProject();
      });

      this.confirmLaunchProjectModal.render();

      this.myProjectsModal = new MyProjectsModal({
        el: '#modalMyProjects'
      });

      this.myProjectsModal.render();

      this.starredModal = new StarredModal({
        el: '#modalStarred'
      });

      this.starredModal.render();

      this.signOutModal = new BasicQuestionModal({
        el: this.$el.find('#modalSignOut'),
        message: 'Are you sure you want to sign out?'
      });

      this.listenTo(this.signOutModal, 'confirm', function () {
        self.signOut();
      });

      this.signOutModal.render();

      this.aboutModal = new AboutModal({
        el: '#modalAbout'
      });

      this.listenTo(this.aboutModal, 'confirm', function () {
        self.aboutModal.hideModal();
        self.showTutorialIfNeeded();
      });

      this.listenTo(this.aboutModal, 'close-btn:clicked', function () {
        self.showTutorialIfNeeded();

      });

      this.aboutModal.render();

      this.rulesModal = new RulesModal({
        el: '#modalRules'
      });

      this.listenTo(this.rulesModal, 'confirm', function () {
        self.rulesModal.hideModal();
      });

      this.listenTo(this.rulesModal, 'close-rules-open-suggestions', function () {
        self.rulesModal.hideModal();
        setTimeout(function () {
          self.suggestionsModal.showModal();
        }, 150);
      });


      this.rulesModal.render();

      this.suggestionsModal = new SuggestionsModal({
        el: '#modalSuggestions'
      });

      this.suggestionsModal.render();

      this.addImplementationModal = new AddImplementationModal({
        el: '#addImplementationModal'
      });

      this.addImplementationModal.render();

      this.listenTo(this.extrasDropdown, 'item:clicked', function (id) {
        switch (id) {
          case 'about':
            self.aboutModal.showModal();
            break;
          case 'rules':
            self.rulesModal.showModal();
            break;
          case 'suggestions':
            self.suggestionsModal.showModal();
            break;
        }
      });

      _.each([this.aboutModal, this.rulesModal, this.suggestionsModal], function (view) {
        self.listenTo(view, 'close', function () {
          view.hideModal();
          setTimeout(function () {
            view.render();
          }, 300);
        });
      });

      if (this.showAboutModal()) {
        setTimeout(function () {
          $('#tutorialCover').show();
          setTimeout(function () {
            $('#tutorialCover').animate({opacity: 0.3}, 150);
            document.body.style.overflow = 'hidden';
            self.aboutModal.showModal(true);
            self.showingAboutModalForTutorial = true;
          }, 50);
        }, 400);
      }
    },

    showTutorialIfNeeded: function () {
      var self = this;
      if (this.showingAboutModalForTutorial) {
        this.showingAboutModalForTutorial = false;
        setTimeout(function () {
          self.tutorialManager.showNextItem();

          // Fuck the old about modal and it's caching options,
          // just create a new one and overwrite the fucked up one
          self.aboutModal = new AboutModal({
            el: '#modalAbout'
          });

          self.listenTo(self.aboutModal, 'confirm', function () {
            self.aboutModal.hideModal();
          });

          self.aboutModal.render();
        }, 100);
      }
    },

    renderDropdowns: function () {
      var self = this;

      this.notificationsDropdown.$el = this.$el.find('#notificationsDropdown');

      this.listenTo(this.notificationsDropdown, 'accept-request', function (notificationData) {
        self.respondToRequest(notificationData, true);
      });

      this.listenTo(this.notificationsDropdown, 'reject-request', function (notificationData) {
        self.respondToRequest(notificationData, false);
      });

      this.notificationsDropdown.render();

      if (_.has(this, 'notifications') && !this.notificationsDropdown.populated) {
        this.notificationsDropdown.populate(this.notifications);
      }

      this.accountDropdown = new AccountDropdownView({
        el: '#accountDropdown'
      });

      this.listenTo(this.accountDropdown, 'account-tab-clicked', function (id) {
        switch (id) {
          case 'myProjectsTab':
            self.showMyProjectsModal();
            break;
          case 'starredTab':
            self.showStarredModal();
            break;
          case 'signInOutTab':
            self.currentUser ? self.signOutModal.showModal() : self.showLoginModalFromAccountTabClick();
            break;
        }
      });

      this.accountDropdown.render();

      this.extrasDropdown = new ExtrasDropdownView({
        el: '#extrasDropdown'
      });

      this.extrasDropdown.render();
    },

    renderSearchbar: function () {
      this.searchView = new SearchContainerView({
        el: '#mainSearchBar'
      });

      this.searchView.render();
    },

    renderFilters: function () {
      var self = this;

      this.langFiltersView = this.langFiltersView || new LangFiltersView();
      this.langFiltersView.$el = this.$el.find('#langFiltersView');

      this.langFiltersView.render({
        andSelected: (this.cachedFilters || {}).lang_filters_and
      });

      if (this.showHomeView && this.cachedItems) {
        this.langFiltersView.prePopulateFilters(this.cachedItems);
      }

      this.minorFiltersView = this.minorFiltersView || new MinorFiltersView();
      this.minorFiltersView.$el = this.$el.find('#minorFiltersView');

      this.minorFiltersView.render();

      if (this.showHomeView && this.cachedItems) {
        this.minorFiltersView.prePopulateFilters(this.cachedItems);
      }
    },

    positionFooterAndHeaderTutorialBubbles: function () {
      // Position Footer Tutorial Item
      var $footer = $('footer');
      var footerTutorialRight = window.innerWidth - ($footer.offset().left + $footer.width() - $('.more-filters-btn').width() + 3);
      var footerTutorialWidth = $footer.find('.btn-container').width();

      this.$el.find('#footer-tutorial-anchor').css({
        right: footerTutorialRight,
        width: footerTutorialWidth
      });

      // Position Header Tutorial Item
      var $headerBtn = $('#headerAddProjectBtn');
      var headerTutorialRight = window.innerWidth - ($headerBtn.offset().left + $headerBtn.width());
      this.$el.find('#anp-tutorial-anchor').css({
        right: headerTutorialRight,
        width: $headerBtn.width()
      });

      this.$el.find('#login-tutorial-anchor').css({
        right: 20,
        width: 218
      });
    },

    renderLoginWithGHBtn: function () {
      var self = this;
      var $loginWithGHBtn = this.$el.find('#floatingLoginWithGHBtn');
      $loginWithGHBtn.css('display', 'inline-block');

      $loginWithGHBtn.click(function () {
        if (!self.clickedLoginWithGH) {
          self.clickedLoginWithGH = true;
          self.handleLoginWithGHBtnClick();
        }
      });

      var $ghTooltip = this.$el.find('[data-toggle="gh-tooltip"]');

      $ghTooltip.tooltip({
        trigger: 'manual'
      });

      $loginWithGHBtn.hover(function () {
        $ghTooltip.tooltip('show');
      }, function () {
        $ghTooltip.tooltip('hide');
      });
    },

    render: function (options) {
      options = options || {};

      this.showHomeView = (options.view === OSUtil.HOME_PAGE);
      this.showProjectView = (options.view === OSUtil.PROJECT_PAGE);

      this.$el.html(MainViewTpl({
        showHomeView: this.showHomeView,
        showProjectView: this.showProjectView,
        isSafari: $('body').attr('browser') === 'safari'
      }));

      // CREATE FILTERS
      this.renderFilters();

      // CREATE HOME VIEW
      if (this.showHomeView) {
        this.renderHomeView(options);
      }

      // CREATE PROJECT VIEW
      else if (this.showProjectView) {
        this.renderProjectView(options);
      }

      // CREATE DROPDOWNS
      this.renderDropdowns();

      // CREATE SEARCH BAR
      this.renderSearchbar();

      // CREATE MODALS
      this.renderModals();

      this.tutorialManager = new TutorialManager();

      this.positionFooterAndHeaderTutorialBubbles();
    }

  });

  return MainView;

});
