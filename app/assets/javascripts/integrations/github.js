define(['jquery',
	'backbone',
	'underscore'
    ], function ($,
     Backbone,
     _) {
	'use strict';

	var Github = {

        endpoint: 'https://api.github.com/',

        paramsForAsset: {
            'contributors': '?page=',
            'allContributors': '&page=',
            'openPRs': '&page=',
            'closedPRs': '&page='
        },

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
                    return this.endpoint + 'repos/' + username + '/' + repo + '/contributors';
                    break;
                case 'allContributors':
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
            if (this.token) {
                headers['Authorization'] = this.headerToken;
            }
            return headers;
        },

        getLastPageNum: function (linkHeader) {
            var lastPageItem = _.find(linkHeader.split(','), function(item) { return item.indexOf('rel="last"') != -1; });
            return Number(lastPageItem.slice(lastPageItem.lastIndexOf('page=') + 5, lastPageItem.indexOf('>')));
        },

        fetchAsset: function (url, cb) {
            var self = this;

            $.ajax({
                type: 'GET',
                headers: self.getHeaders(),
                url: url
            }).done(function (data) {
                cb(data);
            });
        },

        fetchLastPage: function (url, cb) {
            var self = this;
            var request = $.ajax({
                type: 'GET',
                headers: self.getHeaders(),
                url: url
            }).done(function(data) { cb(data); });
        },

        fetchTotalAssetCount: function (url, asset, cb) {
            var self = this;
            var request = $.ajax({
                type: 'GET',
                headers: self.getHeaders(),
                url: url
            }).done(function (data) {
                var linkHeader = request.getResponseHeader('Link');

                if (linkHeader) {
                    var lastPageNum = self.getLastPageNum(linkHeader);
                    var params = self.paramsForAsset[asset] + lastPageNum;
                    self.fetchLastPage(url + params, function (lastPageData) {
                        var returnData = {
                            data: (asset === 'contributors') ? data : null,
                            totalCount: 30 * (lastPageNum - 1) + lastPageData.length
                        };
                        cb(returnData);
                    });
                } else {
                    var returnData = {
                        data: (asset === 'contributors') ? data : null,
                        totalCount: data.length
                    };
                    cb(returnData);
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
            this.fetchTotalAssetCount(url, 'contributors', cb);
        },

        getAllContributors: function (username, repo, cb) {
            var self = this;
            var url = this.getURLFor('allContributors', username, repo);
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
            this.fetchTotalAssetCount(url, 'openPRs', cb);
        },

        getClosedPRCount: function (username, repo, cb) {
            var self = this;
            var url = this.getURLFor('closedPRs', username, repo);
            this.fetchTotalAssetCount(url, 'closedPRs', cb);
        }

	};

	return Github;

});
