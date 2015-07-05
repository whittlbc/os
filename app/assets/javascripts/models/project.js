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

    var Project = OSModel.extend({

        extension: 'projects',

        create: function(info, options){
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension,
                data: info
            });

            return this.sync('create', this, requestInfo);
        }

    });

    return Project;
});
