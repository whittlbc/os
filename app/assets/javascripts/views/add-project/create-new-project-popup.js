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
            this.popupHeight = 450;
		},

		events: {},

        setSizeForPopup: function () {
            var self = this;
            this.$el.find('#createNewProjectModalBody').height(this.popupHeight);
            this.$popup.height(this.popupHeight-50);
        },

		render: function () {
			var self = this;
            this.$el.html(IndexViewTpl());
            this.$popup = this.$el.find("#popup-owl");
            this.$popup.owlCarousel({
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
            this.setSizeForPopup();
        }
	});

	return CreateNewProjectPopup;

});
