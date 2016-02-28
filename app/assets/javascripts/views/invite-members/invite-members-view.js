define(['jquery',
	'backbone',
	'underscore',
	'stache!views/invite-members/invite-members-view'
  ], function ($,
   Backbone,
   _,
   InviteMembersViewTpl
) {
	'use strict';

	var InviteMembersView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
      this.$el.html(InviteMembersViewTpl());
		}
	});

	return InviteMembersView;

});
