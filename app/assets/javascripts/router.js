define(["backbone",
        "events",
        'views/main-view',
        'models/os.util'],
    function (Backbone,
              Events,
              MainView,
              OSUtil) {

        var Router = Backbone.Router.extend({

            routes: {
                'up-for-grabs': 'upForGrabsRoute',
                'on-the-fence': 'onTheFenceRoute',
                'launched': 'launchedRoute',
                'projects/:id': 'projectRoute',
                '': 'onTheFenceRoute'
            },

            upForGrabsRoute: function() {
                this.updateHomeView(0);
            },

            onTheFenceRoute: function() {
                _.isEmpty(window.location.hash) && window.location.pathname == '/' ? window.location.hash = "#on-the-fence" : this.updateHomeView(1);
            },

            launchedRoute: function() {
                this.updateHomeView(2);
            },

            updateHomeView: function (index) {
                var self = this;
                if (!this.mainView) {
                    this.mainView = new MainView({
                        el: '#mainView'
                    });
                    this.listenTo(this.masterView, 'cookie:set', function (gh_username) {
                        self.setCookie('gh_username', gh_username, 7); // expires in 7 days
                    });
                    this.mainView.passCookieUser(this.getCookie());
                    this.mainView.render({
                        view: OSUtil.HOME_PAGE,
                        index: index
                    });
                } else {
                    this.mainView.passCookieUser(this.getCookie());
                    this.mainView.changeHomeFeedType(index);
                }
            },

            projectRoute: function (id) {
                this.updateProjectView(id);
            },

            updateProjectView: function (id) {
                var self = this;
                if (!this.mainView) {
                    this.mainView = new MainView({
                        el: '#mainView'
                    });
                    this.listenTo(this.masterView, 'cookie:set', function () {
                        self.setCookie('gh_username', response.gh_username, 7); // expires in 7 days
                    });
                    this.mainView.passCookieUser(this.getCookie());
                    this.mainView.render({
                        view: OSUtil.PROJECT_PAGE,
                        id: id
                    });
                } else {
                    this.mainView.passCookieUser(this.getCookie());
                    this.mainView.switchProject(id);
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
            }

        });

        return Router;

    });

