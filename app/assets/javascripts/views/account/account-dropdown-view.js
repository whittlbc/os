define(['jquery',
	'backbone',
	'underscore',
	'stache!views/account/account-dropdown-view',
    'backbone-eventbroker'
    ], function ($,
     Backbone,
     _,
     AccountDropdownViewTpl) {
	'use strict';

	var AccountDropdownView = Backbone.View.extend({

		initialize: function (options) {
            options = options || {};
            this.userAuthed = options.userAuthed;
		},

		events: {
            'click #accountDropdownList > li': 'handleTabClicked'
        },

        handleTabClicked: function (e) {
            this.trigger('account-tab-clicked', e.currentTarget.id);
        },

		render: function (options) {
			var self = this;
            options = options || {};

            this.$el.html(AccountDropdownViewTpl({
                signInOutText: this.userAuthed ? 'Sign Out' : 'Sign In'
            }));
		}
	});

	return AccountDropdownView;

});
