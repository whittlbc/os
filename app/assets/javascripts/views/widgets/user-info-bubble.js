define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
	'stache!views/widgets/user-info-bubble'
    ], function ($,
     Backbone,
     _,
     OSUtil,
     UserInfoBubbleTpl) {
	'use strict';

	var UserInfoBubble = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

        fadeIn: function () {
            this.$el.show();
            this.$el.animate({opacity: 1}, 100);
        },

        fadeOut: function () {
            var self = this;
            this.$el.animate({opacity: 0}, 100);
            setTimeout(function () {
                self.$el.hide();
            }, 100);
        },

        render: function (options) {
			var self = this;

            var ghUsername = options && options.ghUsername ? options.ghUsername : '';

            this.$el.html(UserInfoBubbleTpl({
                userPic: options && options.userPic ? options.userPic : OSUtil.NO_USER_PIC,
                ghUsername: ghUsername,
                showLink: !_.isEmpty(ghUsername),
                ghProfile: 'https://github.com/' + ghUsername
            }));
		}
	});

	return UserInfoBubble;

});
