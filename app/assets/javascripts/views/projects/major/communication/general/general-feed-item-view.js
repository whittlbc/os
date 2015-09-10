define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/communication/communication-feed-item-view',
    'views/widgets/user-info-bubble',
    'stache!views/projects/major/communication/general/general-feed-item-view'
    ], function ($,
     Backbone,
     _,
     CommunicationFeedItemView,
     UserInfoBubble,
     GeneralFeedItemViewTpl) {
	'use strict';

	var GeneralFeedItemView = CommunicationFeedItemView.extend({

		initialize: function () {
		},

		events: {},

        setData: function () {
            var self = this;
        },

        addHoverListeners: function () {
            var self = this;

            this.$el.find('.comment-poster-pic').hover(function () {
                if (!self.bubbleShown) {
                    self.$el.find('.poster-info-bubble').show();
                    self.bubbleShown = true;
                }
            }, function () {
                if (self.bubbleShown) {
                    self.$el.find('.poster-info-bubble').hide();
                    self.bubbleShown = false;
                }
            });

            this.$el.find('.poster-info-bubble').hover(function () {
                if (!self.bubbleShown) {
                    self.$el.find('.poster-info-bubble').show();
                    self.bubbleShown = true;
                }
            }, function () {
                if (self.bubbleShown) {
                    self.$el.find('.poster-info-bubble').hide();
                    self.bubbleShown = false;
                }
            });
        },

		render: function () {
			var self = this;
            this.$el.html(GeneralFeedItemViewTpl());
            this.addHoverListeners();

            this.userInfoBubble = new UserInfoBubble({
                el: this.$el.find('.poster-info-bubble')
            });

            this.userInfoBubble.render({
                userPic: 'https://avatars.githubusercontent.com/u/6496306?v=3',
                ghUsername: 'whittlbc'
            });
        }
	});

	return GeneralFeedItemView;

});
