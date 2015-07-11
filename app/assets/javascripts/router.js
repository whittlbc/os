define(["backbone",
        "events",
        "views/home/index-view",
        "views/projects/project-view",
        "views/login/login-view",
        "models/user"],
    function (Backbone,
              Events,
              IndexView,
              ProjectView,
              LoginView,
              User) {

        var masterSelf;

        var Router = Backbone.Router.extend({

            routes: {
                'projects': 'projectRoute',
                '': 'defaultRoute'
            },

            projectRoute: function () {

                this.determineEntry();

                var projectView = new ProjectView({
                    el: '#project'
                });

                projectView.render();
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
                    var code = search.slice(search.indexOf('code=') + 5);
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
                var authedUser = response;
                console.log('AUTHED USER: ', authedUser);
                masterSelf.setCookie('gh_username', response.gh_username, 7); // expires in 7 days
                masterSelf.authed = true;
            },

            defaultRoute: function () {
                masterSelf = this;
                var self = this;

                this.determineEntry();

                var indexView = new IndexView({
                    el: '#home'
                });

                indexView.render();
            }

        });

        return Router;


    });

