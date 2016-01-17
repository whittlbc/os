define(['jquery',
  'backbone',
  'underscore',
  'views/tutorial/tutorial-item',
  'stache!views/tutorial/footer-item'
], function ($,
             Backbone,
             _,
             TutorialItem,
             FooterItemTpl) {
  'use strict';

  var FooterItem = TutorialItem.extend({

    footerItem: true,

    initialize: function () {
    },

    render: function () {
      this.$el.html(FooterItemTpl());
    }
  });

  return FooterItem;

});
