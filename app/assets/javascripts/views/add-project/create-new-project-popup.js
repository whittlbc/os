define(['jquery',
	'backbone',
	'underscore',
    'views/add-project/select-project-type-view',
    'views/add-project/select-project-source-view',
    'views/add-project/add-project-details-view',
    'stache!views/add-project/create-new-project-popup',
    'owl-carousel'
    ], function ($,
     Backbone,
     _,
     SelectProjectTypeView,
     SelectProjectSourceView,
     AddProjectDetailsView,
     IndexViewTpl) {
	'use strict';

	var CreateNewProjectPopup = Backbone.View.extend({

		initialize: function () {
            this.popupContainerHeight = 450;
            this.popupHeight = this.popupContainerHeight - 50;

            // Type Choices
            this.type1 = 'up-for-grabs';
            this.type2 = 'on-the-fence';
            this.type3 = 'launched';

            // Source Choices
            this.source1 = 'import-from-gh';
            this.source2 = 'scratch';
            this.source3 = 'pull-from-ideas';
		},

		events: {},

        setSizeForPopup: function () {
            var self = this;
            this.$el.find('#createNewProjectModalBody').height(this.popupContainerHeight);
            this.$popup.height(this.popupHeight);
            this.panel1.$el.height(this.popupHeight);
            this.panel1.setHeight(this.popupHeight);
            this.panel2.$el.height(this.popupHeight);
            this.panel2.setHeight(this.popupHeight);
            this.panel3.$el.height(this.popupHeight);
            this.panel3.setHeight(this.popupHeight);
        },

        handleTypeSelected: function (type) {
            var self = this;
            console.log(type);
            type == this.type1 ? this.panel2.hideSelection3() : this.panel2.showSelection3();
            this.owl.goTo(1);
        },

        handleSourceSelected: function (source) {
            var self = this;
            this.owl.goTo(2);
        },

        handleCreateProject: function (data) {
            var self = this;

        },

        addPubSubListeners: function () {
            var self = this;
            this.listenTo(this.panel1, 'type:selected', function (type) {
                self.handleTypeSelected(type);
            });
            this.listenTo(this.panel2, 'source:selected', function (source) {
                self.handleSourceSelected(source);
            });
            this.listenTo(this.panel3, 'project:create', function () {
                self.handleCreateProject();
            });
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
                mouseDrag: true,
                navigation: false,
                pagination: false,
                navigationText:false
            });

            this.owl = this.$popup.data('owlCarousel');

            this.panel1 = new SelectProjectTypeView({
                el: '#newProjectPanel1'
            });
            this.panel1.render();

            this.panel2 = new SelectProjectSourceView({
                el: '#newProjectPanel2'
            });
            this.panel2.render();

            this.panel3 = new AddProjectDetailsView({
                el: '#newProjectPanel3'
            });
            this.panel3.render();

            this.setSizeForPopup();

            this.addPubSubListeners();

        }
	});

	return CreateNewProjectPopup;

});
