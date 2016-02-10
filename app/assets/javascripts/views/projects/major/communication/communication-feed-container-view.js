define(['jquery',
  'backbone',
  'views/projects/major/communication/communication-feed-view',
  'stache!views/projects/major/communication/communication-feed-container-view',
  'underscore'
], function ($,
   Backbone,
   CommunicationFeedView,
   CommunicationFeedContainerViewTpl,
   _) {
  'use strict';

  var CommunicationFeedContainerView = Backbone.View.extend({

    initialize: function () {
    },

    passComments: function (data) {
      this.feedView.passComments(data);
    },

    render: function () {
      this.$el.html(CommunicationFeedContainerViewTpl());

      this.feedView = new CommunicationFeedView({
        el: this.$el.find('#feedView')
      });
      this.feedView.render();
    }

  });

  return CommunicationFeedContainerView;

});