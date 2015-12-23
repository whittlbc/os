define(['jquery',
  'backbone',
  'underscore',
  'models/os.util',
  'models/user'
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

    checkForSession: function () {
      var cachedUserData = this.getFromStorage(OSUtil.USER_STORAGE_KEY);

      if (cachedUserData) {
        this.currentUser = new User(cachedUserData);
        this.setUserPic();
      }
    },

    setUserPic: function () {
      var pic = this.currentUser.get('pic');

      if (pic) {
        $('#header-user-pic').attr('src', pic);
      }
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