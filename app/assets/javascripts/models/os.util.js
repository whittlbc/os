define(['jquery', 'backbone', 'moment', 'timeago'], function ($, Backbone, moment) {
  'use strict';

  var OSUtil = {

    USER_STORAGE_KEY: 'sourcehoney_user',

    BASIC_TRACKING_KEY: 'sourcehoney',

    setGHClientID: function (clientID) {
      this.GH_CLIENT_ID = clientID;
    },

    navToIdeas: function () {
      window.location.hash = '#ideas';
    },

    navToLaunched: function () {
      window.location.hash = '#launched';
    },

    navToProject: function (projectUUID, newTab) {
      if (newTab){
        window.open((window.location.origin + '/#projects/' + projectUUID), '_blank');
      } else {
        window.location.hash = '#projects/' + projectUUID;
      }
    },

    TYPE1: 'ideas',

    TYPE2: 'launched',

    IRC_NETWORKS: [
      {
        "id": "ChLame",
        "title": "ChLame"
      },
      {
        "id": "EFnet",
        "title": "EFnet"
      },
      {
        "id": "freenode",
        "title": "freenode"
      },
      {
        "id": "IRC-Hipsano",
        "title": "IRC-Hipsano"
      },
      {
        "id": "IRCnet",
        "title": "IRCnet"
      },
      {
        "id": "LinkBR",
        "title": "LinkBR"
      },
      {
        "id": "OFTC",
        "title": "OFTC"
      },
      {
        "id": "QuakeNet",
        "title": "QuakeNet"
      },
      {
        "id": "Rizon",
        "title": "Rizon"
      },
      {
        "id": "Undernet",
        "title": "Undernet"
      }
    ],

    REQUESTS: {
      'project': 0,
      'slack': 1,
      'hipchat': 2
    },

    HOME_PAGE: 'home',
    PROJECT_PAGE: 'project',

    LANGS_FILTER_SET: 0,
    DOMAIN_FILTER_SET: 1,
    SEEKING_FILTER_SET: 2,

    SORT_BY_VOTES: 0,
    SORT_BY_TIME: 1,

    REQUEST_PRIVACY: 'request',
    OPEN_PRIVACY: 'open',

    TYPE_MAP: {
      'ideas': 'type1',
      'launched': 'type2'
    },

    REVERSE_TYPE_MAP: {
      'type1': 'ideas',
      'type2': 'launched'
    },

    TYPE_ARRAY: ['type1', 'type2'],

    SOURCE_MAP: {
      'gh': 'source1',
      'scratch': 'source2'
    },

    REVERSE_SOURCE_MAP: {
      'source1': 'gh',
      'source2': 'scratch'
    },

    PROJECT_TYPES: ['ideas', 'launched'],
    GRAMMATICAL_PROJECT_TYPES: ['Ideas', 'Launched'],

    MY_GH_HEADER_TOKEN: '202171c69b06bbe92b666e1a5e3a9b7981a6fced',

    getTimeAgo: function (dateStr) {
      var date = new Date(dateStr);
      return $.timeago(moment.utc(date).utcOffset(date.getTimezoneOffset()).format("MM-DD-YYYY HH:mm Z"));
    },

    DOMAIN_FILTERS : {
      "Academia": {
        "id": "Academia",
        "title": "Academia"
      },
      "Browser Extensions": {
        "id": "Browser Extension",
        "title": "Browser Extension"
      },
      "Mobile": {
        "id": "Mobile",
        "title": "Mobile"
      },
      "Scientific": {
        "id": "Scientific",
        "title": "Scientific"
      },
      "Tablet": {
        "id": "Tablet",
        "title": "Tablet"
      },
      "Web": {
        "id": "Web",
        "title": "Web"
      },
      "Academia2": {
        "id": "Academia2",
        "title": "Academia2"
      },
      "Browser Extensions2": {
        "id": "Browser Extension2",
        "title": "Browser Extension2"
      },
      "Mobile2": {
        "id": "Mobile2",
        "title": "Mobile2"
      },
      "Scientific2": {
        "id": "Scientific2",
        "title": "Scientific2"
      },
      "Tablet2": {
        "id": "Tablet2",
        "title": "Tablet2"
      },
      "Web2": {
        "id": "Web2",
        "title": "Web2"
      }
    },

    SEEKING_IDEAS_FILTERS : {
      "Feedback": {
        "id": "Feedback",
        "title": "Feedback"
      },
      "Initial Team": {
        "id": "Initial Team",
        "title": "Initial Team"
      }
    },

    SEEKING_LAUNCHED_FILTERS : {
      "Contributors": {
        "id": "Contributors",
        "title": "Contributors"
      },
      "Feedback": {
        "id": "Feedback",
        "title": "Feedback"
      },
      "New Maintainer": {
        "id": "New Maintainer",
        "title": "New Maintainer"
      },
      "Users": {
        "id": "Users",
        "title": "Users"
      }
    },

    SEEKING_TAGS_TO_REMOVE_FOR_STATUS: {
      0: ['Initial Team'],
      1: ['Contributors', 'New Maintainer', 'Users']
    },

    customMethodMap: {
      'create': {
        verb: 'POST',
        action: 'create'
      },
      'update': {
        verb: 'PUT',
        action: 'update'
      },
      'patch': {
        verb: 'PATCH',
        action: 'update'
      },
      'read': {
        verb: 'GET',
        action: 'read'
      },
      'delete': {
        verb: 'DELETE',
        action: 'delete'
      },
      'fetchFeedProjects': {
        verb: 'GET',
        action: 'read'
      },
      'login': {
        verb: 'GET',
        action: 'read'
      },
      'checkUsername': {
        verb: 'GET',
        action: 'read'
      },
      'postGHCode': {
        verb: 'POST',
        action: 'create'
      },
      'getByGHUsername': {
        verb: 'GET',
        action: 'read'
      },
      'getAllUserRepos': {
        verb: 'GET',
        action: 'read'
      },
      'pullFromIdeas': {
        verb: 'GET',
        action: 'read'
      },
      'filteredFeed': {
        verb: 'POST',
        action: 'create'
      },
      'vote': {
        verb: 'PUT',
        action: 'update'
      },
      'getAll': {
        verb: 'GET',
        action: 'read'
      },
      'getUniversalSearchData': {
        verb: 'GET',
        action: 'read'
      },
      'fetchDetails': {
        verb: 'GET',
        action: 'read'
      },
      'addComment': {
        verb: 'POST',
        action: 'create'
      },
      'join': {
        verb: 'POST',
        action: 'create'
      },
      'launch': {
        verb: 'PUT',
        action: 'update'
      },
      'getRepoDetails': {
        verb: 'GET',
        action: 'read'
      },
      'getUpForGrabs': {
        verb: 'GET',
        action: 'read'
      },
      'fetchGHContributors': {
        verb: 'POST',
        action: 'create'
      },
      'fetchGHRepoStats': {
        verb: 'GET',
        action: 'read'
      },
      'postNewComment': {
        verb: 'POST',
        action: 'create'
      },
      'fetchComments': {
        verb: 'GET',
        action: 'read'
      },
      'commentVote': {
        verb: 'PUT',
        action: 'update'
      },
      'getUpForGrabsDetails': {
        verb: 'GET',
        action: 'read'
      },
      'pullProject': {
        verb: 'PUT',
        action: 'update'
      },
      'getEvolution': {
        verb: 'GET',
        action: 'read'
      },
      'star': {
        verb: 'PUT',
        action: 'update'
      },
      'destroyComment': {
        verb: 'PUT',
        action: 'update'
      },
      'destroyProject': {
        verb: 'PUT',
        action: 'update'
      },
      'edit': {
        verb: 'PUT',
        action: 'update'
      },
      'search': {
        verb: 'GET',
        action: 'read'
      },
      'addEvolutionItem': {
        verb: 'POST',
        action: 'create'
      },
      'deleteEvolutionItem': {
        verb: 'PUT',
        action: 'update'
      },
      'requestToJoin': {
        verb: 'POST',
        action: 'create'
      },
      'sendInviteEmails': {
        verb: 'POST',
        action: 'create'
      },
      'respondToRequest': {
        verb: 'PUT',
        action: 'update'
      },
      'sawNotifications': {
        verb: 'PUT',
        action: 'update'
      },
      'getMyProjects': {
        verb: 'GET',
        action: 'read'
      },
      'getStarredProjects': {
        verb: 'GET',
        action: 'read'
      },
      'getNonCachedInfo': {
        verb: 'GET',
        action: 'read'
      },
      'fetchGHAppInfo': {
        verb: 'GET',
        action: 'read'
      }
    }

  };

  return OSUtil;
});