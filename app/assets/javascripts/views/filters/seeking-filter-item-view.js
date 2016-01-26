define(['jquery',
  'backbone',
  'underscore',
  'stache!views/filters/seeking-filter-item-view'
], function ($,
             Backbone,
             _,
             SeekingFilterItemViewTpl) {
  'use strict';

  var SeekingFilterItemView = Backbone.View.extend({

    initialize: function (options) {
      options = options || {};
      this.name = options.name;
      this.toggleDetailsDuration = 130;
      this.closeBtnDiameter = 18;
    },

    fadeIn: function () {
      var self = this;
      var options = {
        duration: self.toggleDetailsDuration,
        queue: false
      };
      self.$el.find('#removeSeekingFilter-' + self.name).show();
      self.$el.find('#removeSeekingFilter-' + self.name).animate({height: self.closeBtnDiameter}, options);
      self.$el.find('#removeSeekingFilter-' + self.name).animate({width: self.closeBtnDiameter}, options);
      self.$el.find('.name').show();
      self.$el.find('.name').animate({opacity: 1}, options);
    },

    fadeOut: function () {
      var self = this;
      var options = {
        duration: self.toggleDetailsDuration,
        queue: false
      };
      self.$el.find('#removeSeekingFilter-' + self.name).show();
      self.$el.find('#removeSeekingFilter-' + self.name).animate({height: 0}, options);
      self.$el.find('#removeSeekingFilter-' + self.name).animate({width: 0}, options);
      self.$el.find('.name').animate({opacity: 0}, options);
      setTimeout(function () {
        self.$el.find('#removeSeekingFilter-' + self.name).hide();
        self.$el.find('.name').hide();
      }, self.toggleDetailsDuration);
    },

    render: function () {
      var self = this;
      this.$el.html(SeekingFilterItemViewTpl({
        name: self.name
      }));

      this.$el.find('.name').css({
        maxWidth: (window.innerWidth * .155) - 82
      });
    }
  });

  return SeekingFilterItemView;

});
