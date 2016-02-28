define(['jquery',
  'backbone',
  'underscore',
  'models/os.model',
  'backbone-eventbroker'
], function ($,
             Backbone,
             _,
             OSModel) {
  'use strict';

  var User = OSModel.extend({

    extension: 'users',

    getNonCachedInfo: function (options) {
      var requestInfo = options || {};
      var info = {
        uuid: this.get('uuid')
      };

      _.extend(requestInfo, {
        url: this.extension + '/getNonCachedInfo',
        data: info
      });

      return this.sync('getNonCachedInfo', this, requestInfo);
    },

    postGHCode: function (info, options) {
      var requestInfo = options || {};

      _.extend(requestInfo, {
        url: this.extension + '/postGHCode',
        data: info
      });

      return this.sync('postGHCode', this, requestInfo);
    },

    getAllUserRepos: function (options) {
      var requestInfo = options || {};
      var info = {
        uuid: this.get('uuid')
      };

      _.extend(requestInfo, {
        url: this.extension + '/getAllUserRepos',
        data: info
      });

      return this.sync('getAllUserRepos', this, requestInfo);
    },

    getRepoDetails: function (info, options) {
      var requestInfo = options || {};

      _.extend(info, {
        uuid: this.get('uuid')
      });

      _.extend(requestInfo, {
        url: this.extension + '/getRepoDetails',
        data: info
      });

      return this.sync('getRepoDetails', this, requestInfo);
    },

    getByGHUsername: function (info, options) {
      var requestInfo = options || {};

      _.extend(requestInfo, {
        url: this.extension + '/getByGHUsername',
        data: info
      });

      return this.sync('getByGHUsername', this, requestInfo);
    },

    login: function (info, options) {
      var requestInfo = options || {};

      _.extend(requestInfo, {
        url: this.extension + '/login',
        data: info
      });

      return this.sync('login', this, requestInfo);
    },

    signup: function (info, options) {
      var requestInfo = options || {};

      _.extend(requestInfo, {
        url: this.extension,
        data: info
      });

      return this.sync('create', this, requestInfo);
    },

    checkUsername: function (info, options) {
      var requestInfo = options || {};

      _.extend(requestInfo, {
        url: this.extension + '/checkUsername',
        data: info
      });

      return this.sync('checkUsername', this, requestInfo);
    },

    read: function (options) {
      var requestInfo = options || {};

      _.extend(requestInfo, {
        url: this.extension + '/all'
      });

      return this.sync('read', this, requestInfo);
    },

    update: function (info, options) {
      var requestInfo = options || {};

      _.extend(requestInfo, {
        url: this.extension + '/' + this.get('id'),
        data: info
      });

      return this.sync('update', this, requestInfo);
    },

    delete: function (options) {
      var requestInfo = options || {};

      _.extend(requestInfo, {
        url: this.extension + '/' + this.get('id'),
      });

      return this.sync('delete', this, requestInfo);
    },

    star: function (info, options) {
      var requestInfo = options || {};

      _.extend(info, {
        uuid: this.get('uuid')
      });

      _.extend(requestInfo, {
        url: this.extension + '/star',
        data: info
      });

      return this.sync('star', this, requestInfo);
    },

    getMyProjects: function (options) {
      var requestInfo = options || {};
      var info = {
        uuid: this.get('uuid')
      };

      _.extend(requestInfo, {
        url: this.extension + '/getMyProjects',
        data: info
      });

      return this.sync('getMyProjects', this, requestInfo);
    },

    getStarredProjects: function (options) {
      var requestInfo = options || {};
      var info = {
        uuid: this.get('uuid')
      };

      _.extend(requestInfo, {
        url: this.extension + '/getStarredProjects',
        data: info
      });

      return this.sync('getStarredProjects', this, requestInfo);
    },

    inviteUsers: function (info, options) {
      var requestInfo = options || {};

      _.extend(info, {
        uuid: this.get('uuid')
      });

      _.extend(requestInfo, {
        url: this.extension + '/inviteUsers',
        data: info
      });

      return this.sync('inviteUsers', this, requestInfo);
    }

  });

  return User;
});
