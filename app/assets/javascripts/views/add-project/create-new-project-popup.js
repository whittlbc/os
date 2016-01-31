define(['jquery',
  'backbone',
  'underscore',
  'views/add-project/select-project-stage-view',
  'views/add-project/select-project-source-view',
  'views/add-project/add-project-details-view',
  'views/add-project/breadcrumb-view',
  'models/project',
  'models/os.util',
  'views/os.view',
  'stache!views/add-project/create-new-project-popup',
  'owl-carousel',
  'backbone-eventbroker'
], function ($,
   Backbone,
   _,
   SelectProjectTypeView,
   SelectProjectSourceView,
   AddProjectDetailsView,
   BreadCrumbView,
   Project,
   OSUtil,
   OSView,
   IndexViewTpl) {
  'use strict';

  var CreateNewProjectPopup = OSView.extend({

    postInitialize: function () {

      Backbone.EventBroker.register({
        'title:updated': 'handleTitleUpdate',
        'subtitle:updated': 'handleSubtitleUpdate',
        'description:updated': 'handleDescriptionUpdate',
        'langsFrames:updated': 'handleLangsFramesUpdate',
        'repoName:updated': 'handleRepoNameUpdate',
        'send-invites:updated': 'handleSendInvitesUpdate',
        'license:updated': 'handleLicenseUpdate',
        'privacy:updated': 'handlePrivacyUpdate',
        'slackURL:updated': 'handleSlackURLUpdate',
        'slackAPIKey:updated': 'handleSlackAPIKeyUpdate',
        'hipChat:updated': 'handleHipChatUpdate',
        'irc:updated': 'handleIRCUpdate',
        'create-project:retry': 'handleRetry',
        'all-user-repos:response': 'handleUserRepos'
      }, this);

      this.popupContainerHeight = 410;
      this.popupHeight = this.popupContainerHeight - 50;
      this.bottomNavDuration = 200;
      this.repos = null;

      this.slideIndex = 0;

      this.stepInfo = {
        stage: null,
        source: null,
        ufg: null
      };

      this.panelMap = {
        'stage-panel': 0,
        'source-panel': 1,
        'data-panel': 2
      };
    },

    stageIsIdea: function () {
      return this.stepInfo.stage === OSUtil.PROJECT_TYPES[0];
    },

    getSelectedSource: function () {
      //var selectedType = this.masterMap['selectedType'];
      //if (selectedType == null) {
      //  return null;
      //}
      //var typeObj = this.masterMap[selectedType];
      //if (typeObj == null) {
      //  return null;
      //}
      //var selectedSource = typeObj['selectedSource'];
      //return (selectedSource != null) ? selectedSource : null;
    },

    getSelectedSourceObj: function () {
      //var selectedType = this.masterMap['selectedType'];
      //if (selectedType == null) {
      //  return null;
      //}
      //var typeObj = this.masterMap[selectedType];
      //if (typeObj == null) {
      //  return null;
      //}
      //var selectedSource = typeObj['selectedSource'];
      //if (selectedSource == null) {
      //  return null;
      //}
      //return typeObj[selectedSource];
    },

    handleTitleUpdate: function (title) {
      var sourceObj = this.getSelectedSourceObj();
      if (sourceObj != null) {
        sourceObj['title'] = title;
      }
    },

    handleSubtitleUpdate: function (subtitle) {
      var sourceObj = this.getSelectedSourceObj();
      if (sourceObj != null) {
        sourceObj['subtitle'] = subtitle;
      }
    },

    handleDescriptionUpdate: function (description) {
      var sourceObj = this.getSelectedSourceObj();
      if (sourceObj != null) {
        sourceObj['description'] = description;
      }
    },

    handleLangsFramesUpdate: function (langsFrames) {
      var sourceObj = this.getSelectedSourceObj();
      if (sourceObj != null) {
        sourceObj['langsFrames'] = langsFrames;
      }
    },

    handleRepoNameUpdate: function (repoName) {
      var sourceObj = this.getSelectedSourceObj();
      if (sourceObj != null) {
        sourceObj['repoName'] = repoName;
      }
    },

    handleSendInvitesUpdate: function (sendInvites) {
      var sourceObj = this.getSelectedSourceObj();
      if (sourceObj != null) {
        sourceObj['sendInvites'] = sendInvites;
      }
    },

    handleLicenseUpdate: function (license) {
      var sourceObj = this.getSelectedSourceObj();
      if (sourceObj != null) {
        sourceObj['license'] = license;
      }
    },

    handlePrivacyUpdate: function (privacy) {
      var sourceObj = this.getSelectedSourceObj();
      if (sourceObj != null) {
        sourceObj['privacy'] = privacy;
      }
    },

    handleSlackURLUpdate: function (slackURL) {
      var sourceObj = this.getSelectedSourceObj();
      if (sourceObj != null) {
        sourceObj['slackURL'] = slackURL;
      }
    },

    handleSlackAPIKeyUpdate: function (slackAPIKey) {
      var sourceObj = this.getSelectedSourceObj();
      if (sourceObj != null) {
        sourceObj['slackAPIKey'] = slackAPIKey;
      }
    },

    handleHipChatUpdate: function (hipChatURL) {
      var sourceObj = this.getSelectedSourceObj();
      if (sourceObj != null) {
        sourceObj['hipChatURL'] = hipChatURL;
      }
    },

    handleIRCUpdate: function (ircObj) {
      var sourceObj = this.getSelectedSourceObj();
      if (sourceObj != null) {
        sourceObj['irc'] = ircObj;
      }
    },

    events: {
      'click .bottom-nav-back': 'handleBack',
      'click .bottom-nav-next': 'handleNext',
      'click .bottom-nav-create-btn': 'handleCreate'
    },

    handleRetry: function () {
      this.bypassDoubleClickRequirement = true;
      this.handleCreate();
    },

    handleCreate: function () {
      var self = this;

      // Someone clicked 'Retry'. fuck everything else and keep going
      if (this.bypassDoubleClickRequirement) {
        this.createProject();
        return;
      }

      if (this.panel3.detailsView.allowCreate()) {
        this.createBtnClickCount++;
        if (this.createBtnClickCount == 2) {
          this.createProject();
        } else {
          this.showSlideOutConfirmCreateMessage();
        }
      }
    },

    createProject: function () {
      var self = this;
      this.createBtnClickCount = 0;

      this.hideSlideOutConfirmCreateMessage();

      this.hideFooter();

      this.newProjectData = this.panel3.detailsView.getData();

      this.renderBreadCrumbView(true);

      this.panel3.render({ showCreatingProjectView: true });

      var newProjectStatus = OSUtil.PROJECT_TYPES.indexOf(this.panel1.selectedStage);

      var projectData = {
        user_uuid: this.currentUser.get('uuid'),
        title: this.newProjectData.title,
        subtitle: this.newProjectData.subtitle,
        repo_name: this.newProjectData.repoName,
        description: this.newProjectData.description,
        langs_and_frames: this.newProjectData.langsFrames,
        domains: this.newProjectData.domains,
        seeking: this.newProjectData.seeking,
        license: this.newProjectData.license,
        status: newProjectStatus,
        privacy: this.newProjectData.privacy,
        slackURL: this.newProjectData.slackURL,
        hipChatURL: this.newProjectData.hipChatURL,
        irc: this.newProjectData.irc,
        up_for_grabs: newProjectStatus == 0 && this.panel2.upForGrabs === true
      };

      this.disableAddProjectBtn();

      var project = new Project();
      project.create(projectData, {
        success: function (project) {
          setTimeout(function () {
            self.showProjectCreationSuccess(project.uuid);
          }, 1000);
        }, error: function () {
          self.showProjectCreationError();
        }
      });
    },

    showSlideOutConfirmCreateMessage: function () {
      this.$el.find('.bottom-nav-create-btn').html('Yes');
      var $confirmMessage = this.$el.find('.create-project-confirm-message');
      $confirmMessage.show();
      $confirmMessage.animate({opacity: 1}, 250);
    },

    hideSlideOutConfirmCreateMessage: function () {
      this.$el.find('.bottom-nav-create-btn').html('Create');
      this.createBtnClickCount = 0;
      var $confirmMessage = this.$el.find('.create-project-confirm-message');
      $confirmMessage.hide();
      $confirmMessage.css('opacity', 0);
    },

    showProjectCreationSuccess: function (newProjectUUID) {
      var self = this;

      Backbone.EventBroker.trigger('create-project-modal:hide');

      if (self.newProjectData.sendInvites === true) {
        Backbone.EventBroker.trigger('invite-gh-contributors', newProjectUUID);
      }

      OSUtil.navToProject(newProjectUUID);

      setTimeout(function () {
        self.resetPopup();
      }, 200);
    },

    showProjectCreationError: function () {
      var self = this;
      setTimeout(function () {
        self.enableAddProjectBtn();
        self.renderBreadCrumbView();
        self.hideCreateBtn();
        self.showFooter();
        self.panel3.render({showProjectCreationError: true});
      }, 500);
    },

    resetPopup: function () {
      this.toggleBottomNav(0, 0);
      this.hideCreateBtn();
      this.owl.jumpTo(0);
      this.slideIndex = 0;
      this.showFooter();
      this.enableAddProjectBtn();
      this.resetMasterMap(this.masterMap);
      this.panel1.setUpForGrabsToggle(false);
      this.panel1.setOnlyOnTheFenceToggle(false);
      this.renderPanels(true);
      this.renderBreadCrumbView();
      this.handleUserRepos(this.repos);
    },

    inactivateOldUpForGrabsProject: function () {
      var projectUUID = this.panel3.getOldPullFromIdeasUUID();
      if (projectUUID) {
        var project = new Project();
        project.pullProject({uuid: projectUUID});
      }
    },

    showFooter: function () {
      this.$el.find('.modal-footer > .bottom-nav-back').show();
      this.$el.find('.modal-footer > .bottom-nav-create-btn').show();
    },

    hideFooter: function () {
      this.$el.find('.modal-footer > .bottom-nav-back').hide();
      this.$el.find('.modal-footer > .bottom-nav-create-btn').hide();
    },

    disableAddProjectBtn: function () {
      $('#addNewProject')[0].style.pointerEvents = 'none';
    },

    enableAddProjectBtn: function () {
      $('#addNewProject')[0].style.pointerEvents = 'auto';
    },

    handleBack: function () {
      if (this.slideIndex > 0 && this.checkIfBackBtnShown()) {
        this.owl.goTo(this.slideIndex - 1);
        this.slideIndex--;
        this.toggleBottomNav(this.getBackBtnOpacity(), 1);
        this.hideCreateBtn();
        this.renderBreadCrumbView();
      }
    },

    handleNext: function () {
      var numSlides = this.$el.find('#popup-owl > .owl-wrapper-outer > .owl-wrapper').children().length;
      if (this.slideIndex < (numSlides - 1) && this.checkIfNextBtnShown()) {
        if (this.slideIndex == numSlides - 2) {
          this.hideErrorViewIfShown();
        }
        this.owl.goTo(this.slideIndex + 1);
        this.toggleBottomNav(1, this.getNextBtnOpacity());
        this.slideIndex++;
        this.checkIfNeedToShowCreateBtn();
        this.renderBreadCrumbView();
      }
    },

    hideErrorViewIfShown: function () {
      var self = this;
      if (this.panel3.projectCreationErrorShown) {
        var source = this.getSelectedSource();
        var options = {
          selectedSource: source,
          projectData: this.getSelectedSourceObj()
        };
        if (source == this.source1 && this.repos == null) {
          options.showReposLoadingView = true;
          this.getGHRepos();
        }
        this.panel3.render(options);
      }
    },

    checkIfBackBtnShown: function () {
      return this.$el.find('.bottom-nav-back').css('opacity') == 1;
    },

    checkIfNextBtnShown: function () {
      return this.$el.find('.bottom-nav-next').css('opacity') == 1;
    },

    checkIfNeedToShowCreateBtn: function () {
      var numSlides = this.$el.find('#popup-owl > .owl-wrapper-outer > .owl-wrapper').children().length;
      if (this.slideIndex == numSlides - 1) {
        this.showCreateBtn();
      }
    },

    setSizeForPopup: function () {
      this.$el.find('#createNewProjectModalBody').height(this.popupContainerHeight);
      this.$popup.height(this.popupHeight);
      this.panel1.$el.height(this.popupHeight);
      this.panel1.setHeight(this.popupHeight);
      this.panel2.$el.height(this.popupHeight);
      this.panel2.setHeight(this.popupHeight);
      this.panel3.$el.height(this.popupContainerHeight);
    },

    checkIfProjectSourceSelected: function () {
      return this.stageIsIdea() ? (this.stepInfo.ufg != null) : !!this.stepInfo.source
    },


    handleStageSelected: function (stage) {
      this.stepInfo.stage = stage;

      this.panel3.passStage(stage);

      this.panel2.render({ selectedStage: stage });

      this.breadCrumbView.setStep2Text(this.stageIsIdea() ? 'Up for Grabs' : 'Source');

      this.slideIndex = 1;

      this.owl.goTo(this.slideIndex);

      this.toggleBottomNav(1, this.checkIfProjectSourceSelected());

      this.renderBreadCrumbView();
    },

    handleSourceSelected: function (source) {
      this.stepInfo.source = source;

      var options = { selectedSource: source };

      if (source == OSUtil.SOURCE_TYPES[0] && this.repos == null) {
        options.showReposLoadingView = true;
        this.getGHRepos();
      }

      this.continueWithPanel2Selection(options);
    },

    handleUFGSelected: function (bool) {
      this.stepInfo.ufg = bool;

      this.continueWithPanel2Selection({
        upForGrabs: bool
      });
    },

    continueWithPanel2Selection: function (options) {
      this.panel3.render(options);

      this.slideIndex = 2;

      this.owl.goTo(this.slideIndex);

      this.toggleBottomNav(1, 0);

      this.showCreateBtn();

      this.renderBreadCrumbView();
    },

    showCreateBtn: function () {
      this.createBtnClickCount = 0;
      var $createBtn = this.$el.find('.bottom-nav-create-btn');
      var $nextBtn = this.$el.find('.bottom-nav-next');
      $nextBtn.animate({opacity: 0}, {duration: 0, queue: false});
      $nextBtn.hide();
      $createBtn.animate({opacity: 1}, {duration: this.bottomNavDuration, queue: false});
      $createBtn.show();
    },

    hideCreateBtn: function () {
      this.createBtnClickCount = 0;
      var $createBtn = this.$el.find('.bottom-nav-create-btn');
      $createBtn.animate({opacity: 0}, {duration: 0, queue: false});
      $createBtn.hide();
    },

    toggleBottomNav: function (backOpacity, nextOpacity) {
      var $backBtn = this.$el.find('.bottom-nav-back');
      var $nextBtn = this.$el.find('.bottom-nav-next');
      var numSlides = this.$el.find('#popup-owl > .owl-wrapper-outer > .owl-wrapper').children().length;
      $backBtn.animate({opacity: backOpacity}, {
        duration: ((backOpacity == 0) ? 0 : this.bottomNavDuration),
        queue: false
      });
      $nextBtn.animate({opacity: nextOpacity}, {
        duration: ((nextOpacity == 0 || this.slideIndex == numSlides - 2) ? 0 : this.bottomNavDuration),
        queue: false
      });
      backOpacity == 0 ? $backBtn.hide() : $backBtn.show();
      nextOpacity == 0 ? $nextBtn.hide() : $nextBtn.show();
    },

    getGHRepos: function () {
      Backbone.EventBroker.trigger('all-user-repos:request');
    },

    handleUserRepos: function (repoNamesArray) {
      var self = this;

      setTimeout(function () {
        self.repos = repoNamesArray;
        self.panel3.passUserRepos(self.repos);
      }, 500);
    },

    addPanelListeners: function () {
      var self = this;

      this.listenTo(this.panel1, 'stage:selected', function (stage) {
        self.handleStageSelected(stage);
      });

      this.listenTo(this.panel2, 'source:selected', function (source) {
        self.handleSourceSelected(source);
      });

      this.listenTo(this.panel2, 'ufg:selected', function (ufg) {
        self.handleUFGSelected(ufg);
      });

      this.listenTo(this.panel3, 'repo:getDetails', function (name) {
        self.getRepoDetails(name);
      });
    },

    getBackBtnOpacity: function () {
      return this.slideIndex == 0 ? 0 : 1;
    },

    getNextBtnOpacity: function () {
      return (this.slideIndex == 0 && !!this.checkIfProjectSourceSelected()) ? 1 : 0;
    },

    getRepoDetails: function (repoName) {
      var self = this;
      this.currentUser.getRepoDetails({ repo_name: repoName }, {
        success: function (data) {
          self.handleRepoDetails(data);
        }
      });
    },

    handleRepoDetails: function (data) {
      this.panel3.passRepoInfo(data);
    },

    passTags: function (data) {
      var self = this;
      this.tags = data;
      this.panel3.passTags(data);
    },

    hideModalFooterTopBorder: function () {
      this.$el.find('.fake-top-border').hide();
    },

    showModalFooterTopBorder: function () {
      this.$el.find('.fake-top-border').show();
    },

    handleBreadCrumbNav: function (id) {
      var self = this;
      var numSlides = this.$el.find('#popup-owl > .owl-wrapper-outer > .owl-wrapper').children().length;
      self.renderBreadCrumbView();
      var indexEnd = self.panelMap[id];
      if (indexEnd == self.slideIndex) {
        return;
      } else if (indexEnd > self.slideIndex) {
        // FORWARD
        self.toggleBottomNav(1, self.getNextBtnOpacity());
        self.slideIndex = indexEnd;
        self.checkIfNeedToShowCreateBtn();
        if (self.slideIndex == numSlides - 1) {
          self.hideErrorViewIfShown();
        }
      } else if (indexEnd < self.slideIndex) {
        // BACK
        self.slideIndex = indexEnd;
        self.toggleBottomNav(self.getBackBtnOpacity(), 1);
        self.hideCreateBtn();
      }
      self.renderBreadCrumbView();
      self.owl.goTo(indexEnd);
    },

    listenToConfirmCancel: function () {
      var self = this;
      this.$el.find('.create-project-confirm-message > .fa-times-circle').click(function () {
        self.hideSlideOutConfirmCreateMessage();
      });
    },

    renderBreadCrumbView: function (creatingProject) {
      this.breadCrumbView.render({
        breadCrumb1Clickable: !!this.stepInfo.stage,
        breadCrumb2Clickable: !!this.stepInfo.stage,
        breadCrumb3Clickable: this.checkIfProjectSourceSelected(),
        breadCrumb1Done: !!this.stepInfo.stage,
        breadCrumb2Done: !!this.stepInfo.stage && !!this.stepInfo.source,
        breadCrumb3Done: creatingProject, // set this later once you have data to use,
        breadCrumb1Current: this.slideIndex == 0,
        breadCrumb2Current: this.slideIndex == 1,
        breadCrumb3Current: this.slideIndex == 2
      });
    },

    renderPanels: function (ignoreListeners) {
      this.panel1 = new SelectProjectTypeView({
        el: '#newProjectPanel1'
      });
      this.panel1.render();

      this.panel2 = new SelectProjectSourceView({
        el: '#newProjectPanel2'
      });
      this.panel2.render();

      this.panel3 = new AddProjectDetailsView({
        el: '#newProjectPanel3'
      });

      this.panel3.render();

      this.setSizeForPopup();

      if (!ignoreListeners) {
        this.addPanelListeners();
      }
    },

    renderPopup: function () {

      this.$popup = this.$el.find('#popup-owl');

      this.$popup.owlCarousel({
        autoPlay: false,
        rewindNav: false,
        autoHeight: false,
        slideSpeed: 400,
        paginationSpeed: 400,
        items: 1,
        itemsDesktopSmall: [1199, 1],
        itemsTablet: [977, 1],
        mouseDrag: false,
        navigation: false,
        pagination: false,
        navigationText: false
      });

      this.owl = this.$popup.data('owlCarousel');
    },

    render: function () {
      var self = this;

      this.$el.html(IndexViewTpl());

      this.renderPopup();

      this.breadCrumbView = new BreadCrumbView({
        el: this.$el.find('#createProjectBreadCrumbView')
      });

      this.listenTo(this.breadCrumbView, 'breadCrumbNav', function (id) {
        self.handleBreadCrumbNav(id);
      });

      this.renderBreadCrumbView();

      this.renderPanels();

      this.listenToConfirmCancel();
    }
  });

  return CreateNewProjectPopup;

});
