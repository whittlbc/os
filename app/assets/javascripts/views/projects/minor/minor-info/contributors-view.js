define(['jquery',
	'backbone',
	'underscore',
    'stache!views/projects/minor/minor-info/contributors-view'
    ], function ($,
     Backbone,
     _,
     ContributorsViewTpl) {
	'use strict';

	var ContributorsView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(ContributorsViewTpl());
		}
	});

	return ContributorsView;

});
