define(['jquery',
	'backbone',
	'underscore',
    'views/add-project/select-project-type-view',
    'views/add-project/select-project-source-view',
    'views/add-project/add-project-details-view',
    'views/add-project/breadcrumb-view',
    'models/user',
    'stache!views/add-project/create-new-project-popup',
    'owl-carousel'
    ], function ($,
     Backbone,
     _,
     SelectProjectTypeView,
     SelectProjectSourceView,
     AddProjectDetailsView,
     BreadCrumbView,
     User,
     IndexViewTpl) {
	'use strict';

	var CreateNewProjectPopup = Backbone.View.extend({

		initialize: function () {
            this.popupContainerHeight = 370;
            this.popupHeight = this.popupContainerHeight - 50;

            this.bottomNavDuration = 200;

            this.repos = null;

            this.slideIndex = 0;
            this.type1 = 'up-for-grabs';
            this.type2 = 'on-the-fence';
            this.source1 = 'gh';
            this.source2 = 'scratch';

            this.panelMap = {
                'type-panel': 0,
                'source-panel': 1,
                'data-panel': 2
            };

            this.typeMap = {
                'up-for-grabs': 'type1',
                'on-the-fence': 'type2',
                'launched': 'type3'
            };

            this.sourceMap = {
                'gh': 'source1',
                'scratch': 'source2',
                'pull-from-ideas': 'source3'
            };

            this.masterMap = {

                'selectedType': null,

                // Up for Grabs
                'type1': {
                    'selectedSource': 'source2',
                    // Scratch
                    'source1': {

                    }
                },

                // On the Fence
                'type2': {
                    'selectedSource': null,
                    // GH
                    'source1': {

                    },
                    //Scratch
                    'source2': {

                    },
                    // Pull from Ideas
                    'source3': {

                    }
                },

                //Launched
                'type3':{
                    'selectedSource': null,
                    // GH
                    'source1': {

                    },
                    // Scratch
                    'source2': {

                    }
                }
            };
        },

        resetFlow: function () {
            var self = this;
            this.toggleBottomNav(0, 0);
            this.owl.jumpTo(0);
            this.slideIndex = 0;
            this.renderBreadCrumbView();
        },

		events: {
            'click .bottom-nav-back': 'handleBack',
            'click .bottom-nav-next': 'handleNext',
        },

        handleBack: function () {
            if (this.slideIndex > 0 && this.checkIfBackBtnShown()) {
                this.owl.goTo(this.slideIndex - 1);
                this.slideIndex--;
                this.toggleBottomNav(this.getBackBtnOpacity(), 1);
                this.renderBreadCrumbView();
            }
        },

        handleNext: function () {
            var numSlides = this.$el.find('#popup-owl > .owl-wrapper-outer > .owl-wrapper').children().length;
            if (this.slideIndex < (numSlides - 1) && this.checkIfNextBtnShown()) {
                this.owl.goTo(this.slideIndex + 1);
                this.toggleBottomNav(1, this.getNextBtnOpacity());
                this.slideIndex++;
                this.renderBreadCrumbView();
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
            var sourceSelected = 0;
            if (this.masterMap['selectedType'] != null && this.masterMap[this.masterMap['selectedType']]['selectedSource'] != null) {
                sourceSelected = 1;
            }
            return sourceSelected;
        },

        // will return 'source1', 'source2', or 'source3'
        getSourceForType: function (type) {
            return this.masterMap[type]['selectedSource'];
        },

        handleTypeSelected: function (type) {
            var self = this;
            var options = {};
            this.masterMap['selectedType'] = this.typeMap[type];
            if (type == this.type1) {
                // if it's type "up-for-grabs", the source is already known --> 'scratch',
                // so skip step 2 and go straight to step 3
                this.panel2.selectedSource = this.masterMap['type1']['selectedSource'];
                this.panel2.render({upForGrabsType: true});
                this.handleSourceSelected(this.source2);
                return;
            }
            type == this.type2 ? options.showPullFromIdeas = true : options.showPullFromIdeas = false;
            this.slideIndex = 1;
            var selectedSource = this.getSourceForType(this.typeMap[type]);
            options.selectedSource = (selectedSource == null) ? null : selectedSource;
            this.panel2.render(options);
            this.owl.goTo(this.slideIndex);
            this.toggleBottomNav(1, this.checkIfProjectSourceSelected());
            this.renderBreadCrumbView();
        },

        handleSourceSelected: function (source) {
            var self = this;
            this.slideIndex = 2;
            this.masterMap[this.masterMap['selectedType']]['selectedSource'] = this.sourceMap[source];
            var options = {
              selectedSource: this.sourceMap[source]
            };
            this.panel3.render(options);
            if (source == this.source1) {
                this.getGHRepos();
            }
            this.owl.goTo(this.slideIndex);
            this.toggleBottomNav(1, 0);
            this.renderBreadCrumbView();
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

        getGHRepos: function () {
            var self = this;
            if (this.repos == null) {
                var user = new User();
                user.getAllUserRepos({gh_username: self.userData.gh_username}, {
                    success: function(data) {
                        self.handleUserRepos(data.repos);
                    }, error: function() {
                        console.log('Error getting all user repos');
                    }
                });
            } else {
                console.log('else');
                this.panel3.populateUIRepoList();
            }
        },

        handleUserRepos: function (repoNamesArray) {
            console.log(this.repos);
            this.repos = repoNamesArray;
            this.panel3.passUserRepos(this.repos);
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

        getBackBtnOpacity: function () {
            return this.slideIndex == 0 ? 0 : 1;
        },

        getNextBtnOpacity: function () {
            return (this.slideIndex == 0 && !!this.checkIfProjectSourceSelected()) ? 1 : 0;
        },

        getRepoDetails: function (repoName) {
            var self = this;
            var user = new User();
            user.getRepoDetails({gh_username: self.userData.gh_username, repo_name: repoName}, {
                success: function(data) {
                    self.handleRepoDetails(data);
                }, error: function() {
                    console.log('Error getting repo details');
                }
            });
        },

        handleRepoDetails: function (data) {
            var self = this;
            console.log(data);
        },

        renderBreadCrumbView: function () {
            this.breadCrumbView.render({
                breadCrumb1Clickable: this.masterMap['selectedType'] != null,
                breadCrumb2Clickable: this.masterMap['selectedType'] != null,
                breadCrumb3Clickable: !!this.checkIfProjectSourceSelected(),
                breadCrumb1Done: this.masterMap['selectedType'] != null,
                breadCrumb2Done: this.masterMap['selectedType'] != null && this.masterMap[this.masterMap['selectedType']]['selectedSource'] != null,
                breadCrumb3Done: false // set this later once you have data to use
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

            this.breadCrumbView = new BreadCrumbView({
                el: '#createProjectBreadCrumbView'
            });
            this.listenTo(this.breadCrumbView, 'breadCrumbNav', function (id) {
                self.renderBreadCrumbView();
                var indexEnd = self.panelMap[id];
                if (indexEnd == self.slideIndex) {
                    return;
                } else if (indexEnd > self.slideIndex) {
                    // FORWARD
                    self.toggleBottomNav(1, self.getNextBtnOpacity());
                    self.slideIndex = indexEnd;
                } else if (indexEnd < self.slideIndex) {
                    // BACK
                    self.slideIndex = indexEnd;
                    self.toggleBottomNav(self.getBackBtnOpacity(), 1);
                }
                self.renderBreadCrumbView();
                self.owl.goTo(indexEnd);
            });

            this.renderBreadCrumbView();

            this.panel1 = new SelectProjectTypeView({
                el: '#newProjectPanel1'
            });
            this.panel1.typeMap = this.typeMap;
            this.panel1.render();

            this.panel2 = new SelectProjectSourceView({
                el: '#newProjectPanel2'
            });
            this.panel2.sourceMap = this.sourceMap;
            this.panel2.render();

            this.panel3 = new AddProjectDetailsView({
                el: '#newProjectPanel3'
            });
            this.panel3.sourceMap = this.sourceMap;
            this.panel3.render();

            this.listenTo(this.panel3, 'repo:getDetails', function (name) {
                self.getRepoDetails(name);
            });

            this.setSizeForPopup();

            this.addPubSubListeners();

        }
	});

	return CreateNewProjectPopup;

});
