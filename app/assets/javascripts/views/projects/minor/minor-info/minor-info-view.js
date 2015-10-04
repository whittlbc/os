define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
    'views/projects/minor/minor-info/contributors-view',
    'views/projects/minor/minor-info/repo-stats-view',
    'views/widgets/request-to-join-popover',
	'stache!views/projects/minor/minor-info/minor-info-view',
    'backbone-eventbroker'
    ], function ($,
     Backbone,
     _,
     OSUtil,
     ContributorsView,
     RepoStatsView,
     RequestToJoinPopover,
     MinorInfoViewTpl) {
	'use strict';

	var MinorInfoView = Backbone.View.extend({

		initialize: function () {
            Backbone.EventBroker.register({
                're-render-for-cancel-edit-mode': 'cancelEditMode'
            }, this);
		},

		events: {
            'click #contributorsSubsectionTitle': 'showContribsModal',
            'click #slackEllipsis': 'toggleSlackPopover',
            'click #hipchatEllipsis': 'toggleHipChatPopover'
        },

        toggleSlackPopover: function (e) {
            e.stopPropagation();
            if ($(e.toElement).is('i')) {
                this.hipchatPopover.$el.hide();
                this.slackPopover.$el.css('display') === 'none' ? this.slackPopover.$el.show() : this.slackPopover.$el.hide();
            }
        },

        toggleHipChatPopover: function (e) {
            e.stopPropagation();
            if ($(e.toElement).is('i')) {
                this.slackPopover.$el.hide();
                this.hipchatPopover.$el.css('display') === 'none' ? this.hipchatPopover.$el.show() : this.hipchatPopover.$el.hide();
            }
        },

        hidePopovers: function () {
            this.slackPopover.$el.hide();
            this.hipchatPopover.$el.hide()
        },

        showContribsModal: function () {
            Backbone.EventBroker.trigger('contribs-modal:show');
        },

        lazyLoadContribs: function (data) {
            this.contributorsView.render({
                contributors: data,
                showSpinner: false
            });
            this.$el.find('#contributorsSubsectionTitle').html('Contributors (' + data.length + ')');
        },

        lazyLoadRepoStats: function (data) {
            this.repoStatsView.render({
                repoURL: this.repoURL,
                repoData: data,
                showSpinner: false
            });
        },

        showEditMode: function (data) {
            var self = this;
            data.editMode = true;
            this.render(data);
        },

        getSavedEditData: function () {
            var self = this;
            var data = {};

            if (this.showLicense) {
                data.license = [this.$el.find('#licenseTypeSelection').val()];
            }
            if (this.showRepoName) {
                data.repo_name = this.$el.find('[name="repo-name"]').val();
            }
            if (this.showIntegrations) {
                data.integrations = {
                    slack: {
                        url: this.$el.find('[name="edit-slack"]').val(),
                        key: this.$el.find('[name="slack-api-key"]').val()
                    },
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

        render: function (options) {
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
                license = (options.hasOwnProperty('license') && options.license[0]) ? options.license[0] : null;

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

            this.showRepoName = showRepoName;
            this.showLicense = showLicense;
            this.repoURL = 'https://' + repoName;

            if (options.editMode && showIntegrations) {
                showIntegrations = true;
                hasSlack = hasHipChat = hasIRC = true;
                slackObj = slackObj || {
                    url: '',
                    key: ''
                };
                hipChatObj = hipChatObj || {
                    url: ''
                };
                ircObj = ircObj || {
                    channel: '',
                    network: ''
                };
            }

            this.showIntegrations = showIntegrations;

            this.$el.html(MinorInfoViewTpl({
                postDate: options.post_date ? OSUtil.getTimeAgo(options.post_date) : '',
                showRepoName: showRepoName,
                repoName: repoName,
                repoURL: this.repoURL,
                linkRepoName: repoName != null,
                numContrib: options.contributors && !options.getting_repo_data ? '(' + options.contributors.length + ')' : '',
                hasSlack: hasSlack,
                hasHipChat: hasHipChat,
                hasIRC: hasIRC,
                isContributor: options.is_contributor,
                slackTeamName: hasSlack ? slackObj.url.replace('https://', '').replace('http://', '') : null,
                slackTeamURL: hasSlack ? slackObj.url : null,
                slackAPIKey: hasSlack ? slackObj.key : null,
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
                hipchatAccetped: options.is_hipchat_member,
                slackRequestSent: options.pending_slack_request,
                hipchatRequestSent: options.pending_hipchat_request,
                editMode: options.editMode,
                editModeRepoName: options.repo_name
            }));

            if (!options.editMode) {

                this.contributorsView = new ContributorsView({
                    el: '#contributorsView'
                });
                this.contributorsView.render({
                    contributors: options.contributors,
                    showSpinner: options.getting_repo_data && !options.fromCache
                });

                var repoStatsData = {
                    repoURL: this.repoURL,
                    showSpinner: options.getting_repo_data && !options.editMode && !options.fromCache
                };

                if (options.fromCache) {
                    this.$el.find('#contributorsSubsectionTitle').html('Contributors (' + options.contributors.length + ')');
                    repoStatsData.repoData = options.repoData
                }

                this.repoStatsView = new RepoStatsView({
                    el: '#repoStatsView'
                });

                this.repoStatsView.render(repoStatsData);
            }

            if (options.editMode && this.showLicense) {
                this.$el.find('#licenseTypeSelection').val(license);
            }

            if (options.editMode && showIntegrations) {
                this.irc = ircObj;
                this.initIRCNetworkDropdown();
            }

            if (options.editMode) {
                $('[data-toggle="tooltip"]').tooltip();
            } else {
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
            }
        }
	});

	return MinorInfoView;

});
