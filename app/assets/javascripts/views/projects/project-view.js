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
      if (this.projectMajorView.checkIfCanSave()) {

        var majorProjectData = this.projectMajorView.getSavedEditData();
        var minorProjectData = this.projectMinorView.getSavedEditData();

        var data = {
          title: majorProjectData.title,
          subtitle: majorProjectData.subtitle,
          description: majorProjectData.description,
          langs_and_frames: majorProjectData.langs_and_frames,
          status: majorProjectData.status,
          privacy: majorProjectData.privacy
        };

        if (data.status == 0) {
          data.anon = majorProjectData.anon;
        } else {
          data.anon = false;
        }

        if (minorProjectData.hasOwnProperty('license')) {
          data.license = minorProjectData.license;
        }
        if (minorProjectData.hasOwnProperty('repo_name')) {
          data.repo_name = minorProjectData.repo_name;
        }

        if (minorProjectData.hasOwnProperty('integrations')) {
          data.integrations = minorProjectData.integrations;
        }

        var project = new Project();
        project.edit({uuid: self.projectUUID, data: data}, {
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

    handleAddComment: function (data) {
      var self = this;

      var obj = {
        text: data.text,
        poster_uuid: this.currentUser.get('uuid'),
        uuid: this.projectUUID,
        feed: data.feed,
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

    handleFetchedDetails: function (data) {
      var self = this;
      if (data.project.getting_repo_data && data.project.repo_name && data.project.owner_gh_username) {
        //this.github.getContributors(data.project.owner_gh_username, data.project.repo_name, function (contribData) {
        //    self.handleFetchedGHContribs(contribData, data.project.admin, data.project.owner_gh_username);
        //});
        this.github.getContributors('yabwe', 'medium-editor', function (contribData) {
          self.handleFetchedGHContribs(contribData, data.project.admin, 'yabwe');
        });
        //this.github.fetchRepoStats(data.project.owner_gh_username, data.project.repo_name, function (data) {
        //    self.handleFetchedGHRepoStats(data);
        //});
        this.github.fetchRepoStats('yabwe', 'medium-editor', function (data) {
          self.handleFetchedGHRepoStats(data);
        });
      } else {
        this.contributors = data.project.contributors;
        data.project.contributors = _.union(data.project.contributors.admin, data.project.contributors.others);
      }
      this.fetchComments(0);
      this.setProjectProperties(data);
      this.cachedProjectData = data;
      this.render(data);
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

    handleFetchedGHContribs: function (contribs, admin, owner_gh_username) {
      var sortedContribs = this.sortContribs(contribs, admin, owner_gh_username);
      this.contributors = sortedContribs;
      var unionContribs = _.union(sortedContribs.admin, sortedContribs.others);
      this.cachedProjectData.project.contributors = unionContribs;
      this.projectMinorView.lazyLoadContribs(unionContribs);
    },

    handleFetchedGHRepoStats: function (data) {
      this.cachedProjectData.project.repoData = data;
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
        if (a.contributions === b.contributions) {
          return (a.login.toLowerCase() > b.login.toLowerCase()) ? 1 : ((b.login.toLowerCase() > a.login.toLowerCase()) ? -1 : 0);
        } else {
          return (a.contributions < b.contributions) ? 1 : ((b.contributions < a.contributions) ? -1 : 0);
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
        admin: _.union(owner, adminNotOwner),
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
      if (this.data.project.status == 0) {
        this.$el.find('.project-body').addClass('up-for-grabs-edit');
      }
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