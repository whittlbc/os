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

	var OSView = Backbone.View.extend({});

  OSView.currentUser = Session.getCurrentUser();

	return OSView;

});
