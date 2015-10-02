define(['jquery',
	'backbone',
	'underscore',
	'stache!views/not-found/404'
    ], function ($,
     Backbone,
     _,
     View404Tpl) {
	'use strict';

	var View404 = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(View404Tpl());
		}
	});

	return View404;

});
