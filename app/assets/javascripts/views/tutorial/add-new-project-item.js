define(['jquery',
  'backbone',
  'underscore',
  'views/tutorial/tutorial-item',
  'stache!views/tutorial/add-new-project-item'
], function ($,
             Backbone,
             _,
             TutorialItem,
             AddNewProjectItemTpl) {
  'use strict';

  var AddNewProjectItem = TutorialItem.extend({

    initialize: function () {
    },

    render: function () {
      this.$el.html(AddNewProjectItemTpl());
    }
  });

  return AddNewProjectItem;

});
