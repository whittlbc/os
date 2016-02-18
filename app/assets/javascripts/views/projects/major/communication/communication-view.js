define(['jquery',
  'backbone',
  'underscore',
  'views/projects/major/communication/communication-tabs-view',
  'views/projects/major/communication/communication-panels-view',
  'stache!views/projects/major/communication/communication-view',
  'velocity',
  'tabs'
], function ($,
   Backbone,
   _,
   CommunicationTabsView,
   CommunicationPanelsView,
   CommunicationViewTpl) {
  'use strict';

  var CommunicationView = Backbone.View.extend({

    initialize: function (options) {
      options = options || {};

      this.ufg = options.ufg;
      this.isIdea = options.isIdea;

      $(document).click(function () {
        Backbone.EventBroker.trigger('comments:hide-empty-replies');
      });
    },

    events: {},

    showNewComment: function (data) {
      this.communicationPanelsView.showNewComment(data);
    },

    passComments: function (data) {
      this.communicationPanelsView.passComments(data);
    },

    passImplementations: function (data) {
      this.communicationPanelsView.passImplementations(data);
    },

    render: function (options) {
      this.$el.html(CommunicationViewTpl());

      this.communicationTabsView = new CommunicationTabsView({
        el: '#tabsView',
        ufg: this.ufg
      });

      this.communicationTabsView.render(options);

      this.communicationPanelsView = new CommunicationPanelsView({
        el: '#panelsView',
        ufg: this.ufg,
        isIdea: this.isIdea
      });

      this.communicationPanelsView.render();
    }
  });

  return CommunicationView;

});
