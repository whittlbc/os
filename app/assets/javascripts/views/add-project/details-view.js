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

            this.ircNetworks = [
                {
                    "id": "IRCNet",
                    "title": "IRCNet"
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
            'blur [name=slack]': 'handleSlackBlur',
            'blur [name=hipchat]': 'handleHipChatBlur',
            'blur [name=irc]': 'handleIRCBlur',
            'click .add-project-anon-choice': 'handleAnonSelection',
            'keyup [name=slack]': 'handleKeyUpAPIKeyContainer',
            'keydown [name=slack]': 'handleKeyDownAPIKeyContainer'
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
            $apiKeyContainer.animate({height: 0}, 230);
        },

        showAPIKeyContainer: function () {
            var $apiKeyContainer = this.$el.find('.api-key-container');
            $apiKeyContainer.css({borderBottom: '1px solid #EEE'});
            $apiKeyContainer.animate({height: 67}, 230);
        },

        handleSlackBlur: function (e) {
            this.slackURL = $(e.currentTarget).val();
            Backbone.EventBroker.trigger('slack:updated', this.slackURL);
        },

        handleHipChatBlur: function (e) {
            this.hipChatURL = $(e.currentTarget).val();
            Backbone.EventBroker.trigger('hipChat:updated', this.hipChatURL);
        },

        handleIRCBlur: function (e) {
            this.ircChannel = $(e.currentTarget).val();
            Backbone.EventBroker.trigger('irc:updated', this.ircChannel);
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
                $item.css('background-color', self.colors_and_initials[value]['color']);
                $item.css('color', 'white');
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
                options: this.ircNetworks,
                onBlur: function () {
                    self.ircNetwork = self.licenseSelectize.getValue();
                    Backbone.EventBroker.trigger('irc-network:updated', self.ircNetwork);
                },
                onFocus: function () {
                    self.trigger('scroll:bottom');
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
                self.ircNetwork = self.ircNetworkSelectize.getValue();
            });
            this.ircNetworkSelectize.on('item_remove', function () {
                self.ircNetwork = self.ircNetworkSelectize.getValue();
            });
            if (this.ircNetwork) {
                this.ircNetworkSelectize.setValue(this.ircNetwork);
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
                license: this.license,
                privacy: this.privacy,
                anon: this.anon,
                slackURL: this.slackURL,
                hipChatURL: this.hipChatURL,
                ircChannel: this.ircChannel
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
            this.license = (options.projectData) ? options.projectData.license : null;
            this.privacy = (options.projectData) ? options.projectData.privacy : OSUtil.REQUEST_PRIVACY;
            if (this.privacy == null) {
                this.privacy = OSUtil.REQUEST_PRIVACY;
            }
            this.anon = (options.projectData) ? options.projectData.anon : false;

            this.slackURL = (options.projectData) ? options.projectData.slackURL : null;
            this.hipChatURL = (options.projectData) ? options.projectData.hipChatURL : null;
            this.ircChannel = (options.projectData) ? options.projectData.ircChannel : null;

            var hideDetailsView = options.hideDetailsView;
            var showRepoNameAndLicense = this.checkIfShowRepoNameAndLicense();

            this.$el.html(DetailsViewTpl({
                onTheFenceOrLaunchedNoPullFromIdeas: showRepoNameAndLicense,
                launched: this.selectedType == OSUtil.TYPE_MAP['launched'],
                hideDetailsView: hideDetailsView,
                title: this.title,
                subtitle: this.subtitle,
                description: this.description,
                repoName: this.repoName,
                requestPrivacy: this.privacy != OSUtil.OPEN_PRIVACY,
                openPrivacy: this.privacy == OSUtil.OPEN_PRIVACY,
                showAnon: this.selectedType == OSUtil.TYPE_MAP['up-for-grabs'],
                postAnon: this.anon,
                showIntegrations: true,
                slackURL: this.slackURL,
                hipChatURL: this.hipChatURL,
                ircChannel: this.ircChannel
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

            if (!options.hideDetailsView) {
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
