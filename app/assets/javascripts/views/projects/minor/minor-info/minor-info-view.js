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
            var repoName;
            var showRepoName = true;
            var showLicense = true;
            var license;
            // project is an "Up for Grabs" type
            if (options.status === 0) {
                showRepoName = false;
                showLicense = false;
            } else {
                repoName = (options.owner_gh_username && options.repo_name) ? 'github.com/' + options.owner_gh_username + '/' + options.repo_name : null;
                license = (options.hasOwnProperty('license') && options.license[0]) ? options.license[0] : null;
            }
            this.$el.html(MinorInfoViewTpl({
                postDate: options.post_date ? options.post_date : '',
                showRepoName: showRepoName,
                repoName: repoName,
                repoURL: 'https://' + repoName,
                linkRepoName: repoName != null,
                numContrib: options.contributors ? '(' + options.contributors.length + ')' : '',
                slackTeamName: 'pulsehr.slack.com',
                slackTeamURL: 'https://pulsehr.slack.com',
                showLicense: showLicense,
                license: license,
                licenseSpecified: license != null,
                lastCommit: '4 hours ago',
                openPR: '24',
                closedPR: '211',
                openIssues: '13',
                releases: '4',
                forks: '10',
                clones: '100'
            }));

            this.contributorsView = new ContributorsView({
                el: '#contributorsView'
            });
            this.contributorsView.render(options.contributors);
		}
	});

	return MinorInfoView;

});
