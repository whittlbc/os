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
            var repoName = 'github.com/' + options.owner_gh_username + '/' + options.repo_name;
            this.$el.html(MinorInfoViewTpl({
                postDate: options.post_date,
                repoName: repoName,
                repoURL: 'https://' + repoName,
                numContrib: options.contributors ? '(' + options.contributors.length + ')' : '',
                slackTeamName: 'pulsehr.slack.com',
                slackTeamURL: 'https://pulsehr.slack.com',
                license: options.license ? options.license[0] : '',
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
