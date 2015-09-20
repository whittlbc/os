define(['jquery',
    'backbone',
    'underscore',
    'models/os.model',
    'backbone-eventbroker'
    ], function (
    $,
    Backbone,
    _,
    OSModel
) {
    'use strict';

    var Project = OSModel.extend({

        extension: 'projects',

        create: function(info, options){
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension,
                data: info
            });

            return this.sync('create', this, requestInfo);
        },

        fetchFeedProjects: function(info, options){
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension + '/feed',
                data: info
            });

            return this.sync('fetchFeedProjects', this, requestInfo);
        },

        pullFromIdeas: function(options){
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension + '/pullFromIdeas',
            });

            return this.sync('pullFromIdeas', this, requestInfo);
        },

        filteredFeed: function(info, options){
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension + '/filteredFeed',
                data: info
            });

            return this.sync('filteredFeed', this, requestInfo);
        },

        update: function(info, options) {
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension + '/' + this.get('id'),
                data: info
            });

            return this.sync('update', this, requestInfo);
        },

        delete: function(options) {
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension + '/' + this.get('id'),
            });

            return this.sync('delete', this, requestInfo);
        },

        vote: function(info, options) {
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension + '/vote',
                data: info
            });

            return this.sync('vote', this, requestInfo);
        },

        getUniversalSearchData: function(options) {
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension + '/universalSearch',
            });

            return this.sync('getUniversalSearchData', this, requestInfo);
        },

        fetchDetails: function(info, options) {
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension + '/fetchDetails',
                data: info
            });

            return this.sync('fetchDetails', this, requestInfo);
        },

        join: function(info, options) {
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension + '/join',
                data: info
            });

            return this.sync('join', this, requestInfo);
        },

        launch: function(info, options) {
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension + '/launch',
                data: info
            });

            return this.sync('launch', this, requestInfo);
        },

        getUpForGrabs: function(info, options) {
            var requestInfo = options || {};
            info.status = 0; // only getting up-for-grabs projects here

            _.extend(requestInfo, {
                url: this.extension + '/getUpForGrabs',
                data: info
            });

            return this.sync('getUpForGrabs', this, requestInfo);
        },

        fetchGHContributors: function(info, options) {
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension + '/fetchGHContributors',
                data: info
            });

            return this.sync('fetchGHContributors', this, requestInfo);
        },

        fetchGHRepoStats: function (info, options) {
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension + '/fetchGHRepoStats',
                data: info
            });

            return this.sync('fetchGHRepoStats', this, requestInfo);
        },

        postNewComment: function (info, options) {
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension + '/postNewComment',
                data: info
            });

            return this.sync('postNewComment', this, requestInfo);
        },

        fetchComments: function (info, options) {
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension + '/fetchComments',
                data: info
            });

            return this.sync('fetchComments', this, requestInfo);
        },

        commentVote: function (info, options) {
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension + '/commentVote',
                data: info
            });

            return this.sync('commentVote', this, requestInfo);
        },

        getUpForGrabsDetails: function(info, options) {
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension + '/getUpForGrabsDetails',
                data: info
            });

            return this.sync('getUpForGrabsDetails', this, requestInfo);
        },

        pullProject: function(info, options) {
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension + '/pullProject',
                data: info
            });

            return this.sync('pullProject', this, requestInfo);
        },

        getEvolution: function(info, options) {
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension + '/getEvolution',
                data: info
            });

            return this.sync('getEvolution', this, requestInfo);
        }

    });

    return Project;
});
