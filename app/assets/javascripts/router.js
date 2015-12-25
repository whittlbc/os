define(['jquery',
  "backbone",
  "events",
  'views/main-view',
  'models/os.util',
  'models/session'
],
  function ($,
  Backbone,
  Events,
  MainView,
  OSUtil,
  Session
) {

  var Router = Backbone.Router.extend({

    initialize: function () {
      Session.checkForSession();
    },

    routes: {
      'up-for-grabs': 'upForGrabsRoute',
      'on-the-fence': 'onTheFenceRoute',
      'launched': 'launchedRoute',
      'projects/:id': 'projectRoute',
      '': 'onTheFenceRoute'
    },

    // UP FOR GRABS
    upForGrabsRoute: function () {
      this.updateHomeView(0);
    },

    // ON THE FENCE
    onTheFenceRoute: function () {
      (_.isEmpty(window.location.hash) && window.location.pathname == '/') ? this.redirectHome() : this.updateHomeView(1);
    },

    // LAUNCHED
    launchedRoute: function () {
      this.updateHomeView(2);
    },

    // PROJECT
    projectRoute: function (id) {
      $('footer').hide();
      this.updateProjectView(id);
    },

    updateHomeView: function (feedIndex) {
      $('footer').show();
      this.mainView = this.mainView || new MainView({ el: '#mainView' });

      this.mainView.passActiveHomeIndex(feedIndex);

      this.mainView.showHomeView ? this.mainView.changeHomeFeedType(feedIndex) : this.mainView.render({
        view: OSUtil.HOME_PAGE,
        index: feedIndex
      });
    },

    updateProjectView: function (id) {
      this.mainView = this.mainView || new MainView({ el: '#mainView' });

      this.mainView.captureFilters();

      this.mainView.render({
        view: OSUtil.PROJECT_PAGE,
        id: id
      });
    },

    redirectHome: function () {
      window.location.hash = "#on-the-fence";
    }

  });

  return Router;

});

