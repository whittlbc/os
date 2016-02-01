define(['jquery',
  'backbone',
  'underscore',
  'models/os.util',
  'views/projects/minor/minor-info/contributors-view',
  'views/projects/minor/minor-info/repo-stats-view',
  'views/widgets/request-to-join-popover',
  'views/svgs/svg-view',
  'stache!views/projects/minor/minor-info/minor-info-view',
  'backbone-eventbroker'
], function ($,
   Backbone,
   _,
   OSUtil,
   ContributorsView,
   RepoStatsView,
   RequestToJoinPopover,
   SVG,
   MinorInfoViewTpl) {
  'use strict';

  var MinorInfoView = Backbone.View.extend({

    initialize: function () {
      Backbone.EventBroker.register({
        're-render-for-cancel-edit-mode': 'cancelEditMode',
        'repo-stats:fetch-error': 'cantLoadRepoStats'
      }, this);
    },

    events: {
      'click .num-contribs-text': 'showContribsModal',
      'click .send-invites-from-project-page-btn': 'showSendInvitesModal',
      'click #slackEllipsis': 'toggleSlackPopover',
      'click #hipchatEllipsis': 'toggleHipChatPopover'
    },

    toggleSlackPopover: function (e) {
      e.stopPropagation();
      this.hipchatPopover.$el.hide();
      this.slackPopover.$el.css('display') === 'none' ? this.slackPopover.$el.show() : this.slackPopover.$el.hide();
    },

    toggleHipChatPopover: function (e) {
      e.stopPropagation();
      this.slackPopover.$el.hide();
      this.hipchatPopover.$el.css('display') === 'none' ? this.hipchatPopover.$el.show() : this.hipchatPopover.$el.hide();
    },

    hidePopovers: function () {
      this.slackPopover.$el.hide();
      this.hipchatPopover.$el.hide()
    },

    showContribsModal: function () {
      Backbone.EventBroker.trigger('contribs-modal:show');
    },

    showSendInvitesModal: function () {
      Backbone.EventBroker.trigger('send-invites-modal:show');
    },

    lazyLoadContribs: function (data, wasError) {
      this.contributorsView.render({
        contributors: data,
        showSpinner: false
      });

      this.$el.find('.num-contribs-text').html('Contributors (' + data.length + ')');

      if (!wasError) {
        this.$el.find('.send-invites-from-project-page-btn').show();
      }
    },

    lazyLoadRepoStats: function (data) {
      this.repoStatsView.render({
        repoURL: this.repoURL,
        repoData: data,
        showSpinner: false
      });
    },

    cantLoadRepoStats: function () {
      this.repoStatsView.render({
        error: true
      });
    },

    showEditMode: function (data) {
      var self = this;
      data.editMode = true;
      this.render(data);
    },

    getSavedEditData: function () {
      var data = {};

      if (!$('.project-body').hasClass('up-for-grabs-edit')) {
        var licenseVal = this.$el.find('#licenseTypeSelection').val();
        data.license = (licenseVal === 'none') ? [] : [licenseVal];

        data.repo_name = this.$el.find('[name="repo-name"]').val();

        data.integrations = {
          slack: this.$el.find('[name="edit-slack"]').val(),
          hipchat: this.$el.find('[name="edit-hipchat"]').val(),
          irc: {
            channel: this.$el.find('[name="edit-irc"]').val(),
            network: this.irc.network
          }
        };
      }

      return data;
    },

    cancelEditMode: function (cachedData) {
      var self = this;
      cachedData.fromCache = true;
      this.render(cachedData);
    },

    initIRCNetworkDropdown: function () {
      var self = this;
      var options = {
        theme: 'links',
        maxItems: 1,
        valueField: 'id',
        searchField: 'title',
        options: OSUtil.IRC_NETWORKS,
        selectOnTab: false,
        render: {
          option: function (data, escape) {
            return '<div class="option title">' + escape(data.title) + '</div>';
          },
          item: function (data, escape) {
            return '<div class="item">' + escape(data.title) + '</div>';
          }
        }
      };
      var $ircNetworkSelect = this.$el.find('#editIRCNetwork').selectize(options);
      var ircNetworkSelectize = $ircNetworkSelect[0].selectize;
      this.ircNetworkSelectize = ircNetworkSelectize;
      this.ircNetworkSelectize.on('item_add', function () {
        self.irc.network = self.ircNetworkSelectize.getValue();
      });
      this.ircNetworkSelectize.on('item_remove', function () {
        self.irc.network = self.ircNetworkSelectize.getValue();
      });
      if (this.irc.network) {
        this.ircNetworkSelectize.setValue(this.irc.network);
      }
    },

    checkIfNeedToShowSeekingTooltip: function () {
      var $seeking = this.$el.find('.seeking');
      // if text is overflowing, enable the tooltip
      if ($seeking[0].scrollWidth > $seeking.innerWidth()) {
        $seeking.tooltip();
      }
    },

    render: function (options) {
      options = options || {};
      var self = this;
      var repoName;
      var showRepoName = false;
      var showLicense = false;
      var license;
      var hasSlack = false;
      var hasHipChat = false;
      var hasIRC = false;
      var showIntegrations = false;
      var slackObj = null;
      var hipChatObj = null;
      var ircObj = null;

      // project is NOT an "Up for Grabs" type
      if (options.status != 0) {
        showRepoName = true;
        showLicense = true;
        repoName = (options.owner_gh_username && options.repo_name) ? 'github.com/' + options.owner_gh_username + '/' + options.repo_name : null;
        license = (!_.isEmpty(options.license) && Array.isArray(options.license)) ? options.license[0] : null;

        if (Array.isArray(options.integrations)) {
          for (var i = 0; i < options.integrations.length; i++) {
            showIntegrations = true;
            if (options.integrations[i].service == 'Slack') {
              hasSlack = true;
              slackObj = options.integrations[i];
            } else if (options.integrations[i].service == 'HipChat') {
              hasHipChat = true;
              hipChatObj = options.integrations[i];
            } else if (options.integrations[i].service == 'IRC') {
              hasIRC = true;
              ircObj = options.integrations[i].irc;
            }
          }
        }
      }

      this.repoURL = 'https://' + repoName;

      if (options.editMode) {
        showRepoName = true;
        showLicense = true;
        showIntegrations = true;
        hasSlack = hasHipChat = hasIRC = true;
        slackObj = slackObj || {
            url: ''
          };
        hipChatObj = hipChatObj || {
            url: ''
          };
        ircObj = ircObj || {
            channel: '',
            network: ''
          };
      }

      options.seeking = ['Contributors', 'Seeking', 'Feedback', 'Users'];

      this.$el.html(MinorInfoViewTpl({
        hasSeeking: !_.isEmpty(options.seeking),
        seeking: (options.seeking || []).join(', '),
        postDate: options.post_date ? OSUtil.getTimeAgo(options.post_date) : '',
        showRepoName: showRepoName,
        repoName: repoName,
        repoURL: this.repoURL,
        linkRepoName: repoName != null,
        numContrib: options.contributors && !options.getting_repo_data ? '(' + options.contributors.length + ')' : '',
        hasSlack: hasSlack,
        hasHipChat: hasHipChat,
        hasIRC: hasIRC,
        isOwner: options.is_owner,
        isContributor: options.is_contributor,
        showSendInvitesBtn: options.is_owner && showRepoName && !_.isEmpty(repoName),
        slackTeamName: hasSlack ? slackObj.url.replace('https://', '').replace('http://', '') : null,
        slackTeamURL: hasSlack ? slackObj.url : null,
        hipChatTeamName: hasHipChat ? hipChatObj.url.replace('https://', '').replace('http://', '') : null,
        hipChatTeamURL: hasHipChat ? hipChatObj.url : null,
        ircChannel: hasIRC ? ircObj.channel : null,
        hasIRCNetwork: hasIRC && ircObj.network,
        ircNetwork: hasIRC ? ircObj.network : null,
        showLicense: showLicense,
        license: license,
        licenseSpecified: license != null,
        showRepoStats: !!options.getting_repo_data && !options.editMode,
        showIntegrations: showIntegrations,
        slackAccepted: options.is_slack_member,
        hipchatAccepted: options.is_hipchat_member,
        slackRequestSent: options.pending_slack_request,
        hipchatRequestSent: options.pending_hipchat_request,
        editMode: options.editMode,
        editModeRepoName: options.repo_name,
        isFirefox: $('body').attr('browser') === 'firefox'
      }));

      if (!options.editMode) {

        this.contributorsView = new ContributorsView({
          el: '#contributorsView'
        });
        this.contributorsView.render({
          contributors: options.contributors,
          showSpinner: options.getting_repo_data && !options.fromCache,
          anon: options.anon
        });

        var repoStatsData = {
          repoURL: this.repoURL,
          showSpinner: options.getting_repo_data && !options.editMode && !options.fromCache
        };

        if (options.fromCache) {
          this.$el.find('.num-contribs-text').html('Contributors (' + options.contributors.length + ')');
          repoStatsData.repoData = options.repoData
        }

        this.repoStatsView = new RepoStatsView({
          el: '#repoStatsView'
        });

        this.repoStatsView.render(repoStatsData);

        this.slackPopover = new RequestToJoinPopover({
          el: '#slackPopover'
        });
        this.listenTo(this.slackPopover, 'join', function () {
          Backbone.EventBroker.trigger('slack:join', OSUtil.REQUESTS['slack']);
        });
        this.slackPopover.render({
          status: options.pending_slack_request ? 1 : 0
        });

        this.hipchatPopover = new RequestToJoinPopover({
          el: '#hipchatPopover'
        });
        this.listenTo(this.hipchatPopover, 'join', function () {
          Backbone.EventBroker.trigger('hipchat:join', OSUtil.REQUESTS['hipchat']);
        });
        this.hipchatPopover.render({
          status: options.pending_hipchat_request ? 1 : 0
        });

        $(document).click(function () {
          self.hidePopovers();
        });

        // THIS IS FUCKING UP - TOOLTIP WON'T GO AWAY WHEN HOVER OFF SOMETIMES
        //this.checkIfNeedToShowSeekingTooltip();
      }

      if (options.editMode && showLicense) {
        this.$el.find('#licenseTypeSelection').val(license);
      }

      if (options.editMode && showIntegrations) {
        this.irc = ircObj;
        this.initIRCNetworkDropdown();
      }

      this.slackEllipsis = new SVG({
        el: '#slackEllipsis',
        svg: 'v-ellipsis'
      });

      this.slackEllipsis.render();

      this.slackEllipsis.$el.hover(function () {
        self.slackEllipsis.changeColor('#00A6C9');
      }, function () {
        self.slackEllipsis.changeColor('#cecece');
      });

      this.hipchatEllipsis = new SVG({
        el: '#hipchatEllipsis',
        svg: 'v-ellipsis'
      });

      this.hipchatEllipsis.render();

      this.hipchatEllipsis.$el.hover(function () {
        self.hipchatEllipsis.changeColor('#00A6C9');
      }, function () {
        self.hipchatEllipsis.changeColor('#cecece');
      });

    }
  });

  return MinorInfoView;

});
