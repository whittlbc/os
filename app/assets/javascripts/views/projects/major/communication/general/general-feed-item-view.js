define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/communication/communication-feed-item-view',
    'views/widgets/user-info-bubble',
    'stache!views/projects/major/communication/general/general-feed-item-view',
    'backbone-eventbroker'
    ], function ($,
     Backbone,
     _,
     CommunicationFeedItemView,
     UserInfoBubble,
     GeneralFeedItemViewTpl) {
	'use strict';

	var GeneralFeedItemView = CommunicationFeedItemView.extend({

		events: {
        },

        getCommentEl: function () {
            return this.$el.find('#comment-' + this.commentNumber);
        },

        getVoteCountEl: function () {
            return this.$el.find('#comment-' + this.commentNumber + ' .comment-vote-count-container > span');
        },

        getInfoBubbleEl: function () {
            return this.$el.find('#comment-' + this.commentNumber + ' .poster-info-bubble');
        },

        getPosterPicEl: function () {
            return this.$el.find('#comment-' + this.commentNumber + ' .comment-poster-pic');
        },

        getVoteCountContainerEl: function () {
            return this.$el.find('#comment-' + this.commentNumber + ' .comment-vote-count-container');
        },

        getReplyBtnEl: function () {
            return this.$el.find('#comment-' + this.commentNumber + ' .comment-reply-btn');
        },

        getSubmitReplyBtn: function () {
            return this.$el.find('#reply-comment-' + this.commentNumber + ' .reply-comment-btn');
        },

        getReplyInputEl: function () {
            return this.$el.find('#reply-comment-' + this.commentNumber + ' .reply-textarea');
        },

        getReplyCommentContainerEl: function () {
            return this.$el.find('#reply-comment-' + this.commentNumber);
        },

        getReplyTextarea: function () {
            return this.$el.find('#reply-comment-' + this.commentNumber + ' textarea');
        },

        getTrashcanEl: function () {
            return this.$el.find('#comment-' + this.commentNumber + ' .delete-comment-icon');
        },

		render: function () {
			var self = this;
            this.$el.html(GeneralFeedItemViewTpl({
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

	return GeneralFeedItemView;

});
