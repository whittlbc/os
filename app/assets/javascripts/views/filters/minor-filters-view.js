define(['jquery',
	'backbone',
	'underscore',
	'stache!views/filters/minor-filters-view'
    ], function ($,
     Backbone,
     _,
     MinorFiltersViewTpl) {
	'use strict';

	var MinorFiltersView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(MinorFiltersViewTpl());
		}
	});

	return MinorFiltersView;

});
