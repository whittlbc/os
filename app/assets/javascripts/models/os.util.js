define(['backbone', 'eventbroker'], function(Backbone) {
    'use strict';

    var OSUtil = {

        hidePopupTimeout: 400,

        SHOULD_START: {
            str: 'shouldStart',
            num: 0
        },

        STARTING: {
            str: 'starting',
            num: 1
        },

        STARTED: {
            str: 'started',
            num: 2
        },

        customMethodMap: {
            'create': {
                verb: 'POST',
                action: 'create'
            },
            'update': {
                verb: 'PUT',
                action: 'update'
            },
            'patch': {
                verb: 'PATCH',
                action: 'update'
            },
            'read': {
                verb: 'GET',
                action: 'read'
            },
            'delete': {
                verb: 'DELETE',
                action: 'delete'
            },
            'fetchFeedProjects': {
                verb: 'GET',
                action: 'read'
            },
            'login': {
                verb: 'GET',
                action: 'read'
            },
            'checkUsername': {
                verb: 'GET',
                action: 'read'
            },
            'postGHCode': {
                verb: 'POST',
                action: 'create'
            },
            'getByGHUsername': {
                verb: 'GET',
                action: 'read'
            },
            'createByGH': {
                verb: 'POST',
                action: 'create'
            },
            'getAllUserRepos': {
                verb: 'GET',
                action: 'read'
            },
            'pullFromIdeas': {
                verb: 'GET',
                action: 'read'
            },
            'filteredFeed': {
                verb: 'POST',
                action: 'create'
            },
            'vote': {
                verb: 'PUT',
                action: 'update'
            },
            'getAll': {
                verb: 'GET',
                action: 'read'
            },
            'getUniversalSearchData': {
                verb: 'GET',
                action: 'read'
            }
        },

        getProjectIntStatus: function (textType) {
            var self = this;
            if (textType == this.SHOULD_START.str) {
                return 0
            } else if (textType == this.STARTED.str) {
                return 2
            } else {
                return 1;
            }
        },

    };

    return OSUtil;
});