define(['jquery',
    'backbone',
    'underscore',
    'models/os.model',
    'eventbroker'
    ], function (
    $,
    Backbone,
    _,
    OSModel
) {
    'use strict';

    var User = OSModel.extend({

        extension: 'users',

        create: function(info, options){
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension,
                data: info
            });

            return this.sync('create', this, requestInfo);
        },

        read: function(options){
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension + '/all'
            });

            return this.sync('read', this, requestInfo);
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
        }
    });

    return User;
});
