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

		render: function (options) {
            console.log(options);
			var self = this;
            this.$el.html(MajorInfoViewTpl({
                title: options && options.title ? options.title : '',
                subtitle: "A JavaScript library designed to be so much better than your ordinary JS library",
                description: options && options.description ? options.description : '',
            }));
		}
	});

	return MajorInfoView;

});
