define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
    'views/widgets/text-info-bubble',
	'stache!views/add-project/details-view',
    'selectize',
    'velocity'
    ], function ($,
     Backbone,
     _,
     OSUtil,
     TextInfoBubble,
     DetailsViewTpl) {
	'use strict';

	var DetailsView = Backbone.View.extend({

		initialize: function () {
            this.extraInfoExpandDuration = 200;
            this.toggleDescriptionSizeDuration = 275;
            this.licenseItems = [
                {
                    "id": "MIT",
                    "title": "MIT"
                },
                {
                    "id": "GPL",
                    "title": "GPL"
                },
                {
                    "id": "BSD",
                    "title": "BSD"
                }
            ];
		},

		events: {
            'focus [name=add-project-description]': 'expandDescription',
            'blur [name=add-project-description]': 'contractDescription',
            'click .add-project-privacy-choice': 'handlePrivacySelection',
            'blur [name=add-project-title]': 'handleTitleBlur',
            'blur [name=add-project-subtitle]': 'handleSubtitleBlur',
            'blur [name=add-project-repo-name]': 'handleRepoNameBlur',
            'blur [name=slack]': 'handleSlackURLBlur',
            'blur [name=slack-api-key]': 'handleSlackAPIKeyBlur',
            'blur [name=hipchat]': 'handleHipChatBlur',
            'blur [name=irc]': 'handleIRCChannelBlur',
            'click .add-project-anon-choice': 'handleAnonSelection',
            'keyup [name=slack]': 'handleKeyUpAPIKeyContainer',
            'keydown [name=slack]': 'handleKeyDownAPIKeyContainer',
            'keyup [name=add-project-repo-name]': 'handleKeyUpRepoName',
            'keydown [name=add-project-repo-name]': 'handleKeyDownRepoName',
            'click .add-project-send-invites-choice': 'handleSendInvitesSelection'
        },

        handleKeyUpAPIKeyContainer: function (e) {
            var slackURL = $(e.currentTarget).val();
            _.isEmpty(slackURL) ? this.hideAPIKeyContainer() : this.showAPIKeyContainer();
        },

        handleKeyDownAPIKeyContainer: function (e) {
            var prevValue = $(e.currentTarget).val();
            if (_.isEmpty(prevValue) && e.keyCode != 8 && e.keyCode != 13) {
                this.showAPIKeyContainer();
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

        handleKeyUpRepoName: function (e) {
            var repoName = $(e.currentTarget).val();
            _.isEmpty(repoName) ? this.hideInviteUsersQuestion() : this.showInviteUsersQuestion();
        },

        handleKeyDownRepoName: function (e) {
            var prevValue = $(e.currentTarget).val();
            if (_.isEmpty(prevValue) && e.keyCode != 8 && e.keyCode != 13) {
                this.showInviteUsersQuestion();
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

        handleAnonSelection: function (e) {
            if (!$(e.currentTarget).hasClass('active-anon')) {
                ($(e.currentTarget).attr('name') == 'anon-yes') ? this.switchToAnon() : this.switchToKnown();
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

        switchToKnown: function () {
            this.$el.find('[name=anon-yes]').removeClass('active-anon');
            this.$el.find('[name=anon-no]').addClass('active-anon');
            this.anon = false;
            Backbone.EventBroker.trigger('anon:updated', this.anon);
        },

        switchToAnon: function () {
            this.$el.find('[name=anon-no]').removeClass('active-anon');
            this.$el.find('[name=anon-yes]').addClass('active-anon');
            this.anon = true;
            Backbone.EventBroker.trigger('anon:updated', this.anon);
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
            $(e.currentTarget).velocity({height: 220}, {duration: self.toggleDescriptionSizeDuration});
        },

        contractDescription: function (e) {
            var self = this;
            $(e.currentTarget).velocity({height: 90}, {duration: self.toggleDescriptionSizeDuration});
            this.description = $(e.currentTarget).val();
            Backbone.EventBroker.trigger('description:updated', this.description);
        },

        adjustHeightOfParent: function () {
            var inputHeight = this.$el.find('.selectize-control.multi').height();
            if (inputHeight > 40) {
                this.$el.find('.add-project-langs-frames-container').height(inputHeight + 22);
            } else {
                this.$el.find('.add-project-langs-frames-container').height(60);
            }
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
                if (self.allFrames[value] && !_.contains(self.langsFramesValue, self.allFrames[value])){
                    self.langsFramesValue = self.langFrameSelectize.getValue();
                    self.langFrameSelectize.addItem(self.allFrames[value]);
                } else {
                    self.langsFramesValue = self.langFrameSelectize.getValue();
                }
                self.adjustHeightOfParent();
            });
            this.langFrameSelectize.on('item_remove', function (value, $item) {
                self.langsFramesValue = self.langFrameSelectize.getValue();
                self.adjustHeightOfParent();
            });

        },

        initLicenseDropdown: function () {
            var self = this;
            var options = {
                theme: 'links',
                maxItems: 1,
                valueField: 'id',
                searchField: 'title',
                options: this.licenseItems,
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
                self.licenseValue = self.licenseSelectize.getValue();
            });
            this.licenseSelectize.on('item_remove', function () {
                self.licenseValue = self.licenseSelectize.getValue();
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

        checkIfShowRepoNameAndLicense: function () {
            return ((this.selectedType == OSUtil.TYPE_MAP['on-the-fence']) || this.selectedType == OSUtil.TYPE_MAP['launched']);
        },

        resetInfo: function () {
            var self = this;
            this.langFrameSelectize.clear();
            this.licenseSelectize.clear();
            this.ircNetworkSelectize.clear();
        },

        setRepoInfo: function (data) {
            var self = this;
            this.$el.find('[name=add-project-title]').val(data.description);
            this.$el.find('[name=add-project-repo-name]').val(data.name);
            for (var i = 0; i < data.languages.length; i++) {
                this.langFrameSelectize.addItem(data.languages[i]);
            }
            this.title = data.description; // most relevant actually to be the title
            this.langsFrames = data.languages;
            this.repoName = data.name;
        },

        passLangDropdownItems: function (data) {
            this.dropdownItems = data.dropdown_items;
            this.allFrames = data.all_frames;
            this.colors_and_initials = data.colors_and_initials;
        },

        passTags: function (data) {
            this.tags = data;
        },

        passType: function (type) {
            this.selectedType = type;
        },

        allowCreate: function () {
            // will need to show validation shit if not everything filled in
            return true;
        },

        getData: function () {
            return {
                title: this.title,
                subtitle: this.subtitle,
                description: this.description,
                langsFrames: this.langsFrames,
                repoName: this.repoName,
                sendInvites: this.sendInvites,
                license: this.license,
                privacy: this.privacy,
                anon: this.anon,
                slackURL: this.slackURL,
                slackAPIKey: this.slackAPIKey,
                hipChatURL: this.hipChatURL,
                irc: this.irc
            };
        },

        blurAllInputs: function () {
            this.$el.find('[name=add-project-title]').blur();
            this.$el.find('[name=add-project-subtitle]').blur();
            this.$el.find('[name=add-project-description]').blur();
            this.$el.find('[name=add-project-repo-name]').blur();

            if (this.licenseSelectize) {
                this.licenseSelectize.blur();
            }
            if (this.langFrameSelectize) {
                this.langFrameSelectize.blur();
            }

            this.$el.find('[name=slack]').blur();
            this.$el.find('[name=hipchat]').blur();
            this.$el.find('[name=irc]').blur();
        },

        render: function (options) {
			var self = this;
            options = options || {};

            if (options.selectedSource) {
                this.selectedSource = options.selectedSource;
            }

            this.title = (options.projectData) ? options.projectData.title : null;
            this.subtitle = (options.projectData) ? options.projectData.subtitle : null;
            this.description = (options.projectData) ? options.projectData.description : null;
            this.langsFrames = (options.projectData) ? options.projectData.langsFrames : null;
            this.repoName = (options.projectData) ? options.projectData.repoName : null;
            this.sendInvites = (options.projectData) ? options.projectData.sendInvites : false;
            this.license = (options.projectData) ? options.projectData.license : null;
            this.privacy = (options.projectData) ? options.projectData.privacy : OSUtil.REQUEST_PRIVACY;
            if (this.privacy == null) {
                this.privacy = OSUtil.REQUEST_PRIVACY;
            }
            this.anon = (options.projectData) ? options.projectData.anon : false;

            this.slackURL = (options.projectData) ? options.projectData.slackURL : null;
            this.slackAPIKey = (options.projectData) ? options.projectData.slackAPIKey : null;
            this.hipChatURL = (options.projectData) ? options.projectData.hipChatURL : null;
            this.irc = (options.projectData && options.projectData.irc) ? options.projectData.irc : {};

            var hideDetailsView = options.hideDetailsView;
            var showRepoNameAndLicense = this.checkIfShowRepoNameAndLicense();
            var showIntegrations = this.selectedType != OSUtil.TYPE_MAP['up-for-grabs'];

            this.$el.html(DetailsViewTpl({
                onTheFenceOrLaunchedNoPullFromIdeas: showRepoNameAndLicense,
                launched: this.selectedType == OSUtil.TYPE_MAP['launched'],
                hideDetailsView: hideDetailsView,
                title: this.title,
                subtitle: this.subtitle,
                description: this.description,
                repoName: this.repoName,
                sendInvites: this.sendInvites,
                requestPrivacy: this.privacy != OSUtil.OPEN_PRIVACY,
                openPrivacy: this.privacy == OSUtil.OPEN_PRIVACY,
                showAnon: this.selectedType == OSUtil.TYPE_MAP['up-for-grabs'],
                postAnon: this.anon,
                showIntegrations: showIntegrations,
                slackURL: this.slackURL,
                slackAPIKey: this.slackAPIKey,
                hipChatURL: this.hipChatURL,
                ircChannel: this.irc && this.irc.channel ? this.irc.channel : null
            }));


            if (this.dropdownItems && !options.hideDetailsView) {
                this.initLangFramesDropdown();
                if (this.langsFrames != null) {
                    for (var i = 0; i < this.langsFrames.length; i++) {
                        this.langFrameSelectize.addItem(this.langsFrames[i]);
                    }
                }
            }

            if (!options.hideDetailsView && showRepoNameAndLicense) {
                this.initLicenseDropdown();
                if (this.license != null) {
                    this.licenseSelectize.addItem(this.license);
                }
            }

            if (!options.hideDetailsView && showIntegrations) {
                this.initIRCNetworkDropdown();
            }

            this.findAPIKeyBubble = new TextInfoBubble({
                el: '#findAPIKeyBubble'
            });

            this.findAPIKeyBubble.render({
                text: 'Visit <a href="https://api.slack.com/web" target="_blank">api.slack.com/web</a> and scroll to the bottom of the page. If the key doesn\'t already exist, you can create one there.'
            });

            this.$infoBubble = this.findAPIKeyBubble.$el;
            this.$findKeyText = this.$el.find('.api-key-find > span');

            // Hover listener for user info bubble
            this.$findKeyText.hover(function () {
                if (!self.bubbleShown) {
                    self.$infoBubble.show();
                    self.bubbleShown = true;
                }
            }, function () {
                if (self.bubbleShown) {
                    self.$infoBubble.hide();
                    self.bubbleShown = false;
                }
            });

            this.$infoBubble.hover(function () {
                if (!self.bubbleShown) {
                    self.$infoBubble.show();
                    self.bubbleShown = true;
                }
            }, function () {
                if (self.bubbleShown) {
                    self.$infoBubble.hide();
                    self.bubbleShown = false;
                }
            });

		}
	});

	return DetailsView;

});
