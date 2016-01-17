define(['jquery',
  'backbone',
  'underscore'
], function ($,
   Backbone,
   _) {
  'use strict';

  var ModalView = Backbone.View.extend({

    initialize: function () {
    },

    events: {},

    showModal: function (preventClickOff, cb) {
      if (preventClickOff) {
        this.$modal.modal({backdrop: false, keyboard: false})
      } else {
        this.$modal.modal({backdrop: true});
      }
      if (cb) {
        cb();
      }
    },

    hideModal: function () {
      this.$modal.modal('hide');
    }

  });

  return ModalView;

});
