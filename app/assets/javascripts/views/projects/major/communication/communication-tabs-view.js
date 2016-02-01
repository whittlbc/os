define(['jquery',
  'backbone',
  'underscore',
  'models/os.util',
  'views/os.view',
  'stache!views/projects/major/communication/communication-tabs-view',
  'backbone-eventbroker'
], function ($,
   Backbone,
   _,
   OSUtil,
   OSView,
   CommunicationTabsViewTpl) {
  'use strict';

  var CommunicationTabsView = OSView.extend({

    postInitialize: function () {
      Backbone.EventBroker.trigger({
        'contribs:fetched': 'checkIfOnTeam'
      }, this);

      this.activeFeed = 'general';

      this.statusForFeed = {
        implementations: -1,
        general: 0,
        team: 1
      };
    },

    events: {
      'mousedown .communication-tab > a': 'handleTabClick'
    },

    checkIfOnTeam: function (contribs) {
      if (!this.showingTeamTab && this.currentUser && _.contains(contribs, this.currentUser.gh_username)) {
        this.render({ isContrib: true });
      }
    },

    handleTabClick: function (e) {
      if (!$(e.currentTarget).hasClass('disabled')) {
        var selectedFeed = $(e.currentTarget).attr('data-feed');
        
        if (this.activeFeed != selectedFeed) {
          this.activeFeed = selectedFeed;

          var statusForFeed = this.statusForFeed[this.activeFeed];

          if (statusForFeed == -1) {
            Backbone.EventBroker.trigger('implementations:fetch');
          } else {
            Backbone.EventBroker.trigger('comments:fetch', statusForFeed);
          }
        }
      }
    },

    render: function (options) {
      options = options || {};
      var project = options.project || {};

      if (!_.isEmpty(project)) {
        this.project = project;
      }

      var ufgIdeaProject = (project.status == OSUtil.PROJECT_TYPES.indexOf('ideas')) && (project.up_for_grabs === true);

      this.showingTeamTab = !ufgIdeaProject;

      this.$el.html(CommunicationTabsViewTpl({
        showTeam: this.showingTeamTab,
        onTeam: project.is_owner || project.is_contributor || options.isContrib,
        showImplementations: ufgIdeaProject,
        implementationsActive: this.activeFeed == 'implementations',
        generalActive: this.activeFeed == 'general',
        teamActive: this.activeFeed == 'team'
      }));

      this.$el.find('ul.tabs').tabs();
    }
  });

  return CommunicationTabsView;

});
