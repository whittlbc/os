define(['jquery',
	'backbone',
	'underscore',
  'models/session'
    ], function ($,
     Backbone,
     _,
     Session
 ) {
	'use strict';

	var OSView = Backbone.View.extend({

    initialize: function (options) {
      this.currentUser = Session.getCurrentUser();
      this.postInitialize(options);
    },

    postInitialize: function (options) {},

    showAboutModal: function () {
      return Session.isFirstVisit();
    }

  });

	return OSView;

});
