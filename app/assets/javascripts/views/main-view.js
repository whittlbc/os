define(['jquery',
	'backbone',
	'underscore',
    'views/home/index-view',
    'views/projects/project-view',
    'models/os.util',
    'models/project',
    'views/modals/create-project-modal',
    'models/all-langs',
    'models/user',
    'sifter.min',
    'views/modals/login-modal',
    'stache!views/main-view',
    'backbone-eventbroker'
], function ($,
     Backbone,
     _,
     IndexView,
     ProjectView,
     OSUtil,
     Project,
     CreateProjectModal,
     AllLangs,
     User,
     Sifter,
     LoginModal,
     MainViewTpl) {
	'use strict';

	var MainView = Backbone.View.extend({

		initialize: function () {
            Backbone.EventBroker.register({
                'pull-project': 'showCreateModalOnPullProject',
                'project:vote': 'loginOrVote',
                'login:gh': 'loginWithGH'
            }, this);
            this.userAuthed = false;
		},

		events: {},

        passActiveHomeIndex: function (index) {
            this.activeHomeIndex = index;
        },

        loginWithGH: function () {
            var self = this;
            var state;

            if (this.showHomeView) {
                switch (this.activeHomeIndex) {
                    case 0:
                        state = OSUtil.UP_FOR_GRABS_STATE;
                        break;
                    case 1:
                        state = OSUtil.ON_THE_FENCE_STATE;
                        break;
                    case 2:
                        state = OSUtil.LAUNCHED_STATE;
                        break;
                }
            } else {
                state = OSUtil.PROJECT_STATE + 'num' + this.projectView.projectID;
            }

            window.location = 'https://github.com/login/oauth/authorize?client_id=bfdb73ed12138dddbfcc&scope=public_repo&state=' + state;
        },

        // either show the login modal or vote on the passed projectPostView
        loginOrVote: function (projectPostView) {
            var self = this;
            if (!this.userAuthed) {
                projectPostView.handleVote();
            } else {
                this.loginModal.setMessage('You must be logged in to vote on projects.');
                this.loginModal.showModal();
            }
        },

        showCreateModalOnPullProject: function (id) {
            var self = this;
            this.createProjectModal.resetPopup();
            this.createProjectModal.formatForPullProject(id);
            setTimeout(function () {
                self.createProjectModal.showModal();
            }, 10)
        },

        changeHomeFeedType: function (index) {
            this.homeView.populateProjectFeed(index);
        },

        switchProject: function (id) {
            this.projectView = new ProjectView({
                el: this.$el.find('#projectViewContainer'),
                id: id
            });
        },

        passCookieUser: function (cookieGHUsername) {
            var self = this;
            if (_.isEmpty(cookieGHUsername)) {
                // user cookie wan't set
                console.log('user cookie wasnt set');
            } else {
                this.userAuthed = true;
                var user = new User();
                user.getByGHUsername({gh_username: cookieGHUsername}, {success: function (user) {
                    self.setUserFromResponse(user);
                }});
            }
        },

        setUserFromResponse: function(user) {
            this.userData = user;
            this.setUserHeaderPic(user.pic);
            if (this.createProjectModal) {
                this.createProjectModal.passUserData(user);
            }
            this.trigger('cookie:set', user.gh_username);
            this.passUserToNestedViews(user);
        },

        passUserToNestedViews: function (user) {
            if (this.homeView) {
                this.homeView.passUserInfo(user);
            }
            if (this.projectView) {
                this.projectView.passUserInfo(user);
            }
        },

        setUserHeaderPic: function (url) {
            $('#header-user-pic').attr('src', url);
        },

        // Was used to take into account when GH API redirects you back
        //determineEntry: function () {
        //    var self = this;
        //    var user = new User();
        //    // If returned from GH with new code to get access_token and user with,
        //    // update or initialize new user and return with user data that way
        //    if (window.location.search != '' && window.location.search.indexOf('?code=') == 0) {
        //        // Get user info from new GH access_token
        //        var search = window.location.search;
        //        var code = search.slice(search.indexOf('code=') + 5);;
        //        user.postGHCode({code: code}, {success: self.setUserFromResponse, error: function () {
        //            console.log('user.postGHCode() failed...now trying to get user by cookie');
        //            self.getUserByCookie(user);
        //        }});
        //    } else {
        //        this.getUserByCookie(user);
        //    }
        //},

        enableUniversalSearchBar: function () {
            var self = this;

            $('#universal-searchbox-input').keyup(function(e){
                self.universalSearch($(e.currentTarget).val());
            });

            var isOpen = false;
            var inputBox = $('#universal-searchbox-input');
            var searchBox = $('.searchbox');
            inputBox.focus(function(){
                if(!isOpen) {
                    if (self.homeView) {
                        self.homeView.cacheFeedBeforeSearch();
                    }
                    self.getUniversalSearchData();
                    searchBox.addClass('searchbox-open');
                    isOpen = true;
                }
            });
            inputBox.blur(function(){
                if(isOpen) {
                    searchBox.removeClass('searchbox-open');
                    isOpen = false;
                }
            });
        },


        getUniversalSearchData: function () {
            var self = this;
            var project = new Project();
            project.getUniversalSearchData({success: function (projects) {
                self.handleUniversalSearchData(projects);
            }});
        },

        handleUniversalSearchData: function (projects) {
            this.allProjects = projects;
            this.universalSearchSifter = new Sifter(projects);
        },

        universalSearch: function (query) {
            var self = this;
            if (query) {
                var results = this.universalSearchSifter.search(query, {
                    fields: ['title', 'owner_gh_username'],
                    limit: 100
                });
                if (results.items.length == 0 && query != "") {
                    this.homeView.passUniveralSearchResults([]);
                } else {

                    var projectResults = [];
                    _.map(results.items, function(item) {
                        projectResults.push(self.allProjects[item.id]);
                    });

                    var sortedProjectResults = projectResults.sort(function(a, b){
                        if (a.vote_count == b.vote_count){
                            return (a.created_at > b.created_at) ? 1 : ((b.created_at > a.created_at) ? -1 : 0);
                        } else {
                            return (a.vote_count < b.vote_count) ? 1 : ((b.vote_count < a.vote_count) ? -1 : 0);
                        }
                    });

                    this.homeView.passUniveralSearchResults(sortedProjectResults);
                }
            } else {
                this.homeView.showCachedFeed();
            }
        },

        getAllLanguages: function () {
            this.handleAllLanguages(AllLangs.getAll());
        },

        handleAllLanguages: function (data) {
            this.allLangs = data;
            if (this.homeView) {
                this.homeView.passLanguages(data);
                this.homeView.createLangsFilterDropdown();
            }
            if (this.projectView) {
                this.projectView.passLanguages(data);
            }
            if (this.createProjectModal) {
                this.createProjectModal.passLangData(data);
            }
        },

        addProjectBtnListener: function () {
            var self = this;
            $('#headerAddProjectBtn').click(function () {
                if (!self.userAuthed) {
                    self.createProjectModal.showModal();
                } else {
                    self.loginModal.setMessage('You must be logged in to add a project.');
                    self.loginModal.showModal();
                }
            });
        },

		render: function (options) {
			var self = this;
            this.showHomeView = options && options.view == OSUtil.HOME_PAGE;
            this.showProjectView = options && options.view == OSUtil.PROJECT_PAGE;

            this.$el.html(MainViewTpl({
                showHomeView: this.showHomeView,
                showProjectView: this.showProjectView
            }));

            this.addProjectBtnListener();

            if (this.showHomeView) {
                this.homeView = new IndexView({
                    el: this.$el.find('#homeViewContainer')
                });
                this.listenTo(this.homeView, 'languages:all');
                this.homeView.render({
                    index: options && options.index ? options.index : 1
                });
            }
            if (this.showProjectView) {
                this.projectView = new ProjectView({
                    el: this.$el.find('#projectViewContainer'),
                    id: options ? options.id : null
                });
            }

            this.allLangs ? this.handleAllLanguages(this.allLangs) : this.getAllLanguages();

            this.enableUniversalSearchBar();

            if (!this.createProjectModal) {
                this.createProjectModal = new CreateProjectModal({
                    el: this.$el.find('#modalCreateProject')
                });
                if (this.userData) {
                    this.createProjectModal.passUserData(this.userData);
                }
                if (this.allLangs) {
                    this.createProjectModal.passLangData(this.allLangs);
                }
                this.createProjectModal.render();
            }

            if (!this.loginModal) {
                this.loginModal = new LoginModal({
                   el: this.$el.find('#modalLogin')
                });
                this.loginModal.render();
            }
		}

	});

	return MainView;

});
