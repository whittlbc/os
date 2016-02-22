define(['jquery',
	'backbone',
	'underscore',
  'models/os.util',
  'models/project',
  'views/widgets/user-info-bubble',
  'stache!views/projects/major/implementation/implementation-item',
  'backbone-eventbroker',
  'toggle'
    ], function ($,
   Backbone,
   _,
   OSUtil,
   Project,
   UserInfoBubble,
   ImplementationItemTpl) {
	'use strict';

	var ImplementationItem = Backbone.View.extend({

		initialize: function (options) {
      options = options || {};
      this.model = options.model;
      this.model.set('post_date', OSUtil.getTimeAgo(this.model.get('post_date')));
		},

    events: {
      'click .imp-vote-count': 'checkIfAuthed'
    },

    checkIfAuthed: function () {
      Backbone.EventBroker.trigger('login-or-implementation-vote', this);
    },

    handleVote: function (userUUID) {
      var voteCount = this.model.get('vote_count');
      voteCount++;
      this.model.set('vote_count', voteCount);
      this.model.set('voted', true);
      this.$el.find('.imp-vote-count > span').html(voteCount);
      this.$el.find('.imp-vote-count').addClass('voted');

      var project = new Project();
      project.implementationVote({ uuid: this.model.get('uuid'), user_uuid: userUUID });
    },

    setMarginTopOfVoteContainer: function () {
      var $voteCount = this.$el.find('.imp-vote-count');
      $voteCount.css({ marginTop: ((this.$el.find('.implementation-item').height() - $voteCount.height()) / 2) });
      $voteCount.css({ opacity: 1 });
    },

    showBubble: function () {
      if (!this.bubbleShown) {
        this.$el.find('.poster-info-bubble').show();
        this.bubbleShown = true;
      }
    },

    hideBubble: function () {
      if (this.bubbleShown) {
        this.$el.find('.poster-info-bubble').hide();
        this.bubbleShown = false;
      }
    },

		render: function () {
      var self = this;

      var showBottom = !!this.model.get('slack_url') || !!this.model.get('hipchat_url') || !!this.model.get('irc_url') || !!this.model.get('in_progress') || !!this.model.get('seeking_contributors');

      var display = this.model.toJSON();

      _.extend(display, {
        showBottom: showBottom
      });

      this.$el.html(ImplementationItemTpl(display));

      setTimeout(function () {
        self.setMarginTopOfVoteContainer();
      }, 1);

      this.userInfoBubble = new UserInfoBubble({
        el: this.$el.find('.poster-info-bubble')
      });

      this.userInfoBubble.render({
        userPic: this.model.get('poster_pic'),
        ghUsername: this.model.get('poster_gh_username')
      });

      _.each(['.posted-by > img', '.poster-info-bubble'], function (selector) {
        self.$el.find(selector).hover(function () {
          self.showBubble();
        }, function () {
          self.hideBubble();
        });
      });

      this.$el.find('[data-toggle="tooltip"]').tooltip();
    }

	});

	return ImplementationItem;

});
