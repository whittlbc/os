define(['jquery',
	'backbone',
	'underscore',
    'views/projects/minor/minor-info/contributors-view',
    'views/projects/minor/minor-info/repo-stats-view',
	'stache!views/projects/minor/minor-info/minor-info-view'
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

		events: {},

        lazyLoadContribs: function (data) {
            this.contributorsView.render({
                contributors: data,
                showSpinner: false
            });
            this.$el.find('#contributorsSubsectionTitle').html('Contributors (' + data.length + ')')
        },

        lazyLoadRepoStats: function (data) {
            this.repoStatsView.render({
                repoData: data,
                showSpinner: false
            });
        },

        render: function (options) {
			var self = this;
            this.options = options;
            var repoName;
            var showRepoName = false;
            var showLicense = false;
            var license;
            var showTeamCommunication = false;
            var hasSlack = false;
            var showIntegrations = false;
            var slackObj = null;

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
                    }
                }
            }

            this.$el.html(MinorInfoViewTpl({
                postDate: options.post_date ? options.post_date : '',
                showRepoName: showRepoName,
                repoName: repoName,
                repoURL: 'https://' + repoName,
                linkRepoName: repoName != null,
                numContrib: options.contributors && !options.getting_repo_data ? '(' + options.contributors.length + ')' : '',
                showTeamCommunication: showTeamCommunication,
                hasSlack: hasSlack,
                isContributor: true,
                slackTeamName: hasSlack ? slackObj.url.replace('https://', '').replace('http://', '') : null,
                slackTeamURL: hasSlack ? slackObj.url : null,
                showLicense: showLicense,
                license: license,
                licenseSpecified: license != null,
                showRepoStats: !!options.repo_name,
                showIntegrations: showIntegrations
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
                showSpinner: options.getting_repo_data
            });
		}
	});

	return MinorInfoView;

});
