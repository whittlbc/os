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
  'sifter.min',
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
  'views/footer/footer-view',
  'views/filters/lang-filters-view',
  'views/filters/minor-filters-view',
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
   Sifter,
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
   FooterView,
   LangFiltersView,
   MinorFiltersView,
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
        'project:major-action-btn-clicked': 'majorProjectActionBtnClickOrLogin'
      }, this);

      this.cachedFilterType = null;
      this.lastAddProjectPopupShownForGrab = false;
    },

    events: {},

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

    majorProjectActionBtnClickOrLogin: function (data) {
      if (this.currentUser) {
        data.view.handleProjectMajorActionBtnClick();
      } else {
        var loginModalText;

        switch (data.status) {
          case 0:
            loginModalText = 'You must be logged in to grab a project.';
            break;
          case 1:
            loginModalText = 'You must be logged in to join a project.';
            break;
          case 2:
            loginModalText = 'You must be logged in to join a project.';
            break;
        }

        this.loginModal.setMessage(loginModalText);
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

    openProject: function (uuid) {
      this.cachedRemovedFilterItems = this.footerView.footerDropdown.$removedItems;
      this.cachedFilterType = this.footerView.filterType;
      window.location.hash = '#projects/' + uuid;
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

    forceShowHeader: function () {
      $('header').removeClass('header-nav-up').addClass('header-nav-down');
    },

    forceHideStarredModal: function (id) {
      this.starredModal.hideModal();
      this.switchToProjectAndHideModal(id);
    },

    forceHideMyProjectsModal: function (id) {
      this.myProjectsModal.hideModal();
      this.switchToProjectAndHideModal(id);
    },

    switchToProjectAndHideModal: function (id) {
      window.location.hash = '#projects/' + id;
      this.forceHideModalBackdrop();

    },

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
          self.projectView.handleFetchedComments(comments);
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
          window.location.hash = '#on-the-fence';
          // show tiny success popupchr
        }, error: function () {
          // show an error message
        }
      });
    },

    handleStarProject: function (bool) {
      this.currentUser.star({
        project_uuid: Number(this.projectView.projectUUID),
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
      var self = this;
      if (this.projectView && this.projectView.contributors) {
        this.contribsModal.setAnonStatus(this.projectView.data.project.anon); // jesus christ
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
      if (this.currentUser) {
        if (!data.view.voted) {
          data.view.handleVote();
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

    showCreateModalOnPullProject: function (id) {
      var self = this;
      if (this.currentUser) {
        this.lastAddProjectPopupShownForGrab = true;
        this.createProjectModal.resetPopup();
        this.createProjectModal.formatForPullProject(id);
        setTimeout(function () {
          self.createProjectModal.showModal();
        }, 10)
      } else {
        this.loginModal.setMessage('You must be logged in to grab a project.');
        this.loginModal.showModal();
      }
    },

    changeHomeFeedType: function (index) {
      this.homeView.populateProjectFeed(index);
    },

    addNewProjectBtnClicked: function () {
      var self = this;
      console.log('addNewProjectBtnClicked', this.currentUser);
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

    prePopulateFilters: function () {
      var self = this;
      this.footerView.preventAddListener = true;

      if (this.cachedFilterType != null) {
        this.footerView.filterType = this.cachedFilterType;
        this.footerView.forceSetFilter();
        this.footerView.resetDropdown(this.cachedFilterType);
      }

      var filters = this.homeView.filters.filters;
      if (filters.langs_and_frames) {
        for (var i = 0; i < filters.langs_and_frames.length; i++) {
          this.langFiltersView.addItem({value: filters.langs_and_frames[i], animate: false});
        }
        this.footerView.footerDropdown.addItems(filters.langs_and_frames);
      }
      if (filters.license) {
        for (var j = 0; j < filters.license.length; j++) {
          this.licenseFiltersView.addItem({value: filters.license[j], animate: false});
        }
      }
      this.footerView.footerDropdown.$removedItems = this.cachedRemovedFilterItems;
      this.footerView.preventAddListener = false;
    },

    captureFilters: function () {
      var self = this;
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
        }, 200);
      }

      // LICENSES
      else if (data.set === OSUtil.LICENSE_FILTER_SET) {
        self.minorFiltersView.addLicenseItem(data);

        // keep setTimeout so that filter animation is smooth
        setTimeout(function () {
          self.homeView.handleNewLicenseFilter(data);
        }, 200);
      }

      // CHAT
      else if (data.set === OSUtil.CHAT_FILTER_SET) {
        self.minorFiltersView.addChatItem(data);

        // keep setTimeout so that filter animation is smooth
        setTimeout(function () {
          self.homeView.handleNewChatFilter(data);
        }, 200);
      }
    },

    handleFilterRemoved: function (data) {
      var self = this;
      if (data.set === OSUtil.LANGS_FILTER_SET) {
        self.homeView.handleRemoveLangFilter(data);
      } else if (data.set === OSUtil.LICENSE_FILTER_SET) {
        self.minorFiltersView.removeLicenseItem();
        self.homeView.handleRemoveLicenseFilter(data);
      } else if (data.set === OSUtil.CHAT_FILTER_SET) {
        self.minorFiltersView.removeChatItem();
        self.homeView.handleRemoveChatFilter(data);
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

      if (this.homeView) {
        this.homeView.$el = this.$el.find('#homeViewContainer');
        this.homeView.resetProps();
      } else {
        this.homeView = new IndexView({
          el: this.$el.find('#homeViewContainer')
        });
      }
      this.listenTo(this.homeView, 'languages:all');

      if (this.cachedFilters) {
        this.homeView.passFilters(this.cachedFilters);
      }

      this.homeView.render({
        index: _.has(options, 'index') ? options.index : 1
      });

      this.footerView = this.footerView || new FooterView({
        el: '#mainFooter'
      });

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

      this.aboutModal.render();

      this.rulesModal = new RulesModal({
        el: '#modalRules'
      });

      this.rulesModal.render();

      this.suggestionsModal = new SuggestionsModal({
        el: '#modalSuggestions'
      });

      this.suggestionsModal.render();

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

      this.langFiltersView = new LangFiltersView({
        el: '#langFiltersView'
      });

      this.langFiltersView.render({
        orSelected: (this.cachedFilters || {}).lang_filters_or
      });

      if (this.showHomeView && this.cachedItems) {
        this.langFiltersView.prePopulateFilters(this.cachedItems);
      }

      this.minorFiltersView = new MinorFiltersView({
        el: '#minorFiltersView'
      });

      this.minorFiltersView.render();

      if (this.showHomeView && this.cachedItems) {
        this.minorFiltersView.prePopulateFilters(this.cachedItems);
      }
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
        showProjectView: this.showProjectView
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
    }

  });

  return MainView;

});
