define(["backbone",
    "events",
    "views/home/index-view",
    "views/projects/project-view",
    "views/login/login-view",
    "models/user"],
    function(Backbone,
     Events,
     IndexView,
     ProjectView,
     LoginView,
     User) {

  var Router = Backbone.Router.extend({

    routes: {
        'projects': 'projectRoute',
        'login': 'loginRoute',
        '': 'defaultRoute'
    },

      loginRoute: function() {

          var loginView = new LoginView({
              el: '#login'
          });

          loginView.render();
      },

     projectRoute: function() {

        var projectView = new ProjectView({
            el: '#project'
        });

        projectView.render();
     },

      defaultRoute: function () {

          if (window.location.search != '') {
              var search = window.location.search;
              var code = search.slice(search.indexOf('code=')+5);
              var user = new User();
              user.postGHCode({code: code});
          }

          var indexView = new IndexView({
              el: '#home'
          });

          indexView.render();
      }

  });

  return Router;


});

