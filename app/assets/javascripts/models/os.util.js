define(['backbone', 'eventbroker'], function(Backbone) {
    'use strict';

    var OSUtil = {

        hidePopupTimeout: 400,

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
            }
        },

        getProjectIntStatus: function (textType) {
            var self = this;
            if (textType == 'Should Start') {
                return 0
            } else if (textType == 'Started') {
                return 2
            } else {
                return 1;
            }
        },

    };

    return OSUtil;
});