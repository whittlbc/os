define(['jquery',
  'backbone',
  'underscore',
  'models/user',
  'models/project',
  'models/os.util',
  'views/os.view',
  'integrations/github',
  'views/projects/major/project-major-view',
  'views/projects/minor/project-minor-view',
  'views/not-found/404',
  'stache!views/projects/project-view',
  'selectize',
  'backbone-eventbroker'
], function ($,
   Backbone,
   _,
   User,
   Project,
   OSUtil,
   OSView,
   Github,
   ProjectMajorView,
   ProjectMinorView,
   View404,
   ProjectViewTpl) {
  'use strict';

  var ProjectView = OSView.extend({

    postInitialize: function (options) {
      var self = this;
      var project = new Project();
      this.projectUUID = options.uuid;

      var data = {
        uuid: options.uuid // project uuid
      };

      if (this.currentUser) {
        data.user_uuid = this.currentUser.get('uuid');
      }

      project.fetchDetails(data, {
        success: function (obj) {
          if (obj.status && obj.status == 404) {
            self.render({show404: true});
          } else {
            self.handleFetchedDetails(obj);
          }
        }
      });

      Backbone.EventBroker.register({
        'project:join': 'checkProjectPrivacy',
        'comment:add': 'handleAddComment',
        'comments:fetch': 'fetchComments',
        'implementations:fetch': 'fetchImplementations',
        'implementation:add': 'addImplementation',
        'evolution:fetch': 'fetchProjectEvolution',
        'project:save-edit': 'handleSaveEditProject',
        'edit-mode:cancel': 'cancelEditMode',
        'project:edit:change-type': 'changedTypeDuringEdit',
        'evolution:add': 'handleAddEvolution',
        'slack:join': 'requestToJoin',
        'hipchat:join': 'requestToJoin'
      }, this);

      this.github = Github;
      this.github.setToken('202171c69b06bbe92b666e1a5e3a9b7981a6fced');

    },

    reInitialize: function (uuid) {
      var self = this;
      var project = new Project();
      self.projectUUID = uuid;

      var data = {
        uuid: uuid  // project uuid
      };

      if (this.currentUser) {
        data.user_uuid = this.currentUser.get('uuid');
      }

      project.fetchDetails(data, {
        success: function (obj) {
          if (obj.status && obj.status == 404) {
            self.render({show404: true});
          } else {
            self.handleFetchedDetails(obj);
          }
        }
      });
    },

    errorHandler: function (resp, status, xhr) {
      console.log('AJAX ERROR: ', xhr, resp);
    },

    events: {},

    handleAddEvolution: function (view) {
      view.addNewEvolutionItem();
    },

    handleSaveEditProject: function () {
      var self = this;

      if (this.projectMajorView.majorInfoView.checkIfCanSave()) {
        var projectData = {};
        var majorProjectData = this.projectMajorView.getSavedEditData();
        var minorProjectData = this.projectMinorView.getSavedEditData();

        _.extend(projectData, majorProjectData);
        _.extend(projectData, minorProjectData);
        _.extend(projectData, {
          status: self.data.project.status,
          up_for_grabs: self.data.project.up_for_grabs
        });

        var project = new Project();
        project.edit({
          uuid: self.projectUUID,
          data: projectData
        }, {
          success: function () {
            window.location.reload();
          }, error: function () {
            window.location.reload();
          }
        });
      }
    },

    fetchProjectEvolution: function () {
      var self = this;
      var project = new Project();
      project.getEvolution({uuid: this.projectUUID}, {
        success: function (data) {
          Backbone.EventBroker.trigger('evolution:pass', data);
        }
      });
    },

    getCurrentCommentFeed: function () {
      var tabsView = ((this.projectMajorView || {}).communicationView || {}).communicationTabsView;
      return tabsView ? tabsView.getActiveFeedStatus() : 0;
    },

    handleAddComment: function (data) {
      var self = this;

      var obj = {
        text: data.text,
        poster_uuid: this.currentUser.get('uuid'),
        uuid: this.projectUUID,
        feed: this.getCurrentCommentFeed(),
        parent_uuid: data.parentUUID
      };

      if (!_.isEmpty(obj.text)) {
        var project = new Project();
        project.postNewComment(obj, {
          success: function (updatedComments) {
            self.projectMajorView.showNewComment({ comments: updatedComments });
          }
        });
      }
    },

    setProjectProperties: function (data) {
      var self = this;
      self.privacy = data.project.privacy;
      self.owner_id = data.project.user_id;
      self.repo_name = data.project.repo_name;
      self.uuid = data.project.uuid;
      self.owner_gh_username = data.project.owner_gh_username;
    },

    checkIfProjectHasRepo: function (project) {
      this.projectHasRepo = project.getting_repo_data && project.repo_name && project.owner_gh_username;
      return this.projectHasRepo;
    },

    revertContribsToSHOnly: function (project) {
      this.contributors = _.union(project.contributors.admin, project.contributors.others);
      this.cachedProjectData.project.contributors = this.contributors;
      this.projectMinorView.lazyLoadContribs(this.contributors, true);
    },

    fetchGHContribs: function (project) {
      var self = this;

      this.github.getContributors(project.owner_gh_username, project.repo_name, function (contribData) {
        var shContribs = _.union(project.contributors.admin, project.contributors.others);
        var allContribs = _.union(shContribs, contribData);
        self.handleFetchedGHContribs(allContribs, project.owner_gh_username);
      }, function () {
        self.revertContribsToSHOnly(project);
      });
    },

    fetchRepoStats: function (project) {
      var self = this;

      this.github.fetchRepoStats(project.owner_gh_username, project.repo_name, function (data) {
        self.handleFetchedGHRepoStats(data);
      }, function () {
        Backbone.EventBroker.trigger('repo-stats:fetch-error');
      });
    },

    useSHOnlyContribs: function (project) {
      this.contributors = project.contributors;

      project.contributors = _.union(project.contributors.admin, project.contributors.others);

      var contribUsernames = _.map(project.contributors, function (contrib) {
        return contrib.login;
      });

      if (this.currentUser && _.contains(contribUsernames, this.currentUser.gh_username)) {
        project.is_contributor = true;
      }

      return project;
    },

    handleFetchedDetails: function (data) {
      var self = this;
      var project = data.project || {};

      if (this.checkIfProjectHasRepo(project)) {

        this.fetchGHContribs(project);

        this.fetchRepoStats(project);

      } else {
        project = this.useSHOnlyContribs(project);
      }

      data.project = project;
      this.setProjectProperties(data);
      this.cachedProjectData = data;
      this.render(data);

      if (!data.project.up_for_grabs) {
        this.fetchComments(0);
      }
    },

    fetchComments: function (feedStatus) {
      var self = this;
      var project = new Project();
      var data = {
        uuid: self.projectUUID,
        feed: feedStatus
      };

      if (this.currentUser) {
        data.user_uuid = this.currentUser.get('uuid');
      }

      project.fetchComments(data, {
        success: function (comments) {
          self.projectMajorView.passComments({ comments: comments });
        }
      });
    },

    fetchImplementations: function () {
      var self = this;
      var project = new Project();

      var data = {
        uuid: self.projectUUID
      };

      if (this.currentUser) {
        data.user_uuid = this.currentUser.get('uuid');
      }

      project.fetchImplementations(data, {
        success: function (implementations) {
          self.projectMajorView.passImplementations(implementations);
        }
      });
    },

    addImplementation: function (data) {
      var self = this;
      var project = new Project();

      _.extend(data, {
        uuid: self.projectUUID
      });

      if (this.currentUser) {
        data.user_uuid = this.currentUser.get('uuid');
      }

      project.addImplementation(data, {
        success: function (implementations) {
          self.projectMajorView.passImplementations(implementations);
        }
      });
    },

    handleFetchedGHContribs: function (contribs, owner_gh_username) {
      var sortedContribs = this.sortContribs(contribs, owner_gh_username);
      this.contributors = sortedContribs;
      var unionContribs = _.union(sortedContribs.admin, sortedContribs.others);
      this.cachedProjectData.project.contributors = unionContribs;
      this.projectMinorView.lazyLoadContribs(unionContribs);

      var justUsernames = _.map(unionContribs, function (contrib) {
        return contrib.login;
      });

      Backbone.EventBroker.trigger('contribs:fetched', justUsernames);
    },

    handleFetchedGHRepoStats: function (data) {
      this.cachedProjectData.project.repoData = data;
      this.projectMinorView.lazyLoadRepoStats(data);
    },

    sortContribs: function (contribs, owner_gh_username) {
      var owner = [];
      var owner_username = [];

      var others = [];
      var other_usernames = [];

      _.each(contribs, function (contrib) {
        var username = contrib.login;

        if (username === owner_gh_username) {
          if (!_.contains(owner_username, username)) {
            contrib.admin = true;

            owner_username.push(username);
            owner.push(contrib);
          }
        } else {
          if (!_.contains(other_usernames, username)) {
            other_usernames.push(username);
            others.push(contrib);
          }
        }
      });

      others = others.sort(function (a, b) {
        if (a.contributions === b.contributions) {
          return (a.login.toLowerCase() > b.login.toLowerCase()) ? 1 : ((b.login.toLowerCase() > a.login.toLowerCase()) ? -1 : 0);
        } else {
          return (a.contributions < b.contributions) ? 1 : ((b.contributions < a.contributions) ? -1 : 0);
        }
      });

      return {
        admin: owner,
        others: others
      };
    },

    checkProjectPrivacy: function () {
      if (!this.isContributor()) {
        this.privacy == OSUtil.OPEN_PRIVACY ? this.joinProject() : this.requestToJoin(OSUtil.REQUESTS['project']);
      }
    },

    isContributor: function () {
      return _.contains(this.contributors, this.currentUser.get('id'));
    },

    joinProject: function () {
      var self = this;
      var project = new Project();
      var obj = {
        uuid: self.uuid,
        user_uuid: self.currentUser.get('uuid')
      };
      project.join(obj, {
        success: function (data) {
          window.location.reload();
        }
      });
    },

    requestToJoin: function (int) {
      var self = this;
      var project = new Project();
      var obj = {
        uuid: self.uuid,
        requester_uuid: self.currentUser.get('uuid'),
        asset: int
      };
      project.requestToJoin(obj, {
        success: function () {
          if (int === 0) {
            self.projectMajorView.majorInfoView.switchToRequestSent();
          }
        }
      });
    },

    changedTypeDuringEdit: function (type) {
      type == 0 ? this.$el.find('.project-body').addClass('up-for-grabs-edit') :
        this.$el.find('.project-body').removeClass('up-for-grabs-edit');
    },

    showEditMode: function () {
      this.projectMajorView.showEditMode(this.data);
      this.projectMinorView.showEditMode(this.data.project);
    },

    cancelEditMode: function () {
      this.$el.find('.project-body').removeClass('up-for-grabs-edit');
      this.cachedProjectData.project.editMode = false;
      Backbone.EventBroker.trigger('re-render-for-cancel-edit-mode', this.cachedProjectData.project);
    },

    render: function (data) {
      var self = this;
      this.data = data;

      this.$el.html(ProjectViewTpl({
        show404: data.show404
      }));

      if (data.show404) {
        this.view404 = new View404({
          el: '#404'
        });
        this.view404.render();
      } else {

        this.projectMajorView = new ProjectMajorView({
          el: '#projectMajorView'
        });

        this.listenTo(this.projectMajorView, 'project:edit', function () {
          self.showEditMode();
        });

        this.projectMajorView.render(data);

        this.projectMinorView = new ProjectMinorView({
          el: '#projectMinorView'
        });

        this.projectMinorView.render(data.project);
      }

      window.scrollTo(0, 0);

    }
  });

  return ProjectView;

});