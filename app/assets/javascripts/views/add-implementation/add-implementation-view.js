define(['jquery',
	'backbone',
	'underscore',
	'stache!views/add-implementation/add-implementation-view'
    ], function ($,
     Backbone,
     _,
     AddImplementationViewTpl) {
	'use strict';

	var AddImplementationView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			this.$el.html(AddImplementationViewTpl());
		}
	});

	return AddImplementationView;

});
