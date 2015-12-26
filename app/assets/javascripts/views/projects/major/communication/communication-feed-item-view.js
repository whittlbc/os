define(['jquery',
  'backbone',
  'underscore',
  'views/os.view',
  'models/os.util',
  'models/project',
  'backbone-eventbroker'
], function ($,
             Backbone,
             _,
             OSView,
             OSUtil,
             Project) {
  'use strict';

  var CommunicationFeedItemView = OSView.extend({

    postInitialize: function () {
    },

    events: {},

    checkIfUserAuthed: function (channel) {
      Backbone.EventBroker.trigger(channel, this);
    },

    handleVote: function () {
      var self = this;
      this.voted = true;
      var $voteCountEl = this.getVoteCountEl();
      var newVoteCount = Number($voteCountEl.html()) + 1;
      $voteCountEl.html(newVoteCount);
      var $voteCountContainer = this.getVoteCountContainerEl();
      $voteCountContainer.addClass('voted');

      var project = new Project();
      project.commentVote({comment_uuid: this.uuid, new_vote_count: newVoteCount, user_uuid: this.currentUser.get('uuid')}, {
        success: function (data) {
          Backbone.EventBroker.trigger('updateUpvotedCommentsArray', data);
        }
      });
    },

    setData: function (data) {
      this.userPic = data.userPic;
      this.posterGHUsername = data.posterGHUsername;
      this.posterUUID = data.posterUUID;  // use this to check against current user when you make the switch to uuids
      this.isPoster = this.currentUser ? (this.currentUser.get('uuid') == data.posterUUID) : false;
      this.voteCount = data.voteCount;
      this.voted = data.voted;
      this.postTime = OSUtil.getTimeAgo(data.postTime);
      this.text = data.text;
      this.uuid = data.uuid;
      this.parentUUID = data.parentUUID;
      this.feed = data.feed;
      this.hasChildren = data.hasChildren;
      this.commentNumber = data.commentNumber;
    },

    handleShowReplyInput: function () {
      this.trigger('all-reply-areas:hide', this);
    },

    showBubble: function () {
      var self = this;
      var $infoBubble = this.getInfoBubbleEl();
      if (!this.bubbleShown) {
        $infoBubble.show();
        this.bubbleShown = true;
      }
    },

    hideBubble: function () {
      var self = this;
      var $infoBubble = this.getInfoBubbleEl();
      if (this.bubbleShown) {
        $infoBubble.hide();
        this.bubbleShown = false;
      }
    },

    addListeners: function () {
      var self = this;
      var $comment = this.getCommentEl();
      var $infoBubble = this.getInfoBubbleEl();
      var $trashcan = this.getTrashcanEl();
      var $posterPic = this.getPosterPicEl();
      var $voteCountContainer = this.getVoteCountContainerEl();
      var $replyBtn = this.getReplyBtnEl();
      var $submitReplyBtn = this.getSubmitReplyBtn();
      var $replyTextarea = this.getReplyTextarea();

      // Hover listener for user info bubble
      $comment.hover(function () {
        if (self.isPoster) {
          $trashcan.show();
        }
      }, function () {
        if (self.isPoster) {
          $trashcan.hide();
        }
      });

      // Hover listener for user info bubble
      $posterPic.hover(function () {
        self.showBubble();
      }, function () {
        self.hideBubble();
      });

      $infoBubble.hover(function () {
        self.showBubble();
      }, function () {
        self.hideBubble();
      });

      // Comment Voting
      $voteCountContainer.click(function () {
        self.checkIfUserAuthed('comment:vote');
      });

      // Reply Btn Click - Show Comment Area
      $replyBtn.click(function () {
        self.checkIfUserAuthed('comment:reply');
      });

      // Reply Btn Click - Submit Reply Comment
      $submitReplyBtn.click(function () {
        var $input = self.getReplyInputEl();
        var text = $input.val();
        if (!_.isEmpty(text)) {
          Backbone.EventBroker.trigger('comment:add', {
            text: text,
            feed: self.feed,
            parentUUID: self.uuid
          });
        }
      });

      // Auto-resize reply textarea
      $replyTextarea.on('keyup input', function () {
        $(this).css('height', 'auto').css('height', this.scrollHeight + this.offsetHeight - this.clientHeight);
      });

      $trashcan.click(function () {
        Backbone.EventBroker.trigger('comment:delete', {uuid: self.uuid, feed: self.feed});
      });
    },

    showReplyArea: function () {
      var $replyBtn = this.getReplyBtnEl();
      var $replyCommentContainer = this.getReplyCommentContainerEl();
      var $comment = this.getCommentEl();
      $replyBtn.hide();
      $replyCommentContainer.show();
      $comment.addClass('reply-container-shown');
    },

    hideReplyArea: function () {
      var $replyBtn = this.getReplyBtnEl();
      var $replyCommentContainer = this.getReplyCommentContainerEl();
      var $comment = this.getCommentEl();
      $replyBtn.show();
      $replyCommentContainer.hide();
      $comment.removeClass('reply-container-shown');
    }

  });

  return CommunicationFeedItemView;

});
