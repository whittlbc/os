define(['backbone', 'eventbroker'], function(Backbone) {
    'use strict';

    var OSUtil = {

        hidePopupTimeout: 400,

        LICENSES: ['MIT', 'GPL', 'BSD'],

        SHOULD_START: {
            str: 'Should Start',
            num: 0
        },

        STARTING: {
            str: 'Starting',
            num: 1
        },

        STARTED: {
            str: 'Started',
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