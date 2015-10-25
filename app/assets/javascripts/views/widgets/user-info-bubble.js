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

        render: function (options) {
			var self = this;

            this.$el.click(function (e) {
                e.stopPropagation();
            });

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
