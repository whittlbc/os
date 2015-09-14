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

        populateComments: function (comments) {
            var self = this;
            var $mainCommentList = this.$el.find('#generalFeedListView');
            $mainCommentList.empty();
            for (var i = 0; i < comments.length; i++) {
                this.addComment($mainCommentList, comments[i]);
            }
        },

        addComment: function($list, data) {
            var self = this;
            var generalFeedItemView = new GeneralFeedItemView({
                tagName: 'li'
            });
            console.log(data.comment.id);
            generalFeedItemView.setData(data.comment);
            generalFeedItemView.render();
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
            this.$el.html(GeneralFeedViewTpl({
                showNoComments: options && options.showNoComments
            }));
        }
	});

	return GeneralFeedView;

});
