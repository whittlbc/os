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
        'ideas': 'Here you will find ideas for projects posted by people who know of something that could benefit the OSS community but just don\'t have the time to build it themselves. All of these are up for grabs.',
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
