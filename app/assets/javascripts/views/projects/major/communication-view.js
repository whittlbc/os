define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/major/communication-view'
    ], function ($,
     Backbone,
     _,
     CommunicationViewTpl) {
	'use strict';

	var CommunicationView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(CommunicationViewTpl());
		}
	});

	return CommunicationView;

});
