define(['jquery',
	'backbone',
	'underscore',
    'views/projects/minor/minor-info/contributors-view',
    'views/projects/minor/minor-info/repo-stats-view',
	'stache!views/projects/minor/minor-info/minor-info-view',
    'backbone-eventbroker'
    ], function ($,
     Backbone,
     _,
     ContributorsView,
     RepoStatsView,
     MinorInfoViewTpl) {
	'use strict';

	var MinorInfoView = Backbone.View.extend({

		initialize: function () {
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
            this.$el.find('#contributorsSubsectionTitle').html('Contributors (' + data.length + ')')
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
            return {
                license: this.$el.find(':selected').val(),
                anon: this.$el.find('').is(':checked'),
                integrations: {
                    slack: this.$el.find('').val(),
                    hipchat: this.$el.find('').val(),
                    irc: this.$el.find('').val()
                }
            };
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
            if (options.status !== 0) {
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

            this.repoURL = 'https://' + repoName;

            this.$el.html(MinorInfoViewTpl({
                postDate: options.post_date ? options.post_date : '',
                showRepoName: showRepoName,
                repoName: repoName,
                repoURL: this.repoURL,
                linkRepoName: repoName != null,
                numContrib: options.contributors && !options.getting_repo_data ? '(' + options.contributors.length + ')' : '',
                showTeamCommunication: showTeamCommunication,
                hasSlack: hasSlack,
                hasHipChat: hasHipChat,
                hasIRC: hasIRC,
                isContributor: true,
                slackTeamName: hasSlack ? slackObj.url.replace('https://', '').replace('http://', '') : null,
                slackTeamURL: hasSlack ? slackObj.url : null,
                hipChatTeamName: hasHipChat ? hipChatObj.url.replace('https://', '').replace('http://', '') : null,
                hipChatTeamURL: hasHipChat ? hipChatObj.url : null,
                ircChannel: hasIRC ? ircObj.url : null,
                showLicense: showLicense,
                license: license,
                licenseSpecified: license != null,
                showRepoStats: !!options.getting_repo_data,
                showIntegrations: showIntegrations,
                editMode: options.editMode
            }));

            this.contributorsView = new ContributorsView({
                el: '#contributorsView'
            });
            this.contributorsView.render({
                contributors: options.contributors,
                showSpinner: options.getting_repo_data
            });

            this.repoStatsView = new RepoStatsView({
                el: '#repoStatsView'
            });
            this.repoStatsView.render({
                repoURL: this.repoURL,
                showSpinner: options.getting_repo_data
            });
        }
	});

	return MinorInfoView;

});
