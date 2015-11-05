define(['jquery',
	'backbone',
	'underscore'
    ], function ($,
     Backbone,
     _) {
	'use strict';

	var SVGView = Backbone.View.extend({

		initialize: function () {
		},

        changeColor: function (color) {
            this.$el.find('path').attr('fill', color);
        }

	});

	return SVGView;

});
