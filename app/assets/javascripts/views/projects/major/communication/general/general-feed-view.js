define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/communication/communication-feed-view',
    'views/projects/major/communication/general/general-feed-item-view',
	'stache!views/projects/major/communication/general/general-feed-view'
    ], function ($,
     Backbone,
     _,
     CommunicationFeedView,
     GeneralFeedItemView,
     GeneralFeedViewTpl) {
	'use strict';

	var GeneralFeedView = CommunicationFeedView.extend({

		initialize: function () {
		},

		events: {},

        hideAllReplyAreas: function (commentView) {
            var self = this;
            for (var i = 0; i < this.ALL_COMMENTS.length; i++) {
                this.ALL_COMMENTS[i].hideReplyArea();
            }
            commentView.showReplyArea();
        },

        populateComments: function (comments) {
            var self = this;
            if (this.noCommentsShown) {
                this.render();
            }
            this.ALL_COMMENTS = [];
            var $mainCommentList = this.$el.find('#generalFeedListView');
            $mainCommentList.empty();
            this.commentNumber = 0;
            for (var i = 0; i < comments.length; i++) {
                this.addComment($mainCommentList, comments[i]);
            }
        },

        addComment: function($list, data) {
            var self = this;
            this.commentNumber++;
            var generalFeedItemView = new GeneralFeedItemView({
                tagName: 'li'
            });
            data.comment.commentNumber = this.commentNumber;
            generalFeedItemView.setData(data.comment);
            this.listenTo(generalFeedItemView, 'all-reply-areas:hide', function (commentView) {
                self.hideAllReplyAreas(commentView);
            });
            generalFeedItemView.render();
            this.ALL_COMMENTS.push(generalFeedItemView);
            $list.append(generalFeedItemView.el);
            if (data.children && data.children.length > 0) {
                this.addChildComments(generalFeedItemView, data.children);
            }
        },

        addChildComments: function (commentView, children) {
            var self = this;

            // create new nested <ul> for child comments
            var $newUL = $('<ul>', {
                class: 'child-comment-list'
            });

            // append it under the appropriate parent comment
            commentView.$el.append($newUL);

            // add all the child comments
            for (var i = 0; i < children.length; i++) {
                this.addComment($newUL, children[i]);
            }
        },

        passComments: function (comments) {
            comments.length > 0 ? this.populateComments(comments) : this.render({showNoComments: true});
        },

        render: function (options) {
			var self = this;
            this.noCommentsShown = options && options.showNoComments;
            this.$el.html(GeneralFeedViewTpl({
                showNoComments: this.noCommentsShown
            }));
        }
	});

	return GeneralFeedView;

});
