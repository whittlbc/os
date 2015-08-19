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
            var allDone = options.breadCrumb1Done && options.breadCrumb2Done && options.breadCrumb3Done;
            this.$el.html(BreadCrumbViewTpl({
                breadCrumb1Clickable: !allDone && options.breadCrumb1Clickable,
                breadCrumb2Clickable: !allDone && options.breadCrumb2Clickable,
                breadCrumb3Clickable: !allDone && options.breadCrumb3Clickable,
                breadCrumb1Done: options.breadCrumb1Done,
                breadCrumb2Done: options.breadCrumb2Done,
                breadCrumb3Done: options.breadCrumb3Done,
                breadCrumb1Current: options.breadCrumb1Current,
                breadCrumb2Current: options.breadCrumb2Current,
                breadCrumb3Current: options.breadCrumb3Current
            }));
		}
	});

	return BreadCrumbView;

});
