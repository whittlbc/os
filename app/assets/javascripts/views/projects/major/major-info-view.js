define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/major/major-info-view'
    ], function ($,
     Backbone,
     _,
     MajorInfoViewTpl) {
	'use strict';

	var MajorInfoView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(MajorInfoViewTpl());
		}
	});

	return MajorInfoView;

});
