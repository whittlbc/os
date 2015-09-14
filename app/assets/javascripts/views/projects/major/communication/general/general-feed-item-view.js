define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/communication/communication-feed-item-view',
    'views/widgets/user-info-bubble',
    'models/project',
    'stache!views/projects/major/communication/general/general-feed-item-view',
    'backbone-eventbroker'
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
            this.feed = data.feed;
            this.hasChildren = data.hasChildren;
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

            // Reply Btn Click - Show Comment Area
            this.$el.find('#comment-' + this.commentNumber + ' .comment-reply-btn > span').click(function () {
                self.trigger('all-reply-areas:hide', self);
            });

            // Reply Btn Click - Submit Reply Comment
            this.$el.find('#reply-comment-' + this.commentNumber + ' .reply-comment-btn').click(function () {
                var text = self.$el.find('#reply-comment-' + self.commentNumber + ' .reply-textarea').val();
                if (!_.isEmpty(text)) {
                    Backbone.EventBroker.trigger('comment:add', {
                        text: text,
                        feed: self.feed,
                        parent_id: self.id
                    });
                }
            });

            // Toggle expand children button

            this.$el.find('#comment-' + this.commentNumber + ' .toggle-show-children-btn').click(function () {
                var $icon = self.$el.find('#comment-' + self.commentNumber + ' .toggle-show-children-btn > i');

                //// COLLAPSE CHILDREN
                //if ($icon.hasClass('fa-caret-down')) {
                //    $icon.removeClass('fa-caret-down').addClass('fa-caret-right');
                //    self.collapseChildren();
                //}
                //
                //// EXPAND CHILDREN
                //else {
                //    $icon.removeClass('fa-caret-right').addClass('fa-caret-down');
                //    self.expandChildren();
                //}
            });
        },

        collapseChildren: function () {
            var self = this;

        },

        expandChildren: function () {
            var self = this;

        },

        showReplyArea: function () {
            this.$el.find('#comment-' + this.commentNumber + ' .comment-reply-btn').hide();
            this.$el.find('#reply-comment-' + this.commentNumber).show();
            this.$el.find('#comment-' + this.commentNumber).addClass('reply-container-shown');
        },

        hideReplyArea: function () {
            this.$el.find('#reply-comment-' + this.commentNumber).hide();
            this.$el.find('#comment-' + this.commentNumber + ' .comment-reply-btn').show();
            this.$el.find('#comment-' + this.commentNumber).removeClass('reply-container-shown');
        },

		render: function () {
			var self = this;
            this.$el.html(GeneralFeedItemViewTpl({
                userPic: this.userPic,
                posterGHUsername: this.posterGHUsername,
                voteCount: this.voteCount,
                postTime: this.postTime,
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

	return GeneralFeedItemView;

});
