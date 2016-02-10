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

      $(document).click(function () {
        Backbone.EventBroker.trigger('comments:hide-empty-replies');
      });
    },

    events: {},

    handleTabSelected: function (index) {
    },

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
      var self = this;

      this.$el.html(CommunicationViewTpl());

      this.communicationTabsView = new CommunicationTabsView({
        el: '#tabsView',
        ufg: this.ufg
      });

      this.listenTo(this.communicationTabsView, 'tab:selected', this.handleTabSelected);

      this.communicationTabsView.render(options);

      this.communicationPanelsView = new CommunicationPanelsView({
        el: '#panelsView',
        ufg: this.ufg
      });

      this.communicationPanelsView.render();
    }
  });

  return CommunicationView;

});
