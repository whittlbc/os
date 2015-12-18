define(['jquery',
  'backbone',
  'underscore',
  'models/os.util',
  'stache!views/widgets/user-info-bubble'
], function ($,
             Backbone,
             _,
             OSUtil,
             UserInfoBubbleTpl) {
  'use strict';

  var UserInfoBubble = Backbone.View.extend({

    initialize: function () {
    },

    events: {
      'click .user-bubble-pic': 'handleUserPicClicked'
    },

    handleUserPicClicked: function (e) {
      var self = this;
      e.stopPropagation();
      if (!this.anon) {
        window.open(self.ghProfile, '_blank');
      }
    },

    render: function (options) {
      options = options || {};
      var self = this;
      this.anon = options.anon;

      this.$el.click(function (e) {
        e.stopPropagation();
      });

      var ghUsername = options && options.ghUsername ? options.ghUsername : '';
      this.ghProfile = 'https://github.com/' + ghUsername;

      this.$el.html(UserInfoBubbleTpl({
        userPic: options && options.userPic ? options.userPic : OSUtil.NO_USER_PIC,
        ghUsername: ghUsername,
        showLink: !_.isEmpty(ghUsername),
        ghProfile: this.ghProfile,
        anon: options.anon
      }));
    }
  });

  return UserInfoBubble;

});
