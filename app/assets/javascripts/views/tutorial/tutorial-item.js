define(['jquery',
	'backbone',
	'underscore',
  'backbone-eventbroker'
    ], function ($,
     Backbone,
     _) {
	'use strict';

	var TutorialItem = Backbone.View.extend({

		initialize: function () {
      Backbone.EventBroket.register({
        'window:resize': 'setPosition'
      }, this);
    },

    events: {
      'click .confirm-tutorial-item': 'triggerNext',
      'click .skip-tutorial-btn': 'heardSkipTutorial'
    },

    triggerNext: function () {
      if (!this.clicked) {
        this.clicked = true;
        this.trigger('next');
      }
    },

    heardSkipTutorial: function () {
      this.trigger('tutorial:skip');
    },

    showItem: function () {
      var self = this;
      this.render();

      this.setPosition();

      this.$el.show();

      setTimeout(function () {
        self.$el.find('.tutorial-bubble-container').css('opacity', 1);

        if (self.footerItem) {
          $('.filter-choice-container').addClass('show-filter-btns');
          self.showFiltersTimeout = setTimeout(function () {
            self.showingFilters = true;
            Backbone.EventBroker.trigger('show-lang-tutorial-filters');
          }, 5);
        }
      }, 50);

    },

    setPosition: function () {
      var $bubbleContainer = this.$el.find('.tutorial-bubble-container');
      var left = ($bubbleContainer.parent().width() - $bubbleContainer.width()) / 2;
      $bubbleContainer.css('left', left);
    },

    hideItem: function () {
      var self = this;

      this.$el.find('.tutorial-bubble-container').css('opacity', 0);

      if (this.footerItem) {
        $('.filter-choice-container').removeClass('show-filter-btns');
        if (!this.showingFilters) {
          clearTimeout(this.showFiltersTimeout);
        } else {
          Backbone.EventBroker.trigger('hide-tutorial-filters');
          this.showingFilters = false;
        }
      }

      setTimeout(function () {
        self.$el.hide();
      }, 310);
    }

	});

	return TutorialItem;

});
