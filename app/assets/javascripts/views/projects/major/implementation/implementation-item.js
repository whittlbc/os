define(['jquery',
	'backbone',
	'underscore',
  'models/os.util',
  'models/project',
	'stache!views/projects/major/implementation/implementation-item',
  'backbone-eventbroker'
    ], function ($,
   Backbone,
   _,
   OSUtil,
   Project,
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
    },

    setWidthOfContent: function () {
      var width = (this.$el.find('.implementation-item').width() - this.$el.find('.vote-container'));
      this.$el.find('.content').width(width);
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
      }, 3);

    }

	});

	return ImplementationItem;

});
