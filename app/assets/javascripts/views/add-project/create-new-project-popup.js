define(['jquery',
	'backbone',
	'underscore',
	'stache!views/add-project/create-new-project-popup',
    'owl-carousel'
    ], function ($,
     Backbone,
     _,
     IndexViewTpl) {
	'use strict';

	var CreateNewProjectPopup = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(IndexViewTpl());
            this.$el.find("#owl-example").owlCarousel({
                autoPlay: false,
                rewindNav: false,
                autoHeight: false,
                slideSpeed: 400,
                paginationSpeed: 400,
                items: 1,
                itemsDesktopSmall: [1199, 1],
                itemsTablet: [977, 1],
                mouseDrag: false,
                navigation: false,
                pagination: false,
                navigationText:false
            });
        }
	});

	return CreateNewProjectPopup;

});
