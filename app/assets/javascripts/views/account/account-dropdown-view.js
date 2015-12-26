define(['jquery',
  'backbone',
  'underscore',
  'views/os.view',
  'stache!views/account/account-dropdown-view',
  'backbone-eventbroker'
], function ($,
             Backbone,
             _,
             OSView,
             AccountDropdownViewTpl) {
  'use strict';

  var AccountDropdownView = OSView.extend({

    postInitialize: function (options) {
      options = options || {};
    },

    events: {},

    handleTabClicked: function (e) {
      e.stopPropagation();
      this.trigger('account-tab-clicked', e.currentTarget.id);
    },

    render: function (options) {
      var self = this;
      options = options || {};

      this.$el.html(AccountDropdownViewTpl({
        userAuthed: !!this.currentUser
      }));

      this.$el.find('#accountDropdownList > li').click(function (e) {
        self.handleTabClicked(e);
      });
    }
  });

  return AccountDropdownView;

});
