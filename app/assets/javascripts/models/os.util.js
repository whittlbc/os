define(['backbone', 'backbone-eventbroker'], function(Backbone) {
    'use strict';

    var OSUtil = {

        REQUEST_PRIVACY: 'request',
        OPEN_PRIVACY: 'open',

        hidePopupTimeout: 400,

        PROJECT_TYPES: [
            'Up for Grabs',
            'On the Fence',
            'Launched'
        ],

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

        NAV_TABS: ['shouldStartType', 'startingType', 'startedType'],

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
            },
            'fetchDetails': {
                verb: 'GET',
                action: 'read'
            },
            'addComment': {
                verb: 'POST',
                action: 'create'
            },
            'join': {
                verb: 'POST',
                action: 'create'
            },
            'launch': {
                verb: 'POST',
                action: 'create'
            },
            'getRepoDetails': {
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