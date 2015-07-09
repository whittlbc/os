define(["backbone",
    "events",
    "views/home/index-view",
    "views/projects/project-view",
    "views/login/login-view"],
    function(Backbone,
     Events,
     IndexView,
     ProjectView,
     LoginView) {

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
              //GH
          }

          var indexView = new IndexView({
              el: '#home'
          });

          indexView.render();
      }

  });

  return Router;


});

