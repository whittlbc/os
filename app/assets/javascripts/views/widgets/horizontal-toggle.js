define(['jquery',
	'backbone',
	'underscore',
	'stache!views/widgets/horizontal-toggle'
  ], function ($,
   Backbone,
   _,
   HorizontalToggleTpl) {
	'use strict';

	var HorizontalToggle = Backbone.View.extend({

		initialize: function (options) {
      options = options || {};
      this.id = options.id || 'hToggleID';
		},

		events: {},

		render: function () {
			var self = this;
      this.$el.html(HorizontalToggleTpl({
        id: this.id
      }));
		}
	});

	return HorizontalToggle;

});
