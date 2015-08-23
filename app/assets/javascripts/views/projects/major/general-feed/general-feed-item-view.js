define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/major/general-feed/general-feed-item-view'
    ], function ($,
     Backbone,
     _,
     GeneralFeedItemViewTpl) {
	'use strict';

	var GeneralFeedItemView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(GeneralFeedItemViewTpl());
		}
	});

	return GeneralFeedItemView;

});
