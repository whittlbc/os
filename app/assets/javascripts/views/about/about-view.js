define(['jquery',
	'backbone',
	'underscore',
	'stache!views/about/about-view'
    ], function ($,
     Backbone,
     _,
     AboutViewTpl) {
	'use strict';

	var AboutView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
      this.$el.html(AboutViewTpl());
		}
	});

	return AboutView;

});
