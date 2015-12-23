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

    currentUser: Session.getCurrentUser()

	});

	return OSView;

});
