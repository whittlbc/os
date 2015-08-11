define(['jquery',
	'backbone',
	'underscore',
	'stache!views/add-project/breadcrumb-view'
    ], function ($,
     Backbone,
     _,
     BreadCrumbViewTpl) {
	'use strict';

	var BreadCrumbView = Backbone.View.extend({

		initialize: function () {
		},

		events: {
            'click .create-project-breadcrumb': 'handleBreadCrumbClick'
        },

        handleBreadCrumbClick: function (e) {
            var self = this;
            if (_.contains(e.currentTarget.classList, 'breadcrumb-clickable')) {
                this.trigger('breadCrumbNav', e.currentTarget.id);
            }
        },

		render: function (options) {
			var self = this;
            this.$el.html(BreadCrumbViewTpl({
                breadCrumb1Clickable: options.breadCrumb1Clickable,
                breadCrumb2Clickable: options.breadCrumb2Clickable,
                breadCrumb3Clickable: options.breadCrumb3Clickable,
                breadCrumb1Done: options.breadCrumb1Done,
                breadCrumb2Done: options.breadCrumb2Done,
                breadCrumb3Done: options.breadCrumb3Done
            }));
		}
	});

	return BreadCrumbView;

});
