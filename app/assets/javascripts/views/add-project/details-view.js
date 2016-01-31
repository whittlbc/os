define(['jquery',
  'backbone',
  'underscore',
  'models/os.util',
  'models/all-langs',
  'views/widgets/text-info-bubble',
  'stache!views/add-project/details-view',
  'selectize',
  'velocity'
], function ($,
   Backbone,
   _,
   OSUtil,
   AllLangs,
   TextInfoBubble,
   DetailsViewTpl) {
  'use strict';

  var DetailsView = Backbone.View.extend({

    initialize: function () {
      this.getAllLanguages();
      this.formatDomains();
      this.extraInfoExpandDuration = 200;
      this.toggleDescriptionSizeDuration = 275;
      this.preventKeys = [8, 9, 13];
    },

    events: {},

    getAllLanguages: function () {
      this.allLangs = AllLangs.getAll();
      this.dropdownItems = this.allLangs.dropdown_items;
      this.allFrames = this.allLangs.all_frames;
      this.colors_and_initials = this.allLangs.colors_and_initials;
    },

    formatDomains: function () {
      this.domainOptions = [];

      for (var key in OSUtil.DOMAIN_FILTERS) {
        this.domainOptions.push(OSUtil.DOMAIN_FILTERS[key]);
      }
    },

    hideErrorMessage: function (e) {
      $(e.currentTarget).closest('div').removeClass('error');
    },

    handleKeyDownAPIKeyContainer: function (e) {
      var prevValue = $(e.currentTarget).val();

      if (_.isEmpty(prevValue) && !_.contains(this.preventKeys, e.keyCode)) {
        this.showAPIKeyContainer();
      }
      else if (!_.isEmpty(prevValue) && e.keyCode === 8) {
        this.hideAPIKeyContainer();
      }
    },

    hideAPIKeyContainer: function () {
      var $apiKeyContainer = this.$el.find('.api-key-container');
      $apiKeyContainer.css({borderBottom: 'none'});
      $apiKeyContainer.animate({height: 0}, this.extraInfoExpandDuration);
    },

    showAPIKeyContainer: function () {
      var $apiKeyContainer = this.$el.find('.api-key-container');
      $apiKeyContainer.css({borderBottom: '1px solid #EEE'});
      $apiKeyContainer.animate({height: 67}, this.extraInfoExpandDuration);
    },

    handleKeyDownRepoName: function (e) {
      var prevValue = $(e.currentTarget).val();

      if (_.isEmpty(prevValue) && !_.contains(this.preventKeys, e.keyCode)) {
        this.showInviteUsersQuestion();
      }
      else if ((prevValue.length === 0 || prevValue.length === 1) && e.keyCode === 8) {
        this.hideInviteUsersQuestion();
      }
    },

    handleKeyUpRepoName: function (e) {
      // account for deleting all highlight text
      if (e.keyCode === 8 && _.isEmpty($(e.currentTarget).val())) {
        this.hideInviteUsersQuestion();
      }
    },

    hideInviteUsersQuestion: function () {
      var $inviteUsersQuestion = this.$el.find('.send-invites-question-container');
      $inviteUsersQuestion.css({borderBottom: 'none'});
      $inviteUsersQuestion.animate({height: 0}, this.extraInfoExpandDuration);
    },

    showInviteUsersQuestion: function () {
      var $inviteUsersQuestion = this.$el.find('.send-invites-question-container');
      $inviteUsersQuestion.css({borderBottom: '1px solid #EEE'});
      $inviteUsersQuestion.animate({height: 67}, this.extraInfoExpandDuration);
    },

    handleSlackURLBlur: function (e) {
      this.slackURL = $(e.currentTarget).val();
      Backbone.EventBroker.trigger('slackURL:updated', this.slackURL);
    },

    handleSlackAPIKeyBlur: function (e) {
      this.slackAPIKey = $(e.currentTarget).val();
      Backbone.EventBroker.trigger('slackAPIKey:updated', this.slackAPIKey);
    },

    handleHipChatBlur: function (e) {
      this.hipChatURL = $(e.currentTarget).val();
      Backbone.EventBroker.trigger('hipChat:updated', this.hipChatURL);
    },

    handleIRCChannelBlur: function (e) {
      this.irc.channel = $(e.currentTarget).val();
      Backbone.EventBroker.trigger('irc:updated', this.irc);
    },

    handleTitleBlur: function (e) {
      this.title = $(e.currentTarget).val();
      Backbone.EventBroker.trigger('title:updated', this.title);
    },

    handleSubtitleBlur: function (e) {
      this.subtitle = $(e.currentTarget).val();
      Backbone.EventBroker.trigger('subtitle:updated', this.subtitle);
    },

    handleRepoNameBlur: function (e) {
      this.repoName = $(e.currentTarget).val();
      Backbone.EventBroker.trigger('repoName:updated', this.repoName);
    },

    handlePrivacySelection: function (e) {
      if (!$(e.currentTarget).hasClass('active-privacy')) {
        ($(e.currentTarget).attr('name') == OSUtil.REQUEST_PRIVACY) ? this.switchToRequest() : this.switchToOpen();
      }
    },

    handleSendInvitesSelection: function (e) {
      if (!$(e.currentTarget).hasClass('active-send-invites')) {
        ($(e.currentTarget).attr('name') == 'send-invites-yes') ? this.switchToSendInvitesYes() : this.switchToSendInvitesNo();
      }
    },

    switchToOpen: function () {
      this.$el.find('[name=request]').removeClass('active-privacy');
      this.$el.find('[name=open]').addClass('active-privacy');
      this.privacy = OSUtil.OPEN_PRIVACY;
      Backbone.EventBroker.trigger('privacy:updated', this.privacy);
    },

    switchToRequest: function () {
      this.$el.find('[name=open]').removeClass('active-privacy');
      this.$el.find('[name=request]').addClass('active-privacy');
      this.privacy = OSUtil.REQUEST_PRIVACY;
      Backbone.EventBroker.trigger('privacy:updated', this.privacy);
    },

    switchToSendInvitesYes: function () {
      this.$el.find('[name=send-invites-no]').removeClass('active-send-invites');
      this.$el.find('[name=send-invites-yes]').addClass('active-send-invites');
      this.sendInvites = true;
      Backbone.EventBroker.trigger('send-invites:updated', this.sendInvites);
    },

    switchToSendInvitesNo: function () {
      this.$el.find('[name=send-invites-yes]').removeClass('active-send-invites');
      this.$el.find('[name=send-invites-no]').addClass('active-send-invites');
      this.sendInvites = false;
      Backbone.EventBroker.trigger('send-invites:updated', this.sendInvites);
    },

    expandDescription: function (e) {
      var self = this;
      $(e.currentTarget).velocity({height: 175}, {duration: self.toggleDescriptionSizeDuration});
    },

    contractDescription: function (e) {
      var self = this;
      $(e.currentTarget).velocity({height: 90}, {duration: self.toggleDescriptionSizeDuration});
      this.description = $(e.currentTarget).val();
      Backbone.EventBroker.trigger('description:updated', this.description);
    },

    adjustHeightOfLangsFramesInput: function () {
      this.adjustHeightOfInput('.add-project-langs-frames-container');
    },

    adjustHeightOfDomainInput: function () {
      this.adjustHeightOfInput('.add-project-domains-container');
    },

    adjustHeightOfSeekingInput: function () {
      this.adjustHeightOfInput('.add-project-seeking-container');
    },

    adjustHeightOfInput: function (className) {
      var inputHeight = this.$el.find(className +  ' .selectize-control.multi').height();
      var height;

      if (inputHeight > 45) {
        height = inputHeight + 18;
      } else {
        height = 60;
      }

      this.$el.find(className).height(height);
    },

    initLangFramesDropdown: function () {
      var self = this;
      var options = {
        theme: 'links',
        maxItems: null,
        valueField: 'id',
        searchField: 'title',
        options: this.dropdownItems,
        onBlur: function () {
          self.langsFrames = self.langFrameSelectize.getValue();
          Backbone.EventBroker.trigger('langsFrames:updated', self.langsFrames);
        },
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

      var $langFrameSelect = this.$el.find('#add-project-langs-frames-selection').selectize(options);
      var langFrameSelectize = $langFrameSelect[0].selectize;
      this.langFrameSelectize = langFrameSelectize;
      this.langFrameSelectize.on('item_add', function (value, $item) {
        $item.css('color', self.colors_and_initials[value]['color']);
        $item.css('border', '2px solid ' + self.colors_and_initials[value]['color']);
        if (self.allFrames[value] && !_.contains(self.langsFramesValue, self.allFrames[value])) {
          self.langsFrames = self.langFrameSelectize.getValue();
          self.langFrameSelectize.addItem(self.allFrames[value]);
        } else {
          self.langsFrames = self.langFrameSelectize.getValue();
        }
        self.adjustHeightOfLangsFramesInput();
      });
      this.langFrameSelectize.on('item_remove', function (value, $item) {
        self.langsFrames = self.langFrameSelectize.getValue();
        self.adjustHeightOfLangsFramesInput();
      });

    },

    initDomainsDropdown: function () {
      var self = this;
      var options = {
        theme: 'links',
        maxItems: null,
        valueField: 'id',
        searchField: 'title',
        options: this.domainOptions,
        onFocus: function () {
          if (self.stageIsIdea()) {
            setTimeout(function () {
              self.trigger('scroll:bottom');
            }, 5);
          }
        },
        onBlur: function () {
          self.domains = self.domainSelectize.getValue();
          Backbone.EventBroker.trigger('domains:updated', self.domains);  // prolly don't need
        },
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

      var $domainSelect = this.$el.find('#add-project-domains-selection').selectize(options);
      var domainSelectize = $domainSelect[0].selectize;
      this.domainSelectize = domainSelectize;

      this.domainSelectize.on('item_add', function (value, $item) {
        $item.css('color', '#00A6C9');
        $item.css('border', '2px solid #00A6C9');
        self.domains = self.domainSelectize.getValue();
        self.adjustHeightOfDomainInput();
      });

      this.domainSelectize.on('item_remove', function (value, $item) {
        self.domains = self.domainSelectize.getValue();
        self.adjustHeightOfDomainInput();
      });
    },

    initSeekingDropdown: function () {
      var self = this;
      var options = {
        theme: 'links',
        maxItems: null,
        valueField: 'id',
        searchField: 'title',
        options: this.getSeekingOptions(),
        onFocus: function () {
          if (self.stageIsIdea()) {
            setTimeout(function () {
              self.trigger('scroll:bottom');
            }, 1);
          }
        },
        onBlur: function () {
          self.seeking = self.seekingSelectize.getValue();
          Backbone.EventBroker.trigger('seeking:updated', self.seeking);  // prolly don't need
        },
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

      var $seekingSelect = this.$el.find('#add-project-seeking-selection').selectize(options);
      var seekingSelectize = $seekingSelect[0].selectize;
      this.seekingSelectize = seekingSelectize;

      this.seekingSelectize.on('item_add', function (value, $item) {
        $item.css('color', '#9797A5');
        $item.css('border', '2px solid #9797A5');
        self.seeking = self.seekingSelectize.getValue();
        self.adjustHeightOfSeekingInput();
      });

      this.seekingSelectize.on('item_remove', function (value, $item) {
        self.seeking = self.seekingSelectize.getValue();
        self.adjustHeightOfSeekingInput();
      });
    },

    initLicenseDropdown: function () {
      var self = this;
      var options = {
        theme: 'links',
        maxItems: 1,
        valueField: 'id',
        searchField: 'title',
        options: OSUtil.LICENSE_OPTIONS,
        onBlur: function () {
          self.license = self.licenseSelectize.getValue();
          Backbone.EventBroker.trigger('license:updated', self.license);
        },
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
      var $licenseSelect = this.$el.find('#add-project-license-selection').selectize(options);
      var licenseSelectize = $licenseSelect[0].selectize;
      this.licenseSelectize = licenseSelectize;

      this.licenseSelectize.on('item_add', function () {
        self.license = self.licenseSelectize.getValue();
      });

      this.licenseSelectize.on('item_remove', function () {
        self.license = self.licenseSelectize.getValue();
      });
    },

    initIRCNetworkDropdown: function () {
      var self = this;
      var options = {
        theme: 'links',
        maxItems: 1,
        valueField: 'id',
        searchField: 'title',
        options: OSUtil.IRC_NETWORKS,
        onBlur: function () {
          self.irc.network = self.ircNetworkSelectize.getValue();
          Backbone.EventBroker.trigger('irc:updated', self.irc);
        },
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
      var $ircNetworkSelect = this.$el.find('#ircNetwork').selectize(options);
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

    getSeekingOptions: function () {
      var options = [];
      var map = this.stageIsIdea() ? OSUtil.SEEKING_IDEAS_FILTERS : OSUtil.SEEKING_LAUNCHED_FILTERS;

      for (var key in map) {
        options.push(map[key]);
      }

      return options;
    },

    resetInfo: function () {
      var self = this;
      this.langFrameSelectize.clear();
      this.licenseSelectize.clear();
      this.ircNetworkSelectize.clear();
    },

    setRepoInfo: function (data) {
      var self = this;
      this.$el.find('[name=add-project-subtitle]').val(data.description);
      this.$el.find('[name=add-project-repo-name]').val(data.name);
      for (var i = 0; i < data.languages.length; i++) {
        this.langFrameSelectize.addItem(data.languages[i]);
      }
      this.title = data.description; // most relevant actually to be the title
      this.langsFrames = data.languages;
      this.repoName = data.name;
      if (this.repoName) {
        this.showInviteUsersQuestion();
      }
    },

    passTags: function (data) {
      this.tags = data;
    },

    passStage: function (stage) {
      this.selectedStage = stage;
    },

    checkIfHasTitle: function () {
      var hasTitle = true;
      var $input = this.$el.find('[name="add-project-title"]');
      if (_.isEmpty($input.val())) {
        $input.closest('div').addClass('error');
        hasTitle = false;
      }
      return hasTitle;
    },

    checkIfHasSubtitle: function () {
      var hasSubtitle = true;
      var $input = this.$el.find('[name="add-project-subtitle"]');
      if (_.isEmpty($input.val())) {
        $input.closest('div').addClass('error');
        hasSubtitle = false;
      }
      return hasSubtitle;
    },

    allowCreate: function () {
      var hasTitle = this.checkIfHasTitle();
      var hasSubtitle = this.checkIfHasSubtitle();
      if (!hasTitle || !hasSubtitle) {
        this.trigger('scroll-to-error');
      }
      return hasTitle && hasSubtitle;
    },

    getData: function () {

      if (_.isEmpty((this.irc.channel || '').trim()) || _.isEmpty(this.irc.network)) {
        this.irc = null;
      }

      return {
        title: this.title,
        subtitle: this.subtitle,
        description: this.description,
        langsFrames: this.langsFrames,
        domains: this.domains,
        seeking: this.seeking,
        repoName: this.repoName,
        sendInvites: this.sendInvites,
        license: this.license ? [this.license] : [],
        privacy: this.getPrivacy(),
        slackURL: this.slackURL,
        hipChatURL: this.hipChatURL,
        irc: this.irc
      };
    },

    getPrivacy: function () {
      return (this.showPrivacy && this.privacy) ? [this.privacy] : [];
    },

    blurAllInputs: function () {
      this.$el.find('[name=add-project-title]').blur();
      this.$el.find('[name=add-project-subtitle]').blur();
      this.$el.find('[name=add-project-description]').blur();
      this.$el.find('[name=add-project-repo-name]').blur();
      this.$el.find('[name=slack]').blur();
      this.$el.find('[name=hipchat]').blur();
      this.$el.find('[name=irc]').blur();

      if (this.licenseSelectize) {
        this.licenseSelectize.blur();
      }

      if (this.langFrameSelectize) {
        this.langFrameSelectize.blur();
      }

      if (this.ircNetworkSelectize) {
        this.ircNetworkSelectize.blur();
      }

      if (this.domainSelectize) {
        this.domainSelectize.blur();
      }

      if (this.seekingSelectize) {
        this.seekingSelectize.blur();
      }
    },

    addStopPropagationListeners: function () {
      var self = this;

      var inputs = [
        '[name=add-project-title]',
        '[name=add-project-subtitle]',
        '[name=add-project-description]',
        '[name=add-project-repo-name]',
        '[name=slack]',
        '[name=hipchat]',
        '[name=irc]'
      ];

      _.each(inputs, function (selector) {
        self.$el.find(selector).click(function (e) {
          e.stopPropagation();
          $(this).focus();
        });
      });
    },

    storeOptions: function (options) {
      if (options.selectedSource) {
        this.selectedSource = options.selectedSource;
      }

      this.title = (options.projectData || {}).title || null;
      this.subtitle = (options.projectData || {}).subtitle || null;
      this.description = (options.projectData || {}).description || null;
      this.langsFrames = (options.projectData || {}).langsFrames || null;
      this.repoName = (options.projectData || {}).repoName || null;
      this.sendInvites = (options.projectData || {}).sendInvites || false;
      this.license = (options.projectData || {}).license || null;
      this.privacy = (options.projectData || {}).privacy || OSUtil.OPEN_PRIVACY;
      this.slackURL = (options.projectData || {}).slackURL || null;
      this.hipChatURL = (options.projectData || {}).hipChatURL || null;
      this.irc = (options.projectData || {}).irc || {};
    },

    stageIsIdea: function () {
      return this.selectedStage === OSUtil.PROJECT_TYPES[0];
    },

    stageIsLaunched: function () {
      return this.selectedStage === OSUtil.PROJECT_TYPES[1];
    },

    renderLangsFramesDropdown: function () {
      if (this.dropdownItems) {
        this.initLangFramesDropdown();
        if (this.langsFrames != null) {
          for (var i = 0; i < this.langsFrames.length; i++) {
            this.langFrameSelectize.addItem(this.langsFrames[i]);
          }
        }
      }
    },

    renderDomainsDropdown: function () {
      var self = this;
      this.initDomainsDropdown();

      if (!_.isEmpty(this.domains)) {
        _.each(this.domains, function (domain) {
          self.domainSelectize.addItem(domain);
        });
      }
    },

    renderSeekingDropdown: function () {
      var self = this;
      this.initSeekingDropdown();

      if (!_.isEmpty(this.seeking)) {
        _.each(this.seeking, function (item) {
          self.seekingSelectize.addItem(item);
        });
      }
    },

    renderLicenseDropdown: function () {
      if (this.stageIsLaunched()) {
        this.initLicenseDropdown();
        if (this.license != null) {
          this.licenseSelectize.addItem(this.license);
        }
      }
    },

    renderIntegrations: function () {
      if (this.stageIsLaunched()) {
        this.initIRCNetworkDropdown();
      }
    },

    addListeners: function () {
      var self = this;

      this.$el.find('[name=add-project-description]').focus(function (e) {
        self.expandDescription(e);
      });

      this.$el.find('[name=add-project-description]').blur(function (e) {
        self.contractDescription(e);
      });

      this.$el.find('.add-project-privacy-choice').click(function (e) {
        self.handlePrivacySelection(e);
      });

      this.$el.find('[name=add-project-title]').blur(function (e) {
        self.handleTitleBlur(e);
      });

      this.$el.find('[name=add-project-subtitle]').blur(function (e) {
        self.handleSubtitleBlur(e);
      });

      this.$el.find('[name=add-project-repo-name]').blur(function (e) {
        self.handleRepoNameBlur(e);
      });

      this.$el.find('[name=slack]').blur(function (e) {
        self.handleSlackURLBlur(e);
      });

      this.$el.find('[name=hipchat]').blur(function (e) {
        self.handleHipChatBlur(e);
      });

      this.$el.find('[name=irc]').blur(function (e) {
        self.handleIRCChannelBlur(e);
      });

      this.$el.find('[name=add-project-repo-name]').keydown(function (e) {
        self.handleKeyDownRepoName(e);
      });

      this.$el.find('[name=add-project-repo-name]').keyup(function (e) {
        self.handleKeyUpRepoName(e);
      });

      this.$el.find('.add-project-send-invites-choice').click(function (e) {
        self.handleSendInvitesSelection(e);
      });

      this.$el.find('[name=add-project-title]').keydown(function (e) {
        self.hideErrorMessage(e);
      });

      this.$el.find('[name=add-project-subtitle]').keydown(function (e) {
        self.hideErrorMessage(e);
      });
    },

    render: function (options) {
      options = options || {};

      this.storeOptions(options);

      this.showPrivacy = this.stageIsIdea() && !options.upForGrabs;

      this.$el.html(DetailsViewTpl({
        launched: this.stageIsLaunched(),
        hideDetailsView: options.hideDetailsView,
        title: this.title,
        subtitle: this.subtitle,
        description: this.description,
        repoName: this.repoName,
        showRepo: this.stageIsLaunched(),
        showLicense: this.stageIsLaunched(),
        showSeeking: !options.upForGrabs,
        sendInvites: this.sendInvites,
        showPrivacy: this.showPrivacy,
        requestPrivacy: this.privacy != OSUtil.OPEN_PRIVACY,
        openPrivacy: this.privacy === OSUtil.OPEN_PRIVACY,
        showIntegrations: this.stageIsLaunched(),
        slackURL: this.slackURL,
        hipChatURL: this.hipChatURL,
        ircChannel: this.irc.channel
      }));

      if (!options.hideDetailsView) {
        this.renderLangsFramesDropdown();
        this.renderDomainsDropdown();

        if (!options.upForGrabs) {
          this.renderSeekingDropdown();
        }

        this.renderLicenseDropdown();
        this.renderIntegrations();
      }

      if (this.stageIsLaunched() && this.repoName) {
        this.showInviteUsersQuestion();
      }

      this.addListeners();
      this.addStopPropagationListeners();
    }
  });

  return DetailsView;

});
