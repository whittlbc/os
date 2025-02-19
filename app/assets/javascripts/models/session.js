define(['jquery',
  'backbone',
  'underscore',
  'models/os.util',
  'models/user',
  'backbone-eventbroker'
], function (
  $,
  Backbone,
  _,
  OSUtil,
  User
) {
  'use strict';
  var instance;

  var SessionModel = Backbone.Model.extend({

    initialize: function () {
      Backbone.EventBroker.register({
        'session:signOut': 'signOut'
      }, this);
    },

    fetchGHAppInfo: function (options) {
      var requestInfo = options || {};

      _.extend(requestInfo, {
        url: 'login/fetchGHAppInfo'
      });

      return this.sync('fetchGHAppInfo', this, requestInfo);
    },

    signOut: function () {
      this.deleteFromStorage(OSUtil.USER_STORAGE_KEY);
      this.deleteCookie('gh_login')
    },

    checkForSession: function () {
      this.addTrackingCookie();
      this.authed = false;

      var cachedUserData = this.getFromStorage(OSUtil.USER_STORAGE_KEY);

      // first see if user is in local storage
      if (cachedUserData) {
        this.setCurrentUser(cachedUserData);
        this.authed = true;
      }
      // if not, check to see if user data is in cookie (aka. just logged in with GH)
      else {
        cachedUserData = this.getCookie('gh_login');

        // if cookie user data exists, set that into local storage and set current user
        if (cachedUserData) {
          cachedUserData = JSON.parse(decodeURIComponent(this.getCookie('gh_login')));

          this.setToStorage(OSUtil.USER_STORAGE_KEY, cachedUserData);
          this.setCurrentUser(cachedUserData);
          // don't need the cookie anymore since you stored the data in local storage
          //this.deleteCookie('gh_login');
          this.authed = true;
        }
      }
    },

    userIsOnHomePage: function () {
      return _.contains(['', '#ideas', '#launched'], window.location.hash);
    },

    addTrackingCookie: function () {
      if (!this.getCookie(OSUtil.BASIC_TRACKING_KEY) && this.userIsOnHomePage()) {
        // doesn't matter what the value is, so just use a random uuid
        this.setCookie(OSUtil.BASIC_TRACKING_KEY, '02e70fc4-ceaa-422f-8d87-707f7ef2615c', 60);
        this.noCookie = true;
      }
    },

    isFirstVisit: function () {
      var firstVisit = false;

      if (!this.authed && this.noCookie) {
        this.noCookie = false;
        firstVisit = true;
      }

      return firstVisit;
    },

    setUserPic: function () {
      var pic = this.currentUser.get('pic');
      if (pic) {
        $('#header-user-pic').attr('src', pic);
      }
    },

    setCurrentUser: function (data) {
      this.currentUser = new User(data);
      this.setUserPic();
    },

    getCurrentUser: function () {
      return this.currentUser;
    },

    setCookie: function (name, value, days_til_expiration) {
      var date = new Date();
      date.setTime(date.getTime() + (days_til_expiration * 24 * 60 * 60 * 1000));
      var expires = "expires=" + date.toUTCString();
      document.cookie = name + "=" + value + "; " + expires;
    },

    getCookie: function (name) {
      name = (name + '=') || '=';
      var cookies = document.cookie.split(';');

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];

        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
        }

        if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
        }
      }

      return '';
    },

    deleteCookie: function (name) {
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    },

    setToStorage: function (key, value) {
      var val;

      try {
        val = JSON.stringify(value);
      } catch (e) {
        val = value;
      }

      localStorage.setItem(key, val);
    },

    getFromStorage: function (key) {
      var item;
      var data = localStorage.getItem(key);

      try {
        item = JSON.parse(data);
      } catch (e) {
        item = data;
      }

      return item;
    },

    deleteFromStorage: function (key) {
      localStorage.removeItem(key);
    },

    isMac: function () {
      return navigator.userAgent.indexOf('Mac OS X') != -1;
    }

  });

  var Session = {

    getInstance: function() {
      if (!instance) {
        instance = new SessionModel();
      }
      return instance;
    }

  };

  return Session.getInstance();

});