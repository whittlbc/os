define(['jquery',
	'backbone',
	'underscore',
	'stache!views/add-project/add-project-details-view'
    ], function ($,
     Backbone,
     _,
     AddProjectDetailsViewTpl) {
	'use strict';

	var AddProjectDetailsView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

        setHeight: function (height) {
            var self = this;
            this.$el.find('.add-project-details-view').height(height);
        },

		render: function () {
			var self = this;
            this.$el.html(AddProjectDetailsViewTpl());
		}
	});

	return AddProjectDetailsView;

});
