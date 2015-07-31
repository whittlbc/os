define(['jquery',
	'backbone',
	'underscore',
	'stache!views/home/lang-selection-view'
    ], function ($,
     Backbone,
     _,
     LangSelectionViewTpl) {
	'use strict';

	var LangSelectionView = Backbone.View.extend({

		initialize: function () {
		},

		events: {
        },

		render: function () {
			var self = this;
            this.$el.html(LangSelectionViewTpl());
		}
	});

	return LangSelectionView;

});
