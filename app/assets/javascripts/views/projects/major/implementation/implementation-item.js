define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/major/implementation/implementation-item'
    ], function ($,
   Backbone,
   _,
   ImplementationItemTpl) {
	'use strict';

	var ImplementationItem = Backbone.View.extend({

		initialize: function (options) {
      options = options || {};
      this.model = options.model;
		},

		render: function () {
      this.$el.html(ImplementationItemTpl(this.model.toJSON()));
		}

	});

	return ImplementationItem;

});
