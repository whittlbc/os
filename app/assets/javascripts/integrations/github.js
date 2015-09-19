define(['jquery',
	'backbone',
	'underscore',
    'models/os.util'
    ], function ($,
     Backbone,
     _,
     OSUtil) {
	'use strict';

	var Github = {

        endpoint: 'https://api.github.com/',

        getURLFor: function (asset, username, repo) {
            var self = this;

            switch (asset) {
                case 'allUserRepos':
                    return this.endpoint + 'users/' + username + '/repos';
                    break;
                case 'repo':
                    return this.endpoint + 'repos/' + username + '/' + repo;
                    break;
                case 'contributors':
                    return this.endpoint + 'repos/' + username + '/' + repo + '/contributors?per_page=100&page=1';
                    break;
                case 'openPRs':
                    return this.endpoint + 'repos/' + username + '/' + repo + '/pulls?state=open';
                    break;
                case 'closedPRs':
                    return this.endpoint + 'repos/' + username + '/' + repo + '/pulls?state=closed';
                    break;
            }
        },

        setToken: function (token) {
            var self = this;
            this.token = token;
            this.headerToken = 'token ' + this.token;
        },

        getHeaders: function () {
            var headers = {
                'Content-Type': 'application/json'
            };
            // First try authed call with user if they are authed
            // Fall back to unauthed call from user
            // If user has 0 GH API requests left, use my personal token to make an authed call
            // From there, you're fucked and will just have to wait for your X-RateLimit-Reset time to elapse
            if (this.token) {
                headers['Authorization'] = this.headerToken;
            }
            if (this.requestsRemaining === 0) {
                headers['Authorization'] = OSUtil.MY_GH_HEADER_TOKEN;
            }
            return headers;
        },

        getLastPageNum: function (linkHeader) {
            var lastPageItem = _.find(linkHeader.split(','), function(item) { return item.indexOf('rel="last"') != -1; });
            return Number(lastPageItem.slice(lastPageItem.lastIndexOf('page=') + 5, lastPageItem.indexOf('>')));
        },

        fetchAsset: function (url, cb) {
            var self = this;
            var request = $.ajax({
                type: 'GET',
                headers: self.getHeaders(),
                url: url
            }).done(function (data) {
                self.requestsRemaining = Number(request.getResponseHeader('X-RateLimit-Remaining'));
                cb(data);
            });
        },

        fetchLastPage: function (url, cb) {
            var self = this;
            var request = $.ajax({
                type: 'GET',
                headers: self.getHeaders(),
                url: url
            }).done(function(data) {
                self.requestsRemaining = Number(request.getResponseHeader('X-RateLimit-Remaining'));
                cb(data);
            });
        },

        fetchTotalAssetCount: function (url, cb) {
            var self = this;
            var request = $.ajax({
                type: 'GET',
                headers: self.getHeaders(),
                url: url
            }).done(function (data) {
                self.requestsRemaining = Number(request.getResponseHeader('X-RateLimit-Remaining'));
                var linkHeader = request.getResponseHeader('Link');
                if (linkHeader) {
                    var lastPageNum = self.getLastPageNum(linkHeader);
                    var params = '&page=' + lastPageNum;
                    self.fetchLastPage(url + params, function (lastPageData) {
                        var totalCount = 30 * (lastPageNum - 1) + lastPageData.length;
                        cb(totalCount);
                    });
                } else {
                    cb(data.length);
                }
            });
        },

        fetchTotalAssets: function (url, rollingData, lastPageNum, cb) {
            var self = this;
            var request = $.ajax({
                type: 'GET',
                headers: self.getHeaders(),
                url: url
            }).done(function (data) {
                self.requestsRemaining = Number(request.getResponseHeader('X-RateLimit-Remaining'));
                var linkHeader = request.getResponseHeader('Link');
                if (linkHeader) {
                    var pageCount = Number(url.slice(url.length-1));
                    if (pageCount == lastPageNum) {
                        cb(_.union(rollingData, data));
                    } else {
                        pageCount++;
                        if (lastPageNum == null) {
                            lastPageNum = self.getLastPageNum(linkHeader);
                        }
                        rollingData = _.isEmpty(rollingData) ? data : _.union(rollingData, data);
                        var newURL = url.slice(0, url.length-1) + pageCount;
                        self.fetchTotalAssets(newURL, rollingData, lastPageNum, cb);
                    }
                } else {
                    cb(_.union(rollingData, data));
                }
            });
        },

        getContributors: function (username, repo, cb) {
            var self = this;
            var url = this.getURLFor('contributors', username, repo);
            this.fetchTotalAssets(url, [], null, cb);
        },

        getReposForUser: function (username, cb) {
            var self = this;
            var url = this.getURLFor('allUserRepos', username);
            this.fetchAsset(url, cb);
        },

        getRepo: function (username, repo, cb) {
            var self = this;
            var url = this.getURLFor('repo', username, repo);
            this.fetchAsset(url, cb);
        },

        getOpenPRCount: function (username, repo, cb) {
            var self = this;
            var url = this.getURLFor('openPRs', username, repo);
            this.fetchTotalAssetCount(url, cb);
        },

        getClosedPRCount: function (username, repo, cb) {
            var self = this;
            var url = this.getURLFor('closedPRs', username, repo);
            this.fetchTotalAssetCount(url, cb);
        },

        resetStatsObj: function () {
            var self = this;
            if (!this.statsObj) {
                this.statsObj = {
                    last_updated: null,
                    star_count: null,
                    watch_count: null,
                    open_pr_count: null,
                    closed_pr_count: null,
                    open_issues_count: null,
                    forks_count: null
                };
            } else {
                for (var key in this.statsObj) {
                    this.statsObj[key] = null;
                }
            }
        },

        doneFetchingRepoStats: function () {
            var self = this;
            var done = true;
            for (var key in this.statsObj) {
                if (this.statsObj[key] == null) {
                    done = false;
                }
            }
            return done;
        },

        fetchRepoStats: function (username, repo, cb) {
            var self = this;
            this.doneFetchingStats = false;
            this.resetStatsObj();

            this.getRepo(username, repo, function (data) {
                var updatedAtDateUTC = OSUtil.dateToUTC(new Date(data.updated_at));
                self.statsObj.last_updated = OSUtil.getTimeDiff(updatedAtDateUTC);
                self.statsObj.open_issues_count = data.open_issues_count;
                self.statsObj.forks_count = data.forks_count;
                self.statsObj.star_count = data.stargazers_count;
                self.statsObj.watch_count = data.subscribers_count;
                if (!self.doneFetchingStats && self.doneFetchingRepoStats()) {
                    self.doneFetchingStats = true;
                    cb(self.statsObj);
                }
            });

            this.getOpenPRCount(username, repo, function (count) {
                self.statsObj.open_pr_count = count;
                if (!self.doneFetchingStats && self.doneFetchingRepoStats()) {
                    self.doneFetchingStats = true;
                    cb(self.statsObj);
                }
            });

            this.getClosedPRCount(username, repo, function (count) {
                self.statsObj.closed_pr_count = count;
                if (!self.doneFetchingStats && self.doneFetchingRepoStats()) {
                    self.doneFetchingStats = true;
                    cb(self.statsObj);
                }
            });
        }

	};

	return Github;

});
