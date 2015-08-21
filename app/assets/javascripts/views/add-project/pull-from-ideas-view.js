define(['jquery',
	'backbone',
	'underscore',
	'stache!views/add-project/pull-from-ideas-view'
    ], function ($,
     Backbone,
     _,
     PullFromIdeasViewTpl) {
	'use strict';

	var PullFromIdeasView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(PullFromIdeasViewTpl());
		}
	});

	return PullFromIdeasView;

});
