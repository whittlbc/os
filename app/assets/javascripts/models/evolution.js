define(['jquery',
    'backbone',
    'underscore',
    'models/os.model'
    ], function (
    $,
    Backbone,
    _,
    OSModel
) {
    'use strict';

    var Evolution = OSModel.extend({

        extension: 'evolutions',

        createNewEvolution: function(info, options){
            var requestInfo = options || {};

            _.extend(requestInfo, {
                url: this.extension + '/createNewEvolution',
                data: info
            });

            return this.sync('create', this, requestInfo);
        }

    });

    return Evolution;
});
