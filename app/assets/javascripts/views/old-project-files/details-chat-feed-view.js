define(['jquery',
	'backbone',
	'underscore',
    'views/projects/details-chat-message-view',
	'stache!views/projects/details-chat-feed-view'
    ], function ($,
     Backbone,
     _,
     DetailsChatMessageView,
     DetailsChatFeedViewTpl) {
	'use strict';

    var master;

	var DetailsChatFeedView = Backbone.View.extend({

        initialize: function () {
            var self = this;
            master = this;
        },

        populateFeed: function (comments) {
            if (this.CHAT_VIEWS) {
                while (this.CHAT_VIEWS.length > 0) {
                    this.CHAT_VIEWS.pop();
                }
            } else {
                this.CHAT_VIEWS = [];
            }
            for (var i = 0; i < comments.length; i++) {
                this.addComment(comments[i]);
            }
        },

        addComment: function(data) {
            var detailsChatMessageView = new DetailsChatMessageView({
                tagName: 'li'
            });

            detailsChatMessageView.setContent(data);
            detailsChatMessageView.render();
            var detailsChatMessageEl = detailsChatMessageView.el;
            master.$el.find('.details-chat-list').append(detailsChatMessageEl);
            master.CHAT_VIEWS.push(detailsChatMessageView);
        },

		events: {},

		render: function (comments) {
			var self = this;
            this.comments = comments;
            this.$el.html(DetailsChatFeedViewTpl());
            this.populateFeed(comments);
		}
	});

	return DetailsChatFeedView;

});
