define(['jquery',
	'backbone',
	'underscore',
    'views/add-project/select-project-type-view',
    'views/add-project/select-project-source-view',
    'views/add-project/add-project-details-view',
    'views/add-project/breadcrumb-view',
    'models/user',
    'models/project',
    'models/os.util',
    'stache!views/add-project/create-new-project-popup',
    'owl-carousel',
    'backbone-eventbroker'
    ], function ($,
     Backbone,
     _,
     SelectProjectTypeView,
     SelectProjectSourceView,
     AddProjectDetailsView,
     BreadCrumbView,
     User,
     Project,
     OSUtil,
     IndexViewTpl) {
	'use strict';

	var CreateNewProjectPopup = Backbone.View.extend({

		initialize: function () {

            Backbone.EventBroker.register({
                'title:updated': 'handleTitleUpdate',
                'description:updated': 'handleDescriptionUpdate',
                'langsFrames:updated': 'handleLangsFramesUpdate',
                'repoName:updated': 'handleRepoNameUpdate',
                'license:updated': 'handleLicenseUpdate',
                'privacy:updated': 'handlePrivacyUpdate',
                'anon:updated': 'handleAnonUpdate',
                'create-project:retry': 'handleCreate'
            }, this);

            this.popupContainerHeight = 400;
            this.popupHeight = this.popupContainerHeight - 50;

            this.bottomNavDuration = 200;

            this.repos = null;

            this.slideIndex = 0;
            this.type1 = OSUtil.REVERSE_TYPE_MAP['type1'];
            this.type2 = OSUtil.REVERSE_TYPE_MAP['type2'];
            this.source1 = OSUtil.REVERSE_SOURCE_MAP['source1'];
            this.source2 = OSUtil.REVERSE_SOURCE_MAP['source2'];

            this.panelMap = {
                'type-panel': 0,
                'source-panel': 1,
                'data-panel': 2
            };

            this.masterMap = {

                'selectedType': null,

                // Up for Grabs
                'type1': {
                    'selectedSource': 'source2',
                    // Scratch
                    'source2': {
                       'title': null,
                        'description': null,
                        'langsFrames': null,
                        'repoName': null,
                        'license': null,
                        'privacy': null,
                        'anon': false
                    }
                },

                // On the Fence
                'type2': {
                    'selectedSource': null,
                    // GH
                    'source1': {
                        'title': null,
                        'description': null,
                        'langsFrames': null,
                        'repoName': null,
                        'license': null,
                        'privacy': null
                    },
                    //Scratch
                    'source2': {
                        'title': null,
                        'description': null,
                        'langsFrames': null,
                        'repoName': null,
                        'license': null,
                        'privacy': null
                    },
                    // Pull from Ideas
                    'source3': {
                        'title': null,
                        'description': null,
                        'langsFrames': null,
                        'repoName': null,
                        'license': null,
                        'privacy': null
                    }
                },

                //Launched
                'type3':{
                    'selectedSource': null,
                    // GH
                    'source1': {
                        'title': null,
                        'description': null,
                        'langsFrames': null,
                        'repoName': null,
                        'license': null,
                        'privacy': null
                    },
                    // Scratch
                    'source2': {
                        'title': null,
                        'description': null,
                        'langsFrames': null,
                        'repoName': null,
                        'license': null,
                        'privacy': null
                    }
                }
            };
        },

        resetMasterMap: function (obj) {
            for (var key in obj) {
                (typeof(obj[key]) === 'object' && !Array.isArray(obj[key])) ? this.resetMasterMap(obj[key]) : obj[key] = null;
            }

            // these were set by default in the beginning, so set them again
            this.masterMap['type1']['selectedSource'] = 'source2';
            this.masterMap['type1']['source2']['anon'] = false;
        },

        getSelectedSource: function () {
            var selectedType = this.masterMap['selectedType'];
            if (selectedType == null) {
                return null;
            }
            var typeObj = this.masterMap[selectedType];
            if (typeObj == null) {
                return null;
            }
            var selectedSource = typeObj['selectedSource'];
            return (selectedSource != null) ? selectedSource : null;
        },


        getSelectedSourceObj: function () {
            var selectedType = this.masterMap['selectedType'];
            if (selectedType == null) {
                return null;
            }
            var typeObj = this.masterMap[selectedType];
            if (typeObj == null) {
                return null;
            }
            var selectedSource = typeObj['selectedSource'];
            if (selectedSource == null) {
                return null;
            }
            return typeObj[selectedSource];
        },

        handleTitleUpdate: function (title) {
            var sourceObj = this.getSelectedSourceObj();
            if (sourceObj != null) {
                sourceObj['title'] = title;
            }
        },

        handleDescriptionUpdate: function (description) {
            var sourceObj = this.getSelectedSourceObj();
            if (sourceObj != null) {
                sourceObj['description'] = description;
            }
        },

        handleLangsFramesUpdate: function (langsFrames) {
            var sourceObj = this.getSelectedSourceObj();
            if (sourceObj != null) {
                sourceObj['langsFrames'] = langsFrames;
            }
        },

        handleRepoNameUpdate: function (repoName) {
            var sourceObj = this.getSelectedSourceObj();
            if (sourceObj != null) {
                sourceObj['repoName'] = repoName;
            }
        },

        handleLicenseUpdate: function (license) {
            var sourceObj = this.getSelectedSourceObj();
            if (sourceObj != null) {
                sourceObj['license'] = license;
            }
        },

        handlePrivacyUpdate: function (privacy) {
            var sourceObj = this.getSelectedSourceObj();
            if (sourceObj != null) {
                sourceObj['privacy'] = privacy;
            }
        },

        handleAnonUpdate: function (anon) {
            var sourceObj = this.getSelectedSourceObj();
            if (sourceObj != null) {
                sourceObj['anon'] = anon;
            }
        },

		events: {
            'click .bottom-nav-back': 'handleBack',
            'click .bottom-nav-next': 'handleNext',
            'click .bottom-nav-create-btn': 'handleCreate'
        },

        handleCreate: function () {
            var self = this;
            if (this.panel3.detailsView.allowCreate()) {
                this.newProjectData = this.panel3.detailsView.getData();
                this.renderBreadCrumbView(true);
                this.panel3.render({showCreatingProjectView: true});
                this.hideFooter();
                var projectData = {
                    gh_username: this.userData.gh_username,
                    title: this.newProjectData.title,
                    repo_name: this.newProjectData.repoName,
                    description: this.newProjectData.description,
                    license: [this.newProjectData.license],
                    status: OSUtil.TYPE_ARRAY.indexOf(this.masterMap['selectedType']),
                    langs_and_frames: this.newProjectData.langsFrames,
                    anon: this.newProjectData.anon,
                    privacy: [this.newProjectData.privacy]
                };
                this.disableAddProjectBtn();
                var project = new Project();
                project.create(projectData, {success: function (project) {
                    console.log('SUCCESSFULLY CREATED PROJECT!');
                    self.showProjectCreationSuccess(project);
                }, error: function () {
                    console.log('ERROR CREATING PROJECT');
                    self.showProjectCreationError();
                }});
            }
        },

        hideModal: function () {
            $('#createNewProjectModal').modal('hide');
        },

        showProjectCreationSuccess: function (project) {
            var self = this;
            setTimeout(function () {
                self.hideModal();
                window.location.hash = '#projects/' + project.id;
                setTimeout(function () {
                    self.resetPopup();
                }, 300);
            }, 500);
        },

        showProjectCreationError: function () {
            var self = this;
            setTimeout(function () {
                self.enableAddProjectBtn();
                self.renderBreadCrumbView();
                self.hideCreateBtn();
                self.showFooter();
                self.panel3.render({showProjectCreationError: true});
            }, 500);
        },

        resetPopup: function () {
            this.toggleBottomNav(0, 0);
            this.hideCreateBtn();
            this.hideModalFooterTopBorder();
            this.owl.jumpTo(0);
            this.slideIndex = 0;
            this.showFooter();
            this.enableAddProjectBtn();
            this.resetMasterMap(this.masterMap);
            this.renderPanels();
            this.renderBreadCrumbView();
            this.passLangData(this.dropdownItems);
        },

        showFooter: function () {
            this.$el.find('.modal-footer').css('visibility', 'visible');
        },

        hideFooter: function () {
            this.$el.find('.modal-footer').css('visibility', 'hidden');
        },

        disableAddProjectBtn: function () {
            $('.add-project-btn')[0].style.pointerEvents = 'none';
        },

        enableAddProjectBtn: function () {
            $('.add-project-btn')[0].style.pointerEvents = 'auto';
        },

        handleBack: function () {
            if (this.slideIndex > 0 && this.checkIfBackBtnShown()) {
                this.owl.goTo(this.slideIndex - 1);
                this.slideIndex--;
                this.toggleBottomNav(this.getBackBtnOpacity(), 1);
                this.hideCreateBtn();
                this.renderBreadCrumbView();
            }
        },

        handleNext: function () {
            var numSlides = this.$el.find('#popup-owl > .owl-wrapper-outer > .owl-wrapper').children().length;
            if (this.slideIndex < (numSlides - 1) && this.checkIfNextBtnShown()) {
                if (this.slideIndex == numSlides - 2) {
                    this.hideErrorViewIfShown();
                }
                this.owl.goTo(this.slideIndex + 1);
                this.toggleBottomNav(1, this.getNextBtnOpacity());
                this.slideIndex++;
                this.checkIfNeedToShowCreateBtn();
                this.renderBreadCrumbView();
            }
        },

        hideErrorViewIfShown: function () {
            var self = this;
            if (this.panel3.projectCreationErrorShown) {
                var source = this.getSelectedSource();
                var options = {
                    selectedSource: source,
                    projectData: this.getSelectedSourceObj()
                };
                if (source == this.source1 && this.repos == null) {
                    options.showReposLoadingView = true;
                    this.getGHRepos();
                }
                this.panel3.render(options);
            }
        },

        checkIfBackBtnShown: function () {
            return this.$el.find('.bottom-nav-back').css('opacity') == 1;
        },

        checkIfNextBtnShown: function () {
            return this.$el.find('.bottom-nav-next').css('opacity') == 1;
        },

        checkIfNeedToShowCreateBtn: function () {
            var numSlides = this.$el.find('#popup-owl > .owl-wrapper-outer > .owl-wrapper').children().length;
            if (this.slideIndex == numSlides - 1) {
                this.showCreateBtn();
            }
        },

        setSizeForPopup: function () {
            var self = this;
            this.$el.find('#createNewProjectModalBody').height(this.popupContainerHeight);
            this.$popup.height(this.popupHeight);
            this.panel1.$el.height(this.popupHeight);
            this.panel1.setHeight(this.popupHeight);
            this.panel2.$el.height(this.popupHeight);
            this.panel2.setHeight(this.popupHeight);
            this.panel3.$el.height(this.popupContainerHeight);
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
            this.masterMap['selectedType'] = OSUtil.TYPE_MAP[type];
            this.panel3.passType(OSUtil.TYPE_MAP[type]);
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
            var selectedSource = this.getSourceForType(OSUtil.TYPE_MAP[type]);
            options.selectedSource = (selectedSource == null) ? null : selectedSource;
            this.panel2.render(options);
            this.owl.goTo(this.slideIndex);
            this.toggleBottomNav(1, this.checkIfProjectSourceSelected());
            this.showModalFooterTopBorder();
            this.renderBreadCrumbView();
        },

        handleSourceSelected: function (source) {
            var self = this;
            this.slideIndex = 2;
            this.masterMap[this.masterMap['selectedType']]['selectedSource'] = OSUtil.SOURCE_MAP[source];
            var options = {
                selectedSource: OSUtil.SOURCE_MAP[source],
                projectData: this.getSelectedSourceObj()
            };
            if (source == this.source1 && this.repos == null) {
                options.showReposLoadingView = true;
                this.getGHRepos();
            }
            this.panel3.render(options);
            this.owl.goTo(this.slideIndex);
            this.toggleBottomNav(1, 0);
            this.showCreateBtn();
            this.renderBreadCrumbView();
        },

        showCreateBtn: function () {
            var $createBtn = this.$el.find('.bottom-nav-create-btn');
            var $nextBtn = this.$el.find('.bottom-nav-next');
            $nextBtn.animate({opacity: 0}, {duration: 0, queue: false});
            $nextBtn.hide();
            $createBtn.animate({opacity: 1}, {duration: this.bottomNavDuration, queue: false});
            $createBtn.show();
        },

        hideCreateBtn: function () {
            console.log('hideCreateBtn');
            var $createBtn = this.$el.find('.bottom-nav-create-btn');
            console.log($createBtn);
            $createBtn.animate({opacity: 0}, {duration: 0, queue: false});
            $createBtn.hide();
        },

        toggleBottomNav: function (backOpacity, nextOpacity) {
            var $backBtn = this.$el.find('.bottom-nav-back');
            var $nextBtn = this.$el.find('.bottom-nav-next');
            var numSlides = this.$el.find('#popup-owl > .owl-wrapper-outer > .owl-wrapper').children().length;
            $backBtn.animate({opacity: backOpacity}, {duration: ((backOpacity == 0) ? 0 : this.bottomNavDuration), queue: false});
            $nextBtn.animate({opacity: nextOpacity}, {duration: ((nextOpacity == 0 || this.slideIndex == numSlides - 2) ? 0 : this.bottomNavDuration), queue: false});
            backOpacity == 0 ? $backBtn.hide() : $backBtn.show();
            nextOpacity == 0 ? $nextBtn.hide() : $nextBtn.show();
        },

        getGHRepos: function () {
            var self = this;
            var user = new User();
            user.getAllUserRepos({gh_username: self.userData.gh_username}, {
                success: function(data) {
                    self.handleUserRepos(data.repos);
                }, error: function() {
                    console.log('Error getting all user repos');
                }
            });
        },

        handleUserRepos: function (repoNamesArray) {
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
            this.listenTo(this.panel3, 'repo:getDetails', function (name) {
                self.getRepoDetails(name);
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
            this.panel3.passRepoInfo(data);
        },

        passLangData: function (data) {
            var self = this;
            this.dropdownItems = data;
            this.panel3.passLangDropdownItems(data);
        },

        passTags: function (data) {
            var self = this;
            this.tags = data;
            this.panel3.passTags(data);
        },

        hideModalFooterTopBorder: function () {
            this.$el.find('.fake-top-border').hide();
        },

        showModalFooterTopBorder: function () {
            this.$el.find('.fake-top-border').show();
        },

        handleBreadCrumbNav: function (id) {
            var self = this;
            var numSlides = this.$el.find('#popup-owl > .owl-wrapper-outer > .owl-wrapper').children().length;
            self.renderBreadCrumbView();
            var indexEnd = self.panelMap[id];
            if (indexEnd == self.slideIndex) {
                return;
            } else if (indexEnd > self.slideIndex) {
                // FORWARD
                self.toggleBottomNav(1, self.getNextBtnOpacity());
                self.slideIndex = indexEnd;
                self.checkIfNeedToShowCreateBtn();
                if (self.slideIndex == numSlides - 1) {
                    self.hideErrorViewIfShown();
                }
            } else if (indexEnd < self.slideIndex) {
                // BACK
                self.slideIndex = indexEnd;
                self.toggleBottomNav(self.getBackBtnOpacity(), 1);
                self.hideCreateBtn();
            }
            self.renderBreadCrumbView();
            self.owl.goTo(indexEnd);
        },

        renderBreadCrumbView: function (creatingProject) {
            this.breadCrumbView.render({
                breadCrumb1Clickable: this.masterMap['selectedType'] != null,
                breadCrumb2Clickable: this.masterMap['selectedType'] != null,
                breadCrumb3Clickable: !!this.checkIfProjectSourceSelected(),
                breadCrumb1Done: this.masterMap['selectedType'] != null,
                breadCrumb2Done: this.masterMap['selectedType'] != null && this.masterMap[this.masterMap['selectedType']]['selectedSource'] != null,
                breadCrumb3Done: creatingProject, // set this later once you have data to use,
                breadCrumb1Current: this.slideIndex == 0,
                breadCrumb2Current: this.slideIndex == 1,
                breadCrumb3Current: this.slideIndex == 2
            });
        },

        renderPanels: function () {
            var self = this;
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
                self.handleBreadCrumbNav(id);
            });

            this.renderBreadCrumbView();

            this.renderPanels();

        }
	});

	return CreateNewProjectPopup;

});
