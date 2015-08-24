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

		render: function () {
			var self = this;
            this.$el.html(MinorInfoViewTpl({
                postDate: '1 day ago',
                repoName: 'github.com/whittlbc/slack-ruby',
                repoURL: 'https://github.com/whittlbc/slack-ruby',
                slackTeamName: 'pulsehr.slack.com',
                slackTeamURL: 'https://pulsehr.slack.com',
                license: 'MIT',
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
            this.contributorsView.render();
		}
	});

	return MinorInfoView;

});
