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

  var Implementation = OSModel.extend();

  return Implementation;

});
