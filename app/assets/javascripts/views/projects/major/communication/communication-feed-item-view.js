define(['jquery',
  'backbone',
  'underscore',
  'views/os.view',
  'models/os.util',
  'models/project',
  'views/widgets/user-info-bubble',
  'stache!views/projects/major/communication/communication-feed-item-view',
  'backbone-eventbroker'
], function ($,
   Backbone,
   _,
   OSView,
   OSUtil,
   Project,
   UserInfoBubble,
   CommunicationFeedItemViewTpl
) {
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
      var $voteCountEl = this.$el.find('#comment-' + this.commentNumber + ' .comment-vote-count-container > span');
      var newVoteCount = Number($voteCountEl.html()) + 1;
      $voteCountEl.html(newVoteCount);
      var $voteCountContainer = this.$el.find('#comment-' + this.commentNumber + ' .comment-vote-count-container');
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
      var $infoBubble = this.$el.find('#comment-' + this.commentNumber + ' .poster-info-bubble');
      if (!this.bubbleShown) {
        $infoBubble.show();
        this.bubbleShown = true;
      }
    },

    hideBubble: function () {
      var self = this;
      var $infoBubble = this.$el.find('#comment-' + this.commentNumber + ' .poster-info-bubble');
      if (this.bubbleShown) {
        $infoBubble.hide();
        this.bubbleShown = false;
      }
    },

    addListeners: function () {
      var self = this;
      var $comment = this.$el.find('#comment-' + this.commentNumber);
      var $infoBubble = this.$el.find('#comment-' + this.commentNumber + ' .poster-info-bubble');
      var $trashcan = this.$el.find('#comment-' + this.commentNumber + ' .delete-comment-icon');
      var $posterPic = this.$el.find('#comment-' + this.commentNumber + ' .comment-poster-pic');
      var $voteCountContainer = this.$el.find('#comment-' + this.commentNumber + ' .comment-vote-count-container');
      var $replyBtn = this.$el.find('#comment-' + this.commentNumber + ' .comment-reply-btn');
      var $submitReplyBtn = this.$el.find('#reply-comment-' + this.commentNumber + ' .reply-comment-btn');
      var $replyTextarea = this.$el.find('#reply-comment-' + this.commentNumber + ' textarea');

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
        var $input = self.$el.find('#reply-comment-' + self.commentNumber + ' .reply-textarea');
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
      var $replyBtn = this.$el.find('#comment-' + this.commentNumber + ' .comment-reply-btn');
      var $replyCommentContainer = this.$el.find('#reply-comment-' + this.commentNumber);
      var $comment = this.$el.find('#comment-' + this.commentNumber);
      $replyBtn.hide();
      $replyCommentContainer.show();
      $comment.addClass('reply-container-shown');
    },

    hideReplyArea: function () {
      var $replyBtn = this.$el.find('#comment-' + this.commentNumber + ' .comment-reply-btn');
      var $replyCommentContainer = this.$el.find('#reply-comment-' + this.commentNumber);
      var $comment = this.$el.find('#comment-' + this.commentNumber);
      $replyBtn.show();
      $replyCommentContainer.hide();
      $comment.removeClass('reply-container-shown');
    },

    render: function () {
      var self = this;

      this.$el.html(CommunicationFeedItemViewTpl({
        userPic: this.userPic,
        posterGHUsername: this.posterGHUsername,
        voteCount: this.voteCount,
        voted: this.voted,
        postTime: this.postTime,
        isPoster: this.isPoster,
        text: this.text,
        hasChildren: this.hasChildren,
        commentNumber: this.commentNumber
      }));

      this.addListeners();

      this.userInfoBubble = new UserInfoBubble({
        el: this.$el.find('#comment-' + this.commentNumber + ' .poster-info-bubble')
      });

      this.userInfoBubble.render({
        userPic: this.userPic,
        ghUsername: this.posterGHUsername
      });
    }

  });

  return CommunicationFeedItemView;

});
