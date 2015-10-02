define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
    'views/projects/minor/minor-info/contributors-view',
    'views/projects/minor/minor-info/repo-stats-view',
	'stache!views/projects/minor/minor-info/minor-info-view',
    'backbone-eventbroker'
    ], function ($,
     Backbone,
     _,
     OSUtil,
     ContributorsView,
     RepoStatsView,
     MinorInfoViewTpl) {
	'use strict';

	var MinorInfoView = Backbone.View.extend({

		initialize: function () {
            Backbone.EventBroker.register({
                're-render-for-cancel-edit-mode': 'cancelEditMode'
            }, this);
		},

		events: {
            'click #contributorsSubsectionTitle': 'showContribsModal'
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
            if (this.showTeamCommunication) {
                data.integrations = {
                    slack: this.$el.find('[name="edit-slack"]').val(),
                    hipchat: this.$el.find('[name="edit-hipchat"]').val(),
                    irc: this.$el.find('[name="edit-irc"]').val()
                };
            }

            return data;
        },

        cancelEditMode: function (cachedData) {
            var self = this;
            cachedData.fromCache = true;
            this.render(cachedData);
        },

        render: function (options) {
			var self = this;
            var repoName;
            var showRepoName = false;
            var showLicense = false;
            var license;
            var showTeamCommunication = false;
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
            }

            if (Array.isArray(options.integrations)) {
                for (var i = 0; i < options.integrations.length; i++) {
                    showIntegrations = true;
                    if (options.integrations[i].service == 'Slack') {
                        hasSlack = true;
                        slackObj = options.integrations[i];
                        showTeamCommunication = true;
                    } else if (options.integrations[i].service == 'HipChat') {
                        hasHipChat = true;
                        hipChatObj = options.integrations[i];
                        showTeamCommunication = true;
                    } else if (options.integrations[i].service == 'IRC') {
                        hasIRC = true;
                        ircObj = options.integrations[i];
                        showTeamCommunication = true;
                    }
                }
            }

            this.showTeamCommunication = showTeamCommunication;
            this.showRepoName = showRepoName;
            this.showLicense = showLicense;
            this.repoURL = 'https://' + repoName;

            if (options.editMode) {
                showIntegrations = true;
                hasSlack = hasHipChat = hasIRC = true;
                slackObj = slackObj || {
                    url: ''
                };
                hipChatObj = hipChatObj || {
                    url: ''
                };
                ircObj = ircObj || {
                    url: ''
                };
            }

            this.$el.html(MinorInfoViewTpl({
                postDate: options.post_date ? OSUtil.getTimeAgo(options.post_date) : '',
                showRepoName: showRepoName,
                repoName: repoName,
                repoURL: this.repoURL,
                linkRepoName: repoName != null,
                numContrib: options.contributors && !options.getting_repo_data ? '(' + options.contributors.length + ')' : '',
                showTeamCommunication: showTeamCommunication,
                hasSlack: hasSlack,
                hasHipChat: hasHipChat,
                hasIRC: hasIRC,
                isContributor: options.is_contributor,
                slackTeamName: hasSlack ? slackObj.url.replace('https://', '').replace('http://', '') : null,
                slackTeamURL: hasSlack ? slackObj.url : null,
                hipChatTeamName: hasHipChat ? hipChatObj.url.replace('https://', '').replace('http://', '') : null,
                hipChatTeamURL: hasHipChat ? hipChatObj.url : null,
                ircChannel: hasIRC ? ircObj.url : null,
                showLicense: showLicense,
                license: license,
                licenseSpecified: license != null,
                showRepoStats: !!options.getting_repo_data && !options.editMode,
                showIntegrations: showIntegrations,
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
        }
	});

	return MinorInfoView;

});
