define(['jquery',
  'backbone',
  'underscore',
  'views/projects/major/communication/communication-feed-container-view',
  'stache!views/projects/major/communication/communication-panels-view',
  'backbone-eventbroker'
], function ($,
   Backbone,
   _,
   CommunicationFeedContainerView,
   CommunicationPanelsViewTpl) {
  'use strict';

  var CommunicationPanelsView = Backbone.View.extend({

    initialize: function () {
    },

    events: {
      'click .add-comment-btn': 'checkIfUserAuthedOnPostClick',
      'click .comment-textarea': 'checkIfUserAuthedOnInputClick'
    },

    checkIfUserAuthedOnPostClick: function () {
      Backbone.EventBroker.trigger('post-comment:click', this);
    },

    checkIfUserAuthedOnInputClick: function () {
      Backbone.EventBroker.trigger('comment-input:click', this);
    },

    handleAddComment: function () {
      var self = this;
      var $textarea = this.$el.find('.comment-textarea');
      var text = $textarea.val();

      var data = {
        text: text,
        parent_id: null
      };

      Backbone.EventBroker.trigger('comment:add', data);

      $textarea.val('');
      $textarea.css('height', '31px');
    },

    showNewComment: function (data) {
      this.feedContainerView.passComments(data);
    },

    passComments: function (data) {
      this.feedContainerView.passComments(data);
    },

    //scrollToNewComment: function () {
    //  var self = this;
    //  var feedContainerHeight = this.$el.find('#communicationFeedContainer').height();
    //  $('html, body').animate({scrollTop: feedContainerHeight}, {duration: 500, specialEasing: 'easeInOutCubic'});
    //},

    addListeners: function () {
      var self = this;

      // Auto-resize comment textarea
      this.$el.find('.comment-textarea').on('keyup input', function () {
        $(this).css('height', 'auto').css('height', this.scrollHeight + this.offsetHeight - this.clientHeight);
      });
    },

    render: function () {

      this.$el.html(CommunicationPanelsViewTpl());

      this.feedContainerView = new CommunicationFeedContainerView({
        el: this.$el.find('#containerViewBindPoint')
      });

      this.feedContainerView.render();

      this.addListeners();
    }
  });

  return CommunicationPanelsView;

});
