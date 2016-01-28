define(['jquery',
  'backbone',
  'underscore',
  'stache!views/dropdowns/more-filters-dropup',
  'backbone-eventbroker'
], function ($,
             Backbone,
             _,
             MoreFiltersDropupTpl) {
  'use strict';

  var MoreFiltersDropup = Backbone.View.extend({

    initialize: function () {
      Backbone.EventBroker.register({
      }, this);
    },

    handleClick: function (e) {
      e.stopPropagation();

      var data = {
        id: e.currentTarget.id
      };

      if (e.currentTarget.id === 'removeAll') {
        this.$el.find('#upForGrabsFilter').removeClass('selected');
        this.upForGrabsSelected = false;
      } else {
        var $target = $(e.currentTarget);

        if ($target.hasClass('selected')) {
          $target.removeClass('selected');
          this.upForGrabsSelected = false;
        } else {
          $target.addClass('selected');
          this.upForGrabsSelected = true;
        }

        data.selected = this.upForGrabsSelected;
      }

      this.trigger('item:clicked', data);
    },

    render: function (options) {
      var self = this;
      options = options || {};

      this.$el.html(MoreFiltersDropupTpl({
        showUpForGrabs: options.showUpForGrabs,
        upForGrabsSelected: this.upForGrabsSelected
      }));

      this.$el.find('ul#moreFiltersList > li').click(function (e) {
        self.handleClick(e);
      });

    }
  });

  return MoreFiltersDropup;

});
