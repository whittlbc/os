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

    passTags: function (data) {
      this.tags = data;
    },

    passRepoInfo: function (data) {
      this.repoData = data;
      this.detailsView.resetInfo();
      this.detailsView.setRepoInfo(data);
    },

    passType: function (type) {
      this.selectedType = type;
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

    autoSelectUpForGrabsProject: function (projectID) {
      var self = this;
      this.oldPullFromIdeasID = projectID;
      var project = new Project();
      project.getUpForGrabsDetails({id: projectID}, {
        success: function (data) {
          var options = {
            hideDetailsView: false,
            projectData: data
          };
          self.detailsView.render(options);
          setTimeout(function () {
            self.scrollToDetailsView(false, 0);
          }, 150);
        }
      });
    },

    allowCreate: function () {
      var self = this;
    },

    showCreatingProjectView: function () {
      this.creatingProjectView.show();
    },

    getOldPullFromIdeasID: function () {
      return this.oldPullFromIdeasID;
    },

    addClickToBlurListeners: function () {
      var self = this;

      this.$el.find('.add-project-details-view').click(function () {
        if (self.detailsView) {
          self.detailsView.blurAllInputs();
        }
      });
    },

    render: function (options) {
      var self = this;
      var showCreatingProjectView = false;
      var showProjectCreationError = false;
      var showPullFromIdeasView = false;
      if (options && options.selectedSource == OSUtil.SOURCE_MAP['gh'] && selectedRepo == null) {
        options.hideDetailsView = (this.selectedSource == options.selectedSource) ? false : true;
      }

      if (options && options.selectedSource == OSUtil.SOURCE_MAP['pull-from-ideas']) {
        options.hideDetailsView = true;
        showPullFromIdeasView = true;
      }

      if (options && options.selectedSource) {
        this.selectedSource = options.selectedSource;
      }

      if (options && options.showCreatingProjectView) {
        showCreatingProjectView = true;
      }

      if (options && options.showProjectCreationError) {
        showProjectCreationError = true;
      }

      var selectedRepo = null;
      if (this.selectedSource == OSUtil.SOURCE_MAP['gh'] && this.repoListView) {
        selectedRepo = this.repoListView.getSelectedRepo();
      }

      this.$el.html(AddProjectDetailsViewTpl({
        showReposView: this.selectedSource == OSUtil.SOURCE_MAP['gh'],
        showPullFromIdeasView: showPullFromIdeasView,
        showCreatingProjectView: showCreatingProjectView,
        showProjectCreationError: showProjectCreationError
      }));

      this.detailsView = new DetailsView({
        el: '#detailsView'
      });

      this.listenTo(this.detailsView, 'scroll:bottom', function () {
        setTimeout(function () {
          var $container = self.$el.find('.add-project-details-scroll-container');
          $container.scrollTop($container[0].scrollHeight);
        }, 50);
      });

      if (this.selectedType) {
        this.detailsView.passType(this.selectedType);
      }

      if (this.tags) {
        this.detailsView.passTags(this.tags);
      }

      if (!showCreatingProjectView && !showProjectCreationError) {
        this.detailsView.render(options);
      }

      this.repoListView = new RepoListView({
        el: '#reposView'
      });
      this.listenTo(this.repoListView, 'repo:selected', function (name) {
        self.trigger('repo:getDetails', name);
        self.detailsView.render({hideDetailsView: false});
        setTimeout(function () {
          self.scrollToDetailsView(true, 500);
        }, 10);
      });
      if (this.repos) {
        this.repoListView.passUserRepos(this.repos);
      }
      var repoListViewOptions = {};
      if (options && options.showReposLoadingView) {
        repoListViewOptions.showReposLoadingView = options.showReposLoadingView;
      }
      this.repoListView.render(repoListViewOptions);

      if (this.repos && this.selectedSource == OSUtil.SOURCE_MAP['gh']) {
        this.populateUIRepoList();
      }

      if (showPullFromIdeasView) {
        this.pullFromIdeasView = new PullFromIdeasView({
          el: '#pullFromIdeasView'
        });
        this.listenTo(this.pullFromIdeasView, 'project:selected', function (data) {
          self.oldPullFromIdeasID = data.id;
          var options = {
            hideDetailsView: false,
            projectData: data
          };
          self.detailsView.render(options);
          setTimeout(function () {
            self.scrollToDetailsView(false, 500);
          }, 10);
        });
        this.pullFromIdeasView.render();
      }

      if (showCreatingProjectView) {
        this.creatingProjectView = new CreatingProjectView({
          el: '#creatingProjectView'
        });
        this.creatingProjectView.setMessage('Creating project...');
        this.creatingProjectView.render();
      }

      if (showProjectCreationError) {
        this.projectCreationErrorShown = true;
        this.projectCreationErrorView = new ProjectCreationErrorView({
          el: '#projectCreationError'
        });
        this.projectCreationErrorView.render();
      } else {
        this.projectCreationErrorShown = false;
      }

      this.addClickToBlurListeners();

      $('[data-toggle="tooltip"]').tooltip();
    }
  });

  return AddProjectDetailsView;

});
