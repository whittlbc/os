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
        'ideas': 'Here you will find ideas for projects posted by people either lookng for feedback or initial teammates. You will also find ideas that are Up for Grabs (perfect for members who want to start a project but can\'t think of an idea) &mdash; these are meant to be grabbed and ran with.',
        'launched': 'Here you will find projects that have already been launched whose maintainers are now looking to spread the word about their projects or find more contributors.'

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
