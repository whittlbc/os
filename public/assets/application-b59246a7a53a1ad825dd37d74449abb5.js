define(['jquery',
  'backbone',
  'underscore',
  'router',
  'bootstrap',
  'backbone-eventbroker'
], function ($,
   Backbone,
   _,
   Router) {



  // Document On Ready Shit
  $(document).ready(function () {

    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    var isChrome = !!window.chrome && !isOpera;// Chrome 1+

    var browser = '';

    switch (true) {
      case isFirefox:
        browser = 'firefox';
        break;
      case isSafari:
        browser = 'safari';
        break;
      case isChrome:
        browser = 'chrome';
        break;
    };

    $('body').attr('browser', browser);

    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('header').outerHeight();

    var hasScrolled = function () {
      var st = $(this).scrollTop();

      // Make sure they scroll more than delta
      if (Math.abs(lastScrollTop - st) <= delta)
        return;

      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $('header').removeClass('header-nav-down').addClass('header-nav-up');
        if (!$('footer').hasClass('footer-dropdown-shown')) {
          $('footer').removeClass('footer-nav-down').addClass('footer-nav-up');
        }
        Backbone.EventBroker.trigger('hide-header-dropdowns', true);
      } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
          $('header').removeClass('header-nav-up').addClass('header-nav-down');
          $('footer').removeClass('footer-nav-up').addClass('footer-nav-down');
        }
      }

      lastScrollTop = st;
    };

    $(window).scroll(function (event) {
      didScroll = true;
    });

    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 5);

    $(document).click(function () {
      Backbone.EventBroker.trigger('hide-header-dropdowns');
    });

    // Header Click Events
    $('#addNewProject').click(function () {
      Backbone.EventBroker.trigger('add-new-proj-clicked');
    });

    $('#headerNotificationsIcon').click(function (e) {
      Backbone.EventBroker.trigger('notifications-icon-clicked', e);
    });

    $('#headerEllipsis').click(function (e) {
      Backbone.EventBroker.trigger('header-ellipsis-clicked', e);
    });

    $('#header-user-pic').click(function (e) {
      Backbone.EventBroker.trigger('header-user-pic-clicked', e);
    });

  });

  // Actual Backbone App
  var App = {};
  App.start = function () {
    new Router();
    // Start the backbone history, but also prevent unspecified hashes from navigating anywhere but the home page
    if (!Backbone.history.start()) {
      window.location = '/#ideas';
    }
  };

  App.csrfToken = $("meta[name='csrf-token']").attr('content');

  // Override Backbone.sync to add CSRF-TOKEN HEADER
  Backbone.sync = (function (original) {
    return function (method, model, options) {
      options.beforeSend = function (xhr) {
        xhr.setRequestHeader('X-CSRF-Token', App.csrfToken);
      };
      original(method, model, options);
    };
  })(Backbone.sync);

  App.start();

  return App;
});
