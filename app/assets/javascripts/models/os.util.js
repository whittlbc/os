define(['backbone', 'backbone-eventbroker'], function(Backbone) {
    'use strict';

    var OSUtil = {

        HOME_PAGE: 'home',
        PROJECT_PAGE: 'project',

        NO_USER_PIC: '',

        REQUEST_PRIVACY: 'request',
        OPEN_PRIVACY: 'open',

        TYPE_MAP: {
            'up-for-grabs': 'type1',
            'on-the-fence': 'type2',
            'launched': 'type3'
        },

        REVERSE_TYPE_MAP: {
            'type1': 'up-for-grabs',
            'type2': 'on-the-fence',
            'type3': 'launched'
        },

        TYPE_ARRAY: ['type1', 'type2', 'type3'],

        SOURCE_MAP: {
            'gh': 'source1',
            'scratch': 'source2',
            'pull-from-ideas': 'source3'
        },

        REVERSE_SOURCE_MAP: {
            'source1': 'gh',
            'source2': 'scratch',
            'source3': 'pull-from-ideas'
        },

        PROJECT_TYPES: ['up-for-grabs', 'on-the-fence', 'launched'],
        GRAMMATICAL_PROJECT_TYPES: ['Up for Grabs', 'On the Fence', 'Launched'],

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
            },
            'getUpForGrabs': {
                verb: 'GET',
                action: 'read'
            },
            'fetchGHContributors': {
                verb: 'POST',
                action: 'create'
            },
            'fetchGHRepoStats': {
                verb: 'GET',
                action: 'read'
            },
            'postNewComment': {
                verb: 'POST',
                action: 'create'
            },
            'fetchComments': {
                verb: 'GET',
                action: 'read'
            },
            'commentVote': {
                verb: 'PUT',
                action: 'update'
            },
            'getUpForGrabsDetails': {
                verb: 'GET',
                action: 'read'
            },
            'pullProject': {
                verb: 'PUT',
                action: 'update'
            }
        }

    };

    return OSUtil;
});