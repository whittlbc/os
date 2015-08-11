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
            this.popupContainerHeight = 370;
            this.popupHeight = this.popupContainerHeight - 50;

            // Type Choices
            this.type1 = 'up-for-grabs';
            this.type2 = 'on-the-fence';
            this.type3 = 'launched';

            // Source Choices
            this.source1 = 'import-from-gh';
            this.source2 = 'scratch';
            this.source3 = 'pull-from-ideas';

            this.bottomNavDuration = 200;

            this.slideIndex = 0;
            this.projectSource = null;
            this.projectType = null;
		},

        resetFlow: function () {
            var self = this;
            this.toggleBottomNav(0, 0);
            this.owl.jumpTo(0);
            this.slideIndex = 0;
            this.projectType = null;
            this.projectSource = null;
        },

		events: {
            'click .bottom-nav-back': 'handleBack',
            'click .bottom-nav-next': 'handleNext',
        },

        handleBack: function () {
            if (this.slideIndex > 0 && this.checkIfBackBtnShown()) {
                this.owl.goTo(this.slideIndex - 1);
                this.slideIndex--;
                var backOpacity = (this.slideIndex == 0) ? 0 : 1;
                this.toggleBottomNav(backOpacity, 1);
            }
        },

        handleNext: function () {
            var numSlides = this.$el.find('#popup-owl > .owl-wrapper-outer > .owl-wrapper').children().length;
            if (this.slideIndex < (numSlides - 1) && this.checkIfNextBtnShown()) {
                this.owl.goTo(this.slideIndex + 1);
                var nextOpacity = 0;
                if (this.slideIndex == 0 && this.projectSource != null) {
                    nextOpacity = 1;
                }
                this.toggleBottomNav(1, nextOpacity);
                this.slideIndex++;
            }
        },

        checkIfBackBtnShown: function () {
            return this.$el.find('.bottom-nav-back').css('opacity') == 1;
        },

        checkIfNextBtnShown: function () {
            return this.$el.find('.bottom-nav-next').css('opacity') == 1;
        },

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

        checkIfProjectSourceSelected: function () {
            return (this.projectSource == null) ? 0 : 1;
        },

        handleTypeSelected: function (type) {
            var self = this;
            type == this.type2 ? this.panel2.showSelection3() : this.panel2.hideSelection3();
            this.slideIndex = 1;
            this.owl.goTo(this.slideIndex);
            this.toggleBottomNav(1, this.checkIfProjectSourceSelected());
            this.projectType = type;
        },

        handleSourceSelected: function (source) {
            var self = this;
            this.slideIndex = 2;
            this.owl.goTo(this.slideIndex);
            this.toggleBottomNav(1, 0);
            this.projectSource = source;
        },

        handleCreateProject: function (data) {
            var self = this;
            this.resetFlow();
        },

        toggleBottomNav: function (backOpacity, nextOpacity) {
            var $backBtn = this.$el.find('.bottom-nav-back');
            var $nextBtn = this.$el.find('.bottom-nav-next');
            $backBtn.animate({opacity: backOpacity}, {duration: ((backOpacity == 0) ? 0 : this.bottomNavDuration), queue: false});
            $nextBtn.animate({opacity: nextOpacity}, {duration: ((nextOpacity == 0) ? 0 : this.bottomNavDuration), queue: false});
            backOpacity == 0 ? $backBtn.hide() : $backBtn.show();
            nextOpacity == 0 ? $nextBtn.hide() : $nextBtn.show();
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
                mouseDrag: false,
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
