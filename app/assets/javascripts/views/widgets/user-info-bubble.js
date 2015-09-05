define(['jquery',
	'backbone',
	'underscore',
	'stache!views/widgets/user-info-bubble'
    ], function ($,
     Backbone,
     _,
     UserInfoBubbleTpl) {
	'use strict';

	var UserInfoBubble = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(UserInfoBubbleTpl());
		}
	});

	return UserInfoBubble;

});
