define(['jquery',
  "backbone",
  "events",
  'views/main-view',
  'models/os.util',
  'models/session',
  'backbone-eventbroker'
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
      Session.fetchGHAppInfo({success: function (data) {
        OSUtil.setGHClientID(data.client_id);
      }})
    },

    routes: {
      'ideas': 'ideasRoute',
      'launched': 'launchedRoute',
      'projects/:slug': 'projectRoute',
      '': 'ideasRoute'
    },

    ideasRoute: function () {
      (_.isEmpty(window.location.hash) && window.location.pathname == '/') ? OSUtil.navToIdeas() : this.updateHomeView(0);
    },

    launchedRoute: function () {
      this.updateHomeView(1);
    },

    projectRoute: function (slug) {
      $('footer').hide();
      this.updateProjectView(slug);
    },

    updateHomeView: function (feedIndex) {
      $('footer').show();
      this.mainView = this.mainView || new MainView({ el: '#mainView' });

      this.mainView.passActiveHomeIndex(feedIndex);

      if (this.mainView.showHomeView) {
        this.mainView.changeHomeFeedType(feedIndex);
      } else {
        //this.mainView.resetNotifications();
        this.mainView.render({
          view: OSUtil.HOME_PAGE,
          index: feedIndex
        });
      }

      document.body.style.overflow = 'auto';
    },

    updateProjectView: function (slug) {
      this.mainView = this.mainView || new MainView({el: '#mainView'});
      this.mainView.captureFilters();
      //this.mainView.resetNotifications();
      Backbone.EventBroker.trigger('seeking-filters:reset');

      this.mainView.render({
        view: OSUtil.PROJECT_PAGE,
        slug: slug
      });

      document.body.style.overflow = 'auto';
    }

  });

  return Router;

});

