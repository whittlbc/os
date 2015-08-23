define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/major/general-feed/general-feed-container-view'
    ], function ($,
     Backbone,
     _,
     GeneralFeedContainerViewTpl) {
	'use strict';

	var GeneralFeedContainerView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(GeneralFeedContainerViewTpl());
		}
	});

	return GeneralFeedContainerView;

});
