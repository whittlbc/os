define(['jquery',
    'backbone',
    'underscore',
    'models/project'
], function ($,
     Backbone,
     _,
    Project
) {
    'use strict';

    var CommunicationFeedItemView = Backbone.View.extend({

        initialize: function () {
        },

        events: {},

        handleCommentVote: function () {
            var self = this;
            var $voteCountEl = this.getVoteCountEl();
            var newVoteCount = Number($voteCountEl.html())+1;
            $voteCountEl.html(newVoteCount);
            var project = new Project();
            project.commentVote({id: this.id, new_vote_count: newVoteCount});
        },

        setData: function (data) {
            this.userPic = data.userPic;
            this.posterGHUsername = data.posterGHUsername;
            this.voteCount = data.voteCount;
            this.postTime = data.postTime;
            this.text = data.text;
            this.id = data.id;
            this.parentID = data.parentID;
            this.feed = data.feed;
            this.hasChildren = data.hasChildren;
            this.commentNumber = data.commentNumber;
        },

        addListeners: function () {
            var self = this;
            var $infoBubble = this.getInfoBubbleEl();
            var $posterPic = this.getPosterPicEl();
            var $voteCountContainer = this.getVoteCountContainerEl();
            var $replyBtn = this.getReplyBtnEl();
            var $submitReplyBtn = this.getSubmitReplyBtn();
            var $replyTextarea = this.getReplyTextarea();

            // Hover listener for user info bubble
            $posterPic.hover(function () {
                if (!self.bubbleShown) {
                    $infoBubble.show();
                    self.bubbleShown = true;
                }
            }, function () {
                if (self.bubbleShown) {
                    $infoBubble.hide();
                    self.bubbleShown = false;
                }
            });

            $infoBubble.hover(function () {
                if (!self.bubbleShown) {
                    $infoBubble.show();
                    self.bubbleShown = true;
                }
            }, function () {
                if (self.bubbleShown) {
                    $infoBubble.hide();
                    self.bubbleShown = false;
                }
            });

            // Comment Voting
            $voteCountContainer.click(function () {
                self.handleCommentVote();
            });

            // Reply Btn Click - Show Comment Area
            $replyBtn.click(function () {
                self.trigger('all-reply-areas:hide', self);
            });

            // Reply Btn Click - Submit Reply Comment
            $submitReplyBtn.click(function () {
                var $input = self.getReplyInputEl();
                var text = $input.val();
                if (!_.isEmpty(text)) {
                    Backbone.EventBroker.trigger('comment:add', {
                        text: text,
                        feed: self.feed,
                        parent_id: self.id
                    });
                }
            });

            // Auto-resize reply textarea
            $replyTextarea.on('keyup input', function() {
                $(this).css('height', 'auto').css('height', this.scrollHeight + this.offsetHeight - this.clientHeight + 2);
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
