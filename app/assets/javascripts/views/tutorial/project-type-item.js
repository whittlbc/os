define(['jquery',
  'backbone',
  'underscore',
  'views/tutorial/tutorial-item',
  'stache!views/tutorial/project-type-item'
], function ($,
   Backbone,
   _,
   TutorialItem,
   ProjectTypeItemTpl) {
  'use strict';

  var ProjectTypeItem = TutorialItem.extend({

    initialize: function (options) {
      options = options || {};

      var textToTypeMap = {
        'ideas': 'Here you will find a collection of project ideas formed by the community. Some are posted by members seeking feedback or initial teammates, while others are completely Up for Grabs (aka. take it and run with it).',
        'launched': 'Here you will find projects that have already been launched and are now seeking support in many possible ways (feedback, more users, more contributors, new maintainer, etc.)'
      };

      this.text = textToTypeMap[options.type];
    },

    render: function () {
      this.$el.html(ProjectTypeItemTpl({
        text: this.text
      }));
    }
  });

  return ProjectTypeItem;

});
