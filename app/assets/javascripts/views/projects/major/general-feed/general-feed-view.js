define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/major/general-feed/general-feed-view'
    ], function ($,
     Backbone,
     _,
     GeneralFeedViewTpl) {
	'use strict';

	var GeneralFeedView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(GeneralFeedViewTpl());
		}
	});

	return GeneralFeedView;

});
