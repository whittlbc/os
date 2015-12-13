define(['jquery',
  'backbone',
  'underscore',
  'stache!views/widgets/spinner-chasing-dots'
], function ($,
   Backbone,
   _,
   SpinnerChasingDotsTpl) {
  'use strict';

  var SpinnerChasingDots = Backbone.View.extend({

    initialize: function (options) {
      if (options) {
        this.width = options.hasOwnProperty('width') ? options.width : '60px';
        this.height = options.hasOwnProperty('height') ? options.height : '60px';
      }
    },

    events: {},

    render: function () {
      var self = this;
      this.$el.html(SpinnerChasingDotsTpl());
      this.$el.find('.sk-circle').css("width", this.width);
      this.$el.find('.sk-circle').css("height", this.height);
    }
  });

  return SpinnerChasingDots;

});
