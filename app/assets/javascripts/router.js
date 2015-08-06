define(["backbone",
        "events",
        "views/home/index-view",
        "views/projects/project-view",
        "views/login/login-view",
        'models/os.util',
        "models/user"],
    function (Backbone,
              Events,
              IndexView,
              ProjectView,
              LoginView,
              OSUtil,
              User) {

        var masterSelf;

        var Router = Backbone.Router.extend({

            entered: false,
            lastHash: '',

            routes: {
                'shouldStart': 'shouldStartRoute',
                'starting': 'startingRoute',
                'started': 'startedRoute',
                'projects/:id': 'projectRoute',
                '': 'startingRoute'
            },

            projectRoute: function (id) {
                this.initializeProject(id);
            },

            wasOnHome: function () {
                return (this.lastHash == '#shouldStart' || this.lastHash == '#starting' || this.lastHash == '#started');
            },

            amOnHome: function () {
                return (window.location.hash == '#shouldStart' || window.location.hash == '#starting' || window.location.hash == '#started');
            },

            emptyHash: function () {
                return (window.location.hash == "");
            },

            setShouldStartHash: function () {
                window.location.hash = "#shouldStart";
            },

            setStartingHash: function () {
                window.location.hash = "#starting";
            },

            setStartedHash: function () {
                window.location.hash = "#started";
            },

            determineEntry: function () {
                this.authed = false;
                var self = this;
                var user = new User();

                // If returned from GH with new code to get access_token and user with,
                // update or initialize new user and return with user data that way
                if (window.location.search != '' && window.location.search.indexOf('?code=') == 0) {
                    // Get user info from new GH access_token
                    var search = window.location.search;
                    var code = search.slice(search.indexOf('code=') + 5);;
                    user.postGHCode({code: code}, {success: self.setUserFromResponse, error: function () {
                        console.log('user.postGHCode() failed...now trying to get user by cookie');
                        self.getUserByCookie(user);
                    }});
                } else {
                    this.getUserByCookie(user);
                }
            },

            getUserByCookie: function (user) {
                var self = this;
                var cookieGHUsername = this.getCookie('gh_username');
                if (cookieGHUsername != '') {
                    user.getByGHUsername({gh_username: cookieGHUsername}, {success: self.setUserFromResponse});
                }
            },

            setCookie: function (cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + "; " + expires;
            },

            getCookie: function (cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1);
                    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
                }
                return "";
            },

            setUserFromResponse: function(response) {
                masterSelf.authedUser = response;
                masterSelf.setCookie('gh_username', response.gh_username, 7); // expires in 7 days
                masterSelf.authed = true;
                if ((window.location.hash == '' || masterSelf.amOnHome()) && masterSelf.indexView) {
                    masterSelf.indexView.passUserInfo(masterSelf.authedUser);
                } else if (window.location.hash.indexOf('#projects') == 0 && masterSelf.project) {
                    masterSelf.project.passUserInfo(masterSelf.authedUser);
                }
            },

            shouldStartRoute: function() {
                this.initializeHome();
                this.indexView.showShouldStartFeed(OSUtil.SHOULD_START.num);
                this.indexView.setActiveTabIndex(0);
            },

            startingRoute: function() {
                if (this.emptyHash() && window.location.pathname == '/') {
                    this.setStartingHash();
                } else {
                    this.initializeHome();
                    this.indexView.showStartingFeed(OSUtil.STARTING.num);
                    this.indexView.setActiveTabIndex(1);
                }
            },

            startedRoute: function() {
                this.initializeHome();
                this.indexView.showStartedFeed(OSUtil.STARTED.num);
                this.indexView.setActiveTabIndex(2);
            },

            initializeHome: function () {

                masterSelf = this;
                var self = this;
                if (!this.entered || !this.wasOnHome()) {
                    this.indexView = new IndexView({
                        el: '#home'
                    });
                    this.indexView.render();
                }

                window.scrollTo(0, 0);

                if (!this.entered) {
                    this.determineEntry();
                } else {
                    self.indexView.passUserInfo(self.authedUser);
                }
                this.entered = true;
                this.setLastHash();
            },

            initializeProject: function (id) {
                masterSelf = this;
                var self = this;
                this.project = new ProjectView({
                    el: '#home',
                    id: id
                });
                if (!this.entered) {
                    this.entered = true;
                    this.determineEntry();
                } else {
                    self.project.passUserInfo(self.authedUser);
                }
                this.setLastHash();
            },

            setLastHash: function () {
                this.lastHash = window.location.hash;
            },

        });

        return Router;


    });

