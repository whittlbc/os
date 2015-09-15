define(['jquery',
    'backbone',
    'underscore'
], function ($,
     Backbone,
     _) {
    'use strict';

    var CommunicationFeedView = Backbone.View.extend({

        initialize: function () {
            this.childCommentListCount = 0;
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
            var $mainCommentList = this.getMainListElement();
            $mainCommentList.empty();
            this.commentNumber = 0;
            for (var i = 0; i < comments.length; i++) {
                this.addComment($mainCommentList, comments[i]);
            }
        },

        addComment: function($list, data) {
            var self = this;
            var hasChildren = data.children && data.children.length > 0;
            this.commentNumber++;
            var itemView = this.getFeedItemView();
            data.comment.commentNumber = this.commentNumber;
            itemView.setData(data.comment);

            this.addListeners(itemView);

            itemView.render();

            this.ALL_COMMENTS.push(itemView);
            $list.append(itemView.el);

            if (hasChildren) {
                this.addChildComments(itemView, data.children);
            }
        },

        addListeners: function (view) {
            var self = this;
            this.listenTo(view, 'all-reply-areas:hide', function (commentView) {
                self.hideAllReplyAreas(commentView);
            });
        },

        addChildComments: function (commentView, children) {
            var self = this;

            // create new nested <ul> for child comments
            var $newUL = $('<ul>', {
                class: 'child-comment-list',
                id: 'child-comment-list-' + this.childCommentListCount
            });

            this.childCommentListCount++;

            // append it under the appropriate parent comment
            commentView.$el.append($newUL);

            // add all the child comments
            for (var i = 0; i < children.length; i++) {
                this.addComment($newUL, children[i]);
            }
        },

        passComments: function (comments) {
            comments.length > 0 ? this.populateComments(comments) : this.render({showNoComments: true});
        }

    });

    return CommunicationFeedView;

});
