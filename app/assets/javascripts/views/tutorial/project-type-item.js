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
        'up-for-grabs': 'Here you will find ideas for projects posted by people who think something should be built but just don\'t have the time to do it themselves. All of these are up for grabs.',
        'on-the-fence': 'Here you will find posts made by people who are on the fence about starting a project (want some feedback, looking to form a team first, etc.). This is a good place for gauging community interest before taking the time to actually build out a project.',
        'launched': 'Here you will find projects that have already been launched, but whose maintainer is either looking for more users or more contributors.'
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
