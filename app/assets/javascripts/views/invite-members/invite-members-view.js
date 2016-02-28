define(['jquery',
	'backbone',
	'underscore',
  'models/user',
  'views/os.view',
  'views/widgets/spinner-chasing-dots',
  'stache!views/invite-members/invite-members-view'
  ], function ($,
   Backbone,
   _,
   User,
   OSView,
   Spinner,
   InviteMembersViewTpl
) {
	'use strict';

	var InviteMembersView = OSView.extend({

		postInitialize: function () {
		},

    events: {
      'click .submit-btn': 'handleSubmit'
    },

    handleSubmit: function () {
      var self = this;

      if (_.isEmpty(this.options)) {
        var uuid;
        var emails = _.map(this.$el.find('[name=invite-members]').val().split(','), function (email) {
          return email.trim();
        }).slice(0, 10);

        self.render({ spinnerView: true });

        if (this.currentUser) {
          uuid = this.currentUser.get('uuid');
        }

        var user = new User({ uuid: uuid });

        user.inviteUsers({ emails: emails }, {
          success: function () {
            setTimeout(function () {
              self.render({ successView: true });
            }, 250);
          },
          error: function () {
            setTimeout(function () {
              self.render({ errorView: true });
            }, 250);
          }
        });

      } else {
        this.trigger('close');
      }
    },

    render: function (options) {
      options = options || {};
      this.options = options;

      this.$el.html(InviteMembersViewTpl({
        spinnerView: options.spinnerView,
        successView: options.successView,
        errorView: options.errorView
      }));

      if (options.spinnerView) {
        this.spinner = new Spinner({
          el: '#inviteMembersSpinnerView',
          width: '75px',
          height: '75px'
        });

        this.spinner.render();
      }
    }
	});

	return InviteMembersView;

});
