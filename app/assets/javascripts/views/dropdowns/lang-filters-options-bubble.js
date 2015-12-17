define(['jquery',
  'backbone',
  'underscore',
  'models/os.util',
  'views/widgets/horizontal-toggle',
  'stache!views/dropdowns/lang-filters-options-bubble'
], function ($,
   Backbone,
   _,
   OSUtil,
   HToggle,
   LangFiltersOptionsBubbleTpl) {
  'use strict';

  var LangFiltersOptionsBubble = Backbone.View.extend({

    initialize: function () {
    },

    events: {
    },

    render: function (options) {
      var self = this;

      this.$el.click(function (e) {
        e.stopPropagation();
      });

      this.$el.html(LangFiltersOptionsBubbleTpl());

      this.hToggle = new HToggle({
        el: '#langFilterScopeToggle',
        id: 'scopeToggle'
      });

      this.hToggle.render();
    }
  });

  return LangFiltersOptionsBubble;

});
