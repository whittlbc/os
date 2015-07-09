define(['jquery',
    'backbone',
    'underscore',
    'models/os.util',
    'eventbroker'
], function (
    $,
    Backbone,
    _,
    OSUtil
) {
    'use strict';

    var OSModel = Backbone.Model.extend({

        sync: function (method, model, options) {
            options = options || {};

            var requestInfo = _.extend({
                url: options.url,
                type: OSUtil.customMethodMap[method].verb
            }, options);

            //POST and PUTs have request bodies, so let's jsonify them
            if (_.contains(['POST', 'PUT'], requestInfo.type)) {
                requestInfo.contentType = 'application/json';
                requestInfo.data = JSON.stringify(options.data || this.toJSON());
            }

            var success = options.success;
            var error = options.error;
            var customSuccess = function(resp, status, xhr) {
                success(resp, status, xhr);
            };
            var customError = function(resp, status, xhr) {
                error(resp, status, xhr);
            };
            options.success = customSuccess;
            options.error = customError;

            Backbone.sync.apply(this, [OSUtil.customMethodMap[method].action, this, requestInfo]);
        }

    });

    return OSModel;

});