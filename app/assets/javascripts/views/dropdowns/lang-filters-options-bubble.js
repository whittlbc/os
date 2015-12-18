define(['jquery',
  'backbone',
  'underscore',
  'models/os.util',
  'views/widgets/horizontal-toggle',
  'stache!views/dropdowns/lang-filters-options-bubble',
  'backbone-eventbroker'
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
      options = options || {};
      var self = this;

      this.$el.click(function (e) {
        e.stopPropagation();
      });

      this.$el.html(LangFiltersOptionsBubbleTpl());

      this.hToggle = new HToggle({
        el: '#langFilterScopeToggle',
        id: 'scopeToggle'
      });

      this.listenTo(this.hToggle, 'toggle', function (checked) {
        Backbone.EventBroker.trigger('lang-filters-scope:change', checked);
      });

      this.hToggle.render({
        orSelected: options.orSelected
      });
    }
  });

  return LangFiltersOptionsBubble;

});
