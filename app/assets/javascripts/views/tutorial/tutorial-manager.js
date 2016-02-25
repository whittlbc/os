define(['jquery',
	'backbone',
	'underscore',
  'views/tutorial/project-type-item',
  'views/tutorial/footer-item',
  'views/tutorial/add-new-project-item',
  'views/tutorial/login-item',
  'backbone-eventbroker'
], function ($,
   Backbone,
   _,
   ProjectTypeItem,
   FooterItem,
   AddNewProjectItem,
   LoginItem
) {
	'use strict';

  var CURRENT_ITEM;

	var TutorialManager = Backbone.View.extend({

		initialize: function () {
      var self = this;

      this.items = [
        {
          view: ProjectTypeItem,
          options: {
            type: 'ideas',
            el: '#ideas-tutorial-anchor'
          }
        },
        {
          view: ProjectTypeItem,
          options: {
            type: 'launched',
            el: '#launched-tutorial-anchor'
          }
        },
        {
          view: FooterItem,
          options: {
            el: '#footer-tutorial-anchor'
          }
        },
        {
          view: AddNewProjectItem,
          options: {
            el: '#anp-tutorial-anchor'
          }
        },
        {
          view: LoginItem,
          options: {
            el: '#login-tutorial-anchor'
          }
        }
      ];

      $(window).resize(function () {
        if (self.currentItem) {
          self.currentItem.setPosition();
        }
        Backbone.EventBroker.trigger('window:resize');
      });

		},

    showNextItem: function () {
      // if current item doesn't exist yet, must be just starting
      if (!CURRENT_ITEM) {
        CURRENT_ITEM = this.items[0];
      }
      // otherwise, get the next item in the array and move on
      else {
        var currentItemIndex = this.items.indexOf(CURRENT_ITEM);
        CURRENT_ITEM = this.items[(currentItemIndex + 1)];

        this.currentItem.hideItem();
      }

      this.currentItem = new (CURRENT_ITEM.view)(CURRENT_ITEM.options);

      this.addListener();

      this.currentItem.showItem();
    },

    addListener: function () {
      var self = this;

      this.listenTo(this.currentItem, 'next', function () {
        if (CURRENT_ITEM == _.last(self.items)) {
          self.done();
        } else {
          self.showNextItem();
        }
      });
    },

    done: function () {
      this.currentItem.hideItem();
      $('#tutorialCover').animate({opacity: 0}, 150);
      setTimeout(function () {
        $('#tutorialCover').hide();
        document.body.style.overflow = 'auto';
      }, 155);

      Backbone.EventBroker.trigger('tutorial:done');
    }

	});

	return TutorialManager;

});
