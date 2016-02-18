define(['jquery',
  'backbone',
  'underscore',
  'models/session',
  'views/projects/major/implementation/implementation-view',
  'views/projects/major/communication/communication-feed-container-view',
  'stache!views/projects/major/communication/communication-panels-view',
  'backbone-eventbroker'
], function ($,
   Backbone,
   _,
   Session,
   ImplementationView,
   CommunicationFeedContainerView,
   CommunicationPanelsViewTpl) {
  'use strict';

  var CommunicationPanelsView = Backbone.View.extend({

    initialize: function (options) {
      options = options || {};

      this.ufg = options.ufg;
      this.isIdea = options.isIdea;
      this.showComments = !this.ufg;
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
      $textarea.blur();

      this.shouldSubmitComment = false;
    },

    showNewComment: function (data) {
      this.feedContainerView.passComments(data);
    },

    passComments: function (data) {
      if (!this.showComments) {
        this.showComments = true;
        this.render();
      }

      this.feedContainerView.passComments(data);
    },

    passImplementations: function (data) {
      if (this.showComments) {
        this.showComments = false;
        this.render();
      }

      this.implementationView.populate(data);
    },

    controlEnter: function (e) {
      return e.keyCode == 13 && ((Session.isMac() && e.metaKey) || (!Session.isMac() && e.ctrlKey));
    },

    addListeners: function () {
      var self = this;
      var $commentArea = this.$el.find('.comment-textarea');

      $commentArea.keydown(function (e) {
        if (self.controlEnter(e)) {
          self.shouldSubmitComment = true;
        }
      });

      // Auto-resize reply textarea
      $commentArea.on('keyup input', function (e) {
        if (self.shouldSubmitComment) {
          e.preventDefault();
          self.handleAddComment();
          return;
        }

        $(this).css('height', 'auto').css('height', this.scrollHeight + this.offsetHeight - this.clientHeight);
      });
    },

    render: function () {

      this.$el.html(CommunicationPanelsViewTpl({
        showComments: this.showComments
      }));

      this.feedContainerView = new CommunicationFeedContainerView({
        el: this.$el.find('#containerViewBindPoint'),
        isIdea: this.isIdea
      });

      this.feedContainerView.render();

      if (!this.showComments) {
        this.implementationView = new ImplementationView({
          el: this.$el.find('#implementationView')
        });

        this.implementationView.render();
      }

      this.addListeners();
    }
  });

  return CommunicationPanelsView;

});
