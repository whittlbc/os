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

	var DetailsChatFeedView = Backbone.View.extend({

        populateFeed: function () {

            if (this.CHAT_VIEWS) {
                while (this.CHAT_VIEWS.length > 0) {
                    this.CHAT_VIEWS.pop();
                }
            } else {
                this.CHAT_VIEWS = [];
            }

            for (var i = 0; i < 5; i++) {
                this.addPost();
            }
        },

        addPost: function() {

            var detailsChatMessageView = new DetailsChatMessageView({
                tagName: 'li'
            });

            detailsChatMessageView.render();

            var detailsChatMessageEl = detailsChatMessageView.el;

            this.$el.find('.details-chat-list').append(detailsChatMessageEl);

            this.CHAT_VIEWS.push(detailsChatMessageView);

        },

		events: {},

		render: function () {
			var self = this;
            this.$el.html(DetailsChatFeedViewTpl());
            this.populateFeed();
		}
	});

	return DetailsChatFeedView;

});
