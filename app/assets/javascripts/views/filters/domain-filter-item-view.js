define(['jquery',
  'backbone',
  'underscore',
  'stache!views/filters/domain-filter-item-view',
  'backbone-eventbroker'
], function ($,
             Backbone,
             _,
             DomainFilterItemViewTpl) {
  'use strict';

  var DomainFilterItemView = Backbone.View.extend({

    initialize: function (options) {
      options = options || {};
      this.name = options.name;
      this.toggleDetailsDuration = 130;
      this.closeBtnDiameter = 18;

      Backbone.EventBroker.register({
        'resize-minor-filter-names': 'setMaxWidthForName'
      }, this);
    },

    fadeIn: function () {
      var self = this;
      var options = {
        duration: self.toggleDetailsDuration,
        queue: false
      };
      self.$el.find('#removeDomainFilter-' + self.name).show();
      self.$el.find('#removeDomainFilter-' + self.name).animate({height: self.closeBtnDiameter}, options);
      self.$el.find('#removeDomainFilter-' + self.name).animate({width: self.closeBtnDiameter}, options);
      self.$el.find('.name').show();
      self.$el.find('.name').animate({opacity: 1}, options);
    },

    fadeOut: function () {
      var self = this;
      var options = {
        duration: self.toggleDetailsDuration,
        queue: false
      };
      self.$el.find('#removeDomainFilter-' + self.name).show();
      self.$el.find('#removeDomainFilter-' + self.name).animate({height: 0}, options);
      self.$el.find('#removeDomainFilter-' + self.name).animate({width: 0}, options);
      self.$el.find('.name').animate({opacity: 0}, options);
      setTimeout(function () {
        self.$el.find('#removeDomainFilter-' + self.name).hide();
        self.$el.find('.name').hide();
      }, self.toggleDetailsDuration);
    },

    setMaxWidthForName: function () {
      this.$el.find('.name').css({
        maxWidth: (window.innerWidth * .155) - 82
      });
    },

    render: function () {
      var self = this;

      this.$el.html(DomainFilterItemViewTpl({
        name: self.name
      }));

      this.setMaxWidthForName();
    }
  });

  return DomainFilterItemView;

});
