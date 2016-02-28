define(['jquery',
  'backbone',
  'underscore',
  'views/os.view',
  'stache!views/dropdowns/extras-dropdown-view',
  'backbone-eventbroker'
], function ($,
   Backbone,
   _,
   OSView,
   ExtrasDropdownViewTpl) {
  'use strict';

  var ExtrasDropdownView = OSView.extend({

    postInitialize: function () {
    },

    events: {
      'click ul#extrasList > li': 'handleClick'
    },

    handleClick: function (e) {
      e.stopPropagation();
      this.trigger('item:clicked', e.currentTarget.id);
    },

    render: function () {
      this.$el.html(ExtrasDropdownViewTpl({
        showInvite: !!this.currentUser
      }));
    }
  });

  return ExtrasDropdownView;

});
