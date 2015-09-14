define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/communication/communication-feed-item-view',
    'views/widgets/user-info-bubble',
    'models/project',
    'stache!views/projects/major/communication/general/general-feed-item-view'
    ], function ($,
     Backbone,
     _,
     CommunicationFeedItemView,
     UserInfoBubble,
     Project,
     GeneralFeedItemViewTpl) {
	'use strict';

	var GeneralFeedItemView = CommunicationFeedItemView.extend({

		initialize: function () {
		},

		events: {
        },

        handleCommentVote: function () {
            var self = this;
            var $voteCountEl = this.$el.find('#comment-' + this.commentNumber + ' .comment-vote-count');
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
            this.commentNumber = data.commentNumber;
        },

        addListeners: function () {
            var self = this;
            var $infoBubble = this.$el.find('#comment-' + this.commentNumber + ' .poster-info-bubble');

            // Hover listener for user info bubble
            this.$el.find('#comment-' + this.commentNumber + ' .comment-poster-pic').hover(function () {
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
            this.$el.find('#comment-' + this.commentNumber + ' .comment-vote-count-container').click(function () {
                self.handleCommentVote();
            });

            // Reply Btn Click
            this.$el.find('#comment-' + this.commentNumber + ' .comment-reply-btn > span').click(function () {
                self.trigger('all-reply-areas:hide', self);
            });
        },

        showReplyArea: function () {
            this.$el.find('#comment-' + this.commentNumber + ' .comment-reply-btn').hide();
            this.$el.find('#reply-comment-' + this.commentNumber).show();
        },

        hideReplyArea: function () {
            this.$el.find('#reply-comment-' + this.commentNumber).hide();
            this.$el.find('#comment-' + this.commentNumber + ' .comment-reply-btn').show();
        },

		render: function () {
			var self = this;
            this.$el.html(GeneralFeedItemViewTpl({
                userPic: this.userPic,
                posterGHUsername: this.posterGHUsername,
                voteCount: this.voteCount,
                postTime: this.postTime,
                text: this.text,
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

	return GeneralFeedItemView;

});
