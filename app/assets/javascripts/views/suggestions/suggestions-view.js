define(['jquery',
  'backbone',
  'underscore',
  'views/widgets/spinner-chasing-dots',
  'models/suggestion',
  'stache!views/suggestions/suggestions-view'
], function ($,
   Backbone,
   _,
   Spinner,
   Suggestion,
   SuggestionsViewTpl) {
  'use strict';

  var SuggestionsView = Backbone.View.extend({

    initialize: function () {
    },

    events: {
      'click .submit-btn': 'handleSubmit'
    },

    passUserData: function (user) {
      this.user = user;
    },

    handleSubmit: function () {
      var self = this;

      if (_.isEmpty(this.options)) {
        var text = self.$el.find('.suggestion-textarea').val();

        self.render({ spinnerView: true });

        var suggestion = new Suggestion({ uuid: this.user.user_uuid });

        suggestion.create({ text: text }, {
          success: function () {
            setTimeout(function () {
              self.render({ successView: true });
            }, 250);
          },
          error: function () {
            setTimeout(function () {
              self.render({ errorView: true });
            }, 250);
          }
        });

      } else {
        this.trigger('close');
      }
    },

    render: function (options) {
      options = options || {};
      var self = this;
      this.options = options;

      this.$el.html(SuggestionsViewTpl({
        spinnerView: options.spinnerView,
        successView: options.successView,
        errorView: options.errorView
      }));

      if (options.spinnerView) {
        this.spinner = new Spinner({
          el: '#suggestionsSpinnerView',
          width: '85px',
          height: '85px'
        });

        this.spinner.render();
      }
    }
  });

  return SuggestionsView;

});