define(['jquery',
  'backbone',
  'underscore',
  'views/add-project/repo-list-view',
  'views/add-project/details-view',
  'views/add-project/creating-project-view',
  'models/os.util',
  'models/project',
  'views/add-project/project-creation-error-view',
  'views/add-project/pull-from-ideas-view',
  'stache!views/add-project/add-project-details-view'
], function ($,
             Backbone,
             _,
             RepoListView,
             DetailsView,
             CreatingProjectView,
             OSUtil,
             Project,
             ProjectCreationErrorView,
             PullFromIdeasView,
             AddProjectDetailsViewTpl) {
  'use strict';

  var AddProjectDetailsView = Backbone.View.extend({

    initialize: function () {
      this.langsFramesValue = [];
    },

    events: {},

    passUserRepos: function (repos) {
      this.repos = repos;
      this.repoListView.passUserRepos(repos);
      this.repoListView.hideReposLoadingView();
      this.populateUIRepoList();
    },

    populateUIRepoList: function () {
      this.repoListView.showRepoMessage();
      this.repoListView.populate();
    },

    setHeight: function (height) {
    },

    nullifySelectedRepo: function () {
      if (this.repoListView) {
        this.repoListView.nullifySelectedRepo();
      }
    },

    passTags: function (data) {
      this.tags = data;
    },

    passRepoInfo: function (data) {
      this.repoData = data;
      this.detailsView.resetInfo();
      this.detailsView.setRepoInfo(data);
    },

    passStage: function (stage) {
      this.selectedStage = stage;
    },

    scrollToDetailsView: function (repos, duration) {
      var self = this;
      var $scrollContainer = this.$el.find('.add-project-details-scroll-container');
      var viewHeight = repos ? this.repoListView.$el.height() : this.pullFromIdeasView.$el.height();
      if (duration == 0) {
        $scrollContainer.scrollTop(viewHeight + 15);
      } else {
        $scrollContainer.animate({scrollTop: viewHeight + 15}, {
          duration: duration,
          specialEasing: 'easeInOutCubic'
        });
      }
    },

    allowCreate: function () {
      var self = this;
    },

    showCreatingProjectView: function () {
      this.creatingProjectView.show();
    },

    getOldPullFromIdeasUUID: function () {
      return this.oldPullFromIdeasUUID;
    },

    addClickToBlurListeners: function () {
      var self = this;

      this.$el.find('.add-project-details-view').click(function () {
        if (self.detailsView) {
          self.detailsView.blurAllInputs();
        }
      });
    },

    scrollToBottomOfDetailsView: function () {
      var self = this;

      setTimeout(function () {
        var $container = self.$el.find('.add-project-details-scroll-container');
        $container.scrollTop($container[0].scrollHeight);
      }, 50);
    },

    scrollToError: function () {
      var $scrollContainer = this.$el.find('.add-project-details-scroll-container');
      var top = this.$el.find('.enter-details-message').offset().top;
      $scrollContainer.animate({ scrollTop: top }, { duration: 500 });
    },

    renderDetailsView: function (options) {
      var self = this;

      this.detailsView = this.detailsView || new DetailsView();
      this.detailsView.$el = this.$el.find('#detailsView');

      this.listenTo(this.detailsView, 'scroll:bottom', function () {
        self.scrollToBottomOfDetailsView();
      });

      this.listenTo(this.detailsView, 'scroll-to-error', function () {
        self.scrollToError();
      });

      if (this.selectedStage) {
        this.detailsView.passStage(this.selectedStage);
      }

      if (this.tags) {
        this.detailsView.passTags(this.tags);
      }

      // ensure details view is hidden when loading repos
      options.hideDetailsView = options.showReposLoadingView;

      if (!options.showCreatingProjectView && !options.showProjectCreationError) {
        this.detailsView.render(options);
      }
    },

    handleRepoSelected: function (name) {
      var self = this;

      this.trigger('repo:getDetails', name);
      this.detailsView.render({ hideDetailsView: false });
      this.detailsView.showReposLoadingView();
      setTimeout(function () {
        self.scrollToDetailsView(true, 500);
      }, 10);
    },

    renderRepoList: function (options) {
      var self = this;

      this.repoListView = this.repoListView || new RepoListView();

      this.repoListView.$el = this.$el.find('#reposView');

      this.listenTo(this.repoListView, 'repo:selected', function (repoName) {
        self.trigger('show-create-btn');
        self.handleRepoSelected(repoName);
      });

      if (this.repos) {
        this.repoListView.passUserRepos(this.repos);
      }

      this.repoListView.render({
        showReposLoadingView: options.showReposLoadingView
      });

      if (this.repos && this.selectedSource == OSUtil.SOURCE_TYPES[0]) {
        this.populateUIRepoList();
      }
    },

    renderCreatingProject: function () {
      this.creatingProjectView = new CreatingProjectView({
        el: this.$el.find('#creatingProjectView')
      });
      this.creatingProjectView.setMessage('Creating project...');
      this.creatingProjectView.render();
    },

    renderErrorView: function () {
      this.projectCreationErrorView  = true;
      this.projectCreationErrorView = new ProjectCreationErrorView({
        el: this.$el.find('#projectCreationError')
      });
      this.projectCreationErrorView.render();
    },

    render: function (options) {
      var self = this;
      options = options || {};

      if (options.selectedSource) {
        this.selectedSource = options.selectedSource;
      }

      this.$el.html(AddProjectDetailsViewTpl({
        showReposView: this.selectedStage == OSUtil.PROJECT_TYPES[1] && this.selectedSource == OSUtil.SOURCE_TYPES[0],
        showCreatingProjectView: options.showCreatingProjectView,
        showProjectCreationError: options.showProjectCreationError,
        isSafari: $('body').attr('browser') === 'safari'
      }));

      this.renderDetailsView(options);

      this.renderRepoList(options);

      if (options.showCreatingProjectView) {
        this.renderCreatingProject();
      }

      if (options.showProjectCreationError) {
        this.renderErrorView();
      }

      this.addClickToBlurListeners();

      $('[data-toggle="tooltip"]').tooltip();
    }
  });

  return AddProjectDetailsView;

});
