define(['jquery',
	'backbone',
	'underscore',
    'views/widgets/spinner-chasing-dots',
    'stache!views/projects/minor/minor-info/repo-stats-view'
    ], function ($,
     Backbone,
     _,
     Spinner,
     RepoStatsViewTpl) {
	'use strict';

	var RepoStatsView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function (options) {
			var self = this;
            this.$el.html(RepoStatsViewTpl({
                lastUpdated: options.repoData ? options.repoData.last_updated : '',
                starCount: options.repoData ? options.repoData.star_count : '',
                watchCount: options.repoData ? options.repoData.watch_count : '',
                openPR: options.repoData ? options.repoData.open_pr_count : '',
                openPRLink: options.repoURL ? options.repoURL + '/pulls' : '',
                closedPR: options.repoData ? options.repoData.closed_pr_count : '',
                closedPRLink: options.repoURL ? options.repoURL + '/pulls?q=is%3Apr+is%3Aclosed' : '',
                openIssues: options.repoData ? options.repoData.open_issues_count : '',
                issuesLink: options.repoURL ? options.repoURL + '/issues' : '',
                forks: options.repoData ? options.repoData.forks_count : '',
                showSpinner: options.showSpinner
            }));
            if (options.showSpinner) {
                this.spinner = new Spinner({
                    el: '#repoStatsLoading',
                    width: '35px',
                    height: '35px'
                });

                // Don't show the spinner timeout unless it's been loading for more than 300 ms
                setTimeout(function () {
                    self.spinner.render();
                }, 300);

            }
		}
	});

	return RepoStatsView;

});
