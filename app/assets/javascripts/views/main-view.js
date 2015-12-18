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
        'invite-gh-contributors': 'getAllContributorsForRepo',
        'force-hide-starred-modal': 'forceHideStarredModal',
        'force-hide-my-projects-modal': 'forceHideMyProjectsModal',
        'hide-header-dropdowns': 'hideHeaderDropdowns',
        'add-new-proj-clicked': 'addNewProjectBtnClicked',
        'notifications-icon-clicked': 'notificationsIconClicked',
        'header-ellipsis-clicked': 'headerEllipsisClicked',
        'header-user-pic-clicked': 'headerUserPicClicked',
        'open-project': 'openProject'
      }, this);
      this.userAuthed = false;
      this.cachedFilterType = null;

      this.github = Github;
      this.github.setToken('202171c69b06bbe92b666e1a5e3a9b7981a6fced');

    },

    events: {},

    openProject: function (id) {
      this.cachedRemovedFilterItems = this.footerView.footerDropdown.$removedItems;
      this.cachedFilterType = this.footerView.filterType;
      window.location.hash = '#projects/' + id;
    },

    showMyProjectsModal: function () {
      var self = this;
      this.myProjectsModal.showModal();
      var user = new User();
      user.getMyProjects({user_uuid: self.userData.user_uuid}, {
        success: function (projects) {
          self.myProjectsModal.populate(projects);
        }
      });
    },

    showStarredModal: function () {
      var self = this;
      this.starredModal.showModal();
      var user = new User();
      user.getStarredProjects({user_uuid: self.userData.user_uuid}, {
        success: function (projects) {
          self.starredModal.populate(projects);
        }
      });
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
      project.destroyProject({id: self.projectView.projectID}, {
        success: function () {
          window.location.hash = '#on-the-fence';
          // show tiny success popupchr
        }, error: function () {
          // show an error message
        }
      });
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
        user.getByGHUsername({gh_username: cookieGHUsername}, {
          success: function (user) {
            self.setUserFromResponse(user);
            self.notifications = user.notifications;
            self.notificationsDropdown.populate(user.notifications);
          }
        });
      }
    },

    setUserFromResponse: function (user) {
      this.userData = user;
      this.setUserHeaderPic(user.pic);
      if (this.createProjectModal) {
        this.createProjectModal.passUserData(user);
      }
      if (this.suggestionsModal) {
        this.suggestionsModal.passUserData(user);
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
      var $profPic = $('#header-user-pic');
      $profPic.attr('src', url);
      $profPic.removeClass('top-padding');
    },

    getAllLanguages: function () {
      this.handleAllLanguages(AllLangs.getAll());
    },

    handleAllLanguages: function (data) {
      this.allLangs = data;
      if (this.homeView) {
        this.homeView.passLanguages(data);
        //this.homeView.createLangsFilterDropdown();
      }
      if (this.projectView) {
        this.projectView.passLanguages(data);
      }
      if (this.createProjectModal) {
        this.createProjectModal.passLangData(data);
      }
    },

    addNewProjectBtnClicked: function () {
      var self = this;
      if (self.userAuthed) {
        self.createProjectModal.showModal();
      } else {
        self.loginModal.setMessage('You must be logged in to add a project.');
        self.loginModal.showModal();
      }
    },

    notificationsIconClicked: function (e) {
      var self = this;
      e.stopPropagation();
      self.searchView.forceCloseSearchBar();
      self.accountDropdown.$el.hide();
      self.extrasDropdown.$el.hide();
      self.footerView.hideDropup();
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
        project_uuid: notificationData.project_uuid,
        pending_request_uuid: notificationData.uuid,
        response: answer
      });
    },

    showLoginModalFromAccountTabClick: function () {
      this.loginModal.setMessage('Go ahead and login!');
      this.loginModal.showModal();
    },

    signOut: function () {
      document.cookie = 'gh_username=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      window.location = '/';
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
        if (this.cachedFilters) {
          this.homeView.passFilters(this.cachedFilters);
        }
        this.homeView.render({
          index: options && options.hasOwnProperty('index') ? options.index : 1
        });
      }
      if (this.showProjectView) {
        this.forceShowHeader();
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

      this.accountDropdown = new AccountDropdownView({
        el: '#accountDropdown',
        userAuthed: self.userAuthed
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
            self.userAuthed ? self.signOutModal.showModal() : self.showLoginModalFromAccountTabClick();
            break;
        }
      });

      this.accountDropdown.render();

      this.extrasDropdown = new ExtrasDropdownView({
        el: '#extrasDropdown'
      });

      this.extrasDropdown.render();

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

      if (this.userData) {
        this.suggestionsModal.passUserData(this.userData);
      }

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
        });
      });

      this.langFiltersView = new LangFiltersView({
        el: '#langFiltersView',
        colorsAndInitials: this.allLangs.colors_and_initials
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

      if (this.showHomeView) {

        this.footerView = this.footerView || new FooterView({
            el: '#mainFooter',
            langData: this.allLangs
          });

        this.footerView.unbind();

        this.listenTo(this.footerView, 'addItem', function (data) {

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
        });

        this.listenTo(this.footerView, 'removeItem', function (data) {

          if (data.set === OSUtil.LANGS_FILTER_SET) {
            self.homeView.handleRemoveLangFilter(data);
          } else if (data.set === OSUtil.LICENSE_FILTER_SET) {
            self.minorFiltersView.removeLicenseItem();
            self.homeView.handleRemoveLicenseFilter(data);
          } else if (data.set === OSUtil.CHAT_FILTER_SET) {
            self.minorFiltersView.removeChatItem();
            self.homeView.handleRemoveChatFilter(data);
          }
        });

        this.listenTo(this.footerView, 'more-filters-toggle', function (id) {
          if (id === 'privacy') {
            self.minorFiltersView.togglePrivacyFilters();
          }
        });

        this.listenTo(this.footerView, 'hide-header-dropdowns-only', function () {
          self.notificationsDropdown.$el.hide();
          self.accountDropdown.$el.hide();
          self.extrasDropdown.$el.hide();
          Backbone.EventBroker.trigger('hide-more-langs-dropdown');
          self.searchView.forceCloseSearchBar();
        });

        this.footerView.render();

        if (this.cachedItems) {
          this.footerView.passCachedItems(this.cachedItems);
          this.footerView.passFilterType(this.lastFilterType);
        }

      }

    }

  });

  return MainView;

});
