define(['jquery',
	'backbone',
	'underscore',
    'views/svgs/svg-view',
	'stache!views/svgs/v-ellipsis'
    ], function ($,
     Backbone,
     _,
     SVGView,
     VEllipsisTpl) {
	'use strict';

	var VEllipsis = SVGView.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(VEllipsisTpl());
		}
	});

	return VEllipsis;

});
