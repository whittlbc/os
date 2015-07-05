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

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(DetailsChatFeedViewTpl());

            this.detailsChatMessageView = new DetailsChatMessageView({
                el: '#detailsChatMessageView'
            });

            this.detailsChatMessageView.render();
		}
	});

	return DetailsChatFeedView;

});
