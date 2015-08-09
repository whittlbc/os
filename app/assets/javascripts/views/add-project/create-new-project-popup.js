define(['jquery',
	'backbone',
	'underscore',
	'stache!views/add-project/create-new-project-popup'
    ], function ($,
     Backbone,
     _,
     IndexViewTpl) {
	'use strict';

	var CreateNewProjectPopup = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(IndexViewTpl());
		}
	});

	return CreateNewProjectPopup;

});
