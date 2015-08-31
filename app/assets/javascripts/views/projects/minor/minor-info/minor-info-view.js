define(['jquery',
	'backbone',
	'underscore',
    'views/projects/minor/minor-info/contributors-view',
	'stache!views/projects/minor/minor-info/minor-info-view'
    ], function ($,
     Backbone,
     _,
     ContributorsView,
     MinorInfoViewTpl) {
	'use strict';

	var MinorInfoView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

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
                numContrib: options.contributors ? '(' + options.contributors.length + ')' : '',
                showTeamCommunication: showTeamCommunication,
                hasSlack: hasSlack,
                isContributor: true,
                slackTeamName: hasSlack ? slackObj.url.replace('https://', '').replace('http://', '') : null,
                slackTeamURL: hasSlack ? slackObj.url : null,
                showLicense: showLicense,
                license: license,
                licenseSpecified: license != null,
                showRepoStats: !!options.repo_name,
                lastCommit: '4 hours ago',
                openPR: '24',
                closedPR: '211',
                openIssues: '13',
                releases: '4',
                forks: '10',
                clones: '100',
                showIntegrations: showIntegrations
            }));

            this.contributorsView = new ContributorsView({
                el: '#contributorsView'
            });
            this.contributorsView.render(options.contributors);
		}
	});

	return MinorInfoView;

});
