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

  var Suggestion = OSModel.extend({

    extension: 'suggestions',

    create: function (info, options) {
      var requestInfo = options || {};
      info.uuid = this.get('uuid');

      _.extend(requestInfo, {
        url: this.extension,
        data: info
      });

      return this.sync('create', this, requestInfo);
    }

  });

  return Suggestion;
});
