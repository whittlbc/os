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
      'idea': 'type1',
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

    SOURCE_TYPES: ['gh', 'scratch'],

    MY_GH_HEADER_TOKEN: '202171c69b06bbe92b666e1a5e3a9b7981a6fced',

    getTimeAgo: function (dateStr) {
      var date = new Date(dateStr);
      return $.timeago(moment.utc(date).utcOffset(date.getTimezoneOffset()).format("MM-DD-YYYY HH:mm Z"));
    },

    LICENSE_OPTIONS: [
      {
        "id": "MIT",
        "title": "MIT"
      },
      {
        "id": "GPL",
        "title": "GPL"
      },
      {
        "id": "BSD",
        "title": "BSD"
      }
    ],

    DOMAIN_FILTERS : {
      "AI": {
        "id": "AI",
        "title": "AI"
      },
      "Academia": {
        "id": "Academia",
        "title": "Academia"
      },
      "Android": {
        "id": "Android",
        "title": "Android"
      },
      "Big Data": {
        "id": "Big Data",
        "title": "Big Data"
      },
      "Boilerplate": {
        "id": "Boilerplate",
        "title": "Boilerplate"
      },
      "Buffers": {
        "id": "Buffers",
        "title": "Buffers"
      },
      "CLI": {
        "id": "CLI",
        "title": "CLI"
      },
      "Cloud": {
        "id": "Cloud",
        "title": "Cloud"
      },
      "CMS": {
        "id": "CMS",
        "title": "CMS"
      },
      "Code Linters": {
        "id": "Code Linters",
        "title": "Code Linters"
      },
      "Comedy": {
        "id": "Comedy",
        "title": "Comedy"
      },
      "Compilers": {
        "id": "Compilers",
        "title": "Compilers"
      },
      "Compression": {
        "id": "Compression",
        "title": "Compression"
      },
      "Courses": {
        "id": "Courses",
        "title": "Courses"
      },
      "Cryptography": {
        "id": "Cryptography",
        "title": "Cryptography"
      },
      "Data Formats": {
        "id": "Data Formats",
        "title": "Data Formats"
      },
      "Data Visualization": {
        "id": "Data Visualization",
        "title": "Data Visualization"
      },
      "Databases": {
        "id": "Databases",
        "title": "Databases"
      },
      "Deployment": {
        "id": "Deployment",
        "title": "Deployment"
      },
      "Design Essentials": {
        "id": "Design Essentials",
        "title": "Design Essentials"
      },
      "Dev Ops": {
        "id": "Dev Ops",
        "title": "Dev Ops"
      },
      "Dev Tools": {
        "id": "Dev Tools",
        "title": "Dev Tools"
      },
      "Distributed Computing": {
        "id": "Distributed Computing",
        "title": "Distributed Computing"
      },
      "Documentation": {
        "id": "Documentation",
        "title": "Documentation"
      },
      "Education": {
        "id": "Education",
        "title": "Education"
      },
      "Extensions": {
        "id": "Extensions",
        "title": "Extensions"
      },
      "Frameworks": {
        "id": "Frameworks",
        "title": "Frameworks"
      },
      "Game Engines": {
        "id": "Game Engines",
        "title": "Game Engines"
      },
      "Games": {
        "id": "Games",
        "title": "Games"
      },
      "IDE": {
        "id": "IDE",
        "title": "IDE"
      },
      "Image Processing": {
        "id": "Image Processing",
        "title": "Image Processing"
      },
      "iOS": {
        "id": "iOS",
        "title": "iOS"
      },
      "IOT": {
        "id": "IOT",
        "title": "IOT"
      },
      "Just for Kicks": {
        "id": "Just for Kicks",
        "title": "Just for Kicks"
      },
      "Languages": {
        "id": "Languages",
        "title": "Languages"
      },
      "Machine Learning": {
        "id": "Machine Learning",
        "title": "Machine Learning"
      },
      "Messaging": {
        "id": "Messaging",
        "title": "Messaging"
      },
      "Mobile": {
        "id": "Mobile",
        "title": "Mobile"
      },
      "Monitoring": {
        "id": "Monitoring",
        "title": "Monitoring"
      },
      "Music": {
        "id": "Music",
        "title": "Music"
      },
      "NLP": {
        "id": "NLP",
        "title": "NLP"
      },
      "Network": {
        "id": "Network",
        "title": "Network"
      },
      "NoSQL": {
        "id": "NoSQL",
        "title": "NoSQL"
      },
      "Operating Systems": {
        "id": "Operating Systems",
        "title": "Operating Systems"
      },
      "Package Managers": {
        "id": "Package Managers",
        "title": "Package Managers"
      },
      "Plugins": {
        "id": "Plugins",
        "title": "Plugins"
      },
      "Productivity Tools": {
        "id": "Productivity Tools",
        "title": "Productivity Tools"
      },
      "Protocols": {
        "id": "Protocols",
        "title": "Protocols"
      },
      "Research": {
        "id": "Research",
        "title": "Research"
      },
      "SQL": {
        "id": "SQL",
        "title": "SQL"
      },
      "Science": {
        "id": "Science",
        "title": "Science"
      },
      "Security": {
        "id": "Security",
        "title": "Security"
      },
      "Statistics": {
        "id": "Statistics",
        "title": "Statistics"
      },
      "Streams": {
        "id": "Streams",
        "title": "Streams"
      },
      "Testing": {
        "id": "Testing",
        "title": "Testing"
      },
      "Text Editors": {
        "id": "Text Editors",
        "title": "Text Editors"
      },
      "Text Processing": {
        "id": "Text Processing",
        "title": "Text Processing"
      },
      "Tutorials": {
        "id": "Tutorials",
        "title": "Tutorials"
      },
      "UI": {
        "id": "UI",
        "title": "UI"
      },
      "UX": {
        "id": "UX",
        "title": "UX"
      },
      "Video": {
        "id": "Video",
        "title": "Video"
      },
      "Web": {
        "id": "Web",
        "title": "Web"
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
      'fetchImplementations': {
        verb: 'GET',
        action: 'read'
      },
      'addImplementation': {
        verb: 'POST',
        action: 'create'
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
      },
      'implementationVote': {
        verb: 'PUT',
        action: 'update'
      }
    }

  };

  return OSUtil;
});