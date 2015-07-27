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

    var Language = OSModel.extend({

        extension: 'languages',

        getAll: function(options){
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension + '/getAll'
            });

            return this.sync('getAll', this, requestInfo);
        },

    });

    return Language;
});
