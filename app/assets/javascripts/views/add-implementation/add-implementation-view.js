define(['jquery',
	'backbone',
	'underscore',
  'models/os.util',
  'models/implementation',
	'stache!views/add-implementation/add-implementation-view'
    ], function ($,
     Backbone,
     _,
     OSUtil,
     Implementation,
     AddImplementationViewTpl) {
	'use strict';

	var AddImplementationView = Backbone.View.extend({

		initialize: function () {
      this.isOwner = false;
      this.done = false;
      this.seekingContributors = false;
		},

		events: {
      'click [data-question="is_owner"] .data-answer-btn ': 'handleChoseIsOwner',
      'click [data-question="done"] .data-answer-btn ': 'handleChoseDone',
      'click [data-question="seeking_contributors"] .data-answer-btn ': 'handleChoseSeekingContributors',
      'click .add-implementation-view.html': 'handleAddImplementation'
    },

    handleAddImplementation: function () {
      Backbone.EventBroker.trigger('implementation:add', this.getData());
    },

    getData: function () {
      return{
        is_owner: this.isOwner,
        done: this.done,
        seekingContributors: this.seekingContributors,
        description: this.$description.val()
      }
    },

    handleChoseIsOwner: function (e) {
      var $target = $(e.currentTarget);

      if (!$target.hasClass('selected')) {
        this.$el.find('[data-question="is_owner"] .data-answer-btn').removeClass('selected');
        $(e.currentTarget).addClass('selected');
        if ($(e.currentTarget).parent().attr('data-answer') === 'yes') {
          this.expand();
          this.isOwner = true;
        } else {
          this.collapse();
          this.isOwner = false;
        }
      }
    },

    handleChoseDone: function (e) {
      var $target = $(e.currentTarget);

      if (!$target.hasClass('selected')) {
        this.$el.find('[data-question="in_progress"] .data-answer-btn').removeClass('selected');
        $(e.currentTarget).addClass('selected');
        this.done = ($(e.currentTarget).parent().attr('data-answer') === 'yes');
      }
    },

    handleChoseSeekingContributors: function (e) {
      var $target = $(e.currentTarget);

      if (!$target.hasClass('selected')) {
        this.$el.find('[data-question="seeking_contributors"] .data-answer-btn').removeClass('selected');
        $(e.currentTarget).addClass('selected');
        this.seekingContributors = ($(e.currentTarget).parent().attr('data-answer') === 'yes');
      }
    },

    expand: function() {
      this.$pendingQuestions = this.$el.find('.questions-pending');
      var pendingQuestions = this.$pendingQuestions[0];
      var prevHeight = this.$pendingQuestions.height();
      this.$pendingQuestions.height('auto');
      var endHeight = getComputedStyle(pendingQuestions).height;
      this.$pendingQuestions.height(prevHeight);
      pendingQuestions.offsetHeight;
      this.$pendingQuestions.css({ transition: 'height 0.3s' });
      this.$pendingQuestions.height(endHeight);
    },

    collapse: function() {
      var self = this;

      this.$pendingQuestions = this.$el.find('.questions-pending');
      var pendingQuestions = this.$pendingQuestions[0];
      this.$pendingQuestions.height(getComputedStyle(pendingQuestions).height);
      pendingQuestions.offsetHeight;
      this.$pendingQuestions.height(0);
      setTimeout(function () {
        self.$el.find('[data-question="in_progress"] .data-answer-btn').removeClass('selected');
        self.$el.find('[data-question="seeking_contributors"] .data-answer-btn').removeClass('selected');
      }, 315);
    },

    initIRCNetworkDropdown: function () {
      var self = this;

      this.irc = {};

      var options = {
        theme: 'links',
        maxItems: 1,
        valueField: 'id',
        searchField: 'title',
        options: OSUtil.IRC_NETWORKS,
        onBlur: function () {
          self.irc.network = self.ircNetworkSelectize.getValue();
        },
        selectOnTab: false,
        render: {
          option: function (data, escape) {
            return '<div class="option title">' + escape(data.title) + '</div>';
          },
          item: function (data, escape) {
            return '<div class="item">' + escape(data.title) + '</div>';
          }
        }
      };
      var $ircNetworkSelect = this.$el.find('#ircNetwork').selectize(options);
      var ircNetworkSelectize = $ircNetworkSelect[0].selectize;
      this.ircNetworkSelectize = ircNetworkSelectize;
      this.ircNetworkSelectize.on('item_add', function () {
        self.irc.network = self.ircNetworkSelectize.getValue();
      });
      this.ircNetworkSelectize.on('item_remove', function () {
        self.irc.network = self.ircNetworkSelectize.getValue();
      });
      if (this.irc.network) {
        this.ircNetworkSelectize.setValue(this.irc.network);
      }
    },

    render: function () {
			this.$el.html(AddImplementationViewTpl());
      this.initIRCNetworkDropdown();
      this.$description = this.$el.find('.add-implementation-description-container > textarea');
		}
	});

	return AddImplementationView;

});
