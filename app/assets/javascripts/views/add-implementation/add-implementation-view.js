define(['jquery',
	'backbone',
	'underscore',
  'models/os.util',
  'models/implementation',
  'views/widgets/spinner-chasing-dots',
  'stache!views/add-implementation/add-implementation-view'
    ], function ($,
     Backbone,
     _,
     OSUtil,
     Implementation,
     Spinner,
     AddImplementationViewTpl) {
	'use strict';

	var AddImplementationView = Backbone.View.extend({

		initialize: function () {
      this.setInitialVars();
		},

    reset: function () {
      this.setInitialVars();
      this.render();
    },

    setInitialVars: function () {
      this.is_owner = null;
      this.done = null;
      this.seeking_contributors = null;
    },

		events: {
      'click [data-question="is_owner"] .data-answer-btn': 'handleChoseIsOwner',
      'click [data-question="done"] .data-answer-btn': 'handleChoseDone',
      'click [data-question="seeking_contributors"] .data-answer-btn ': 'handleChoseSeekingContributors',
      'click [data-trigger="create"]': 'validate'
    },

    validate: function () {
      var validations = [];
      var data = this.getData();
      var questionHeight = this.$el.find('[data-question="is_owner"]').height();
      var questionHeightMultiplier = null;

      validations.push(this.ensureSomeURLExists(data));

      var ownerSelected = this.ensureOwnerSelected(data);

      if (ownerSelected) {
        if (data.is_owner) {
          var doneSelected = this.ensureDoneSelected(data);
          validations.push(doneSelected);

          var seekingContribsSelected = this.ensureSeekingContribsSelected(data);
          validations.push(seekingContribsSelected);

          if (!seekingContribsSelected) {
            questionHeightMultiplier = 2
          }

          if (!doneSelected) {
            questionHeightMultiplier = 1;
          }
        }
      } else {
        questionHeightMultiplier = 0;
      }

      for (var i = 0; i < validations.length; i++) {
        if (!validations[i]) {
          if (questionHeightMultiplier != null) {
            this.$el.find('.add-implementation-scroll-container').animate({
              scrollTop: (questionHeight * questionHeightMultiplier)
            }, {
              duration: 300,
              specialEasing: 'easeInOutCubic'
            });
          }
          return;
        }
      }

      this.render({ spinnerView: true });
      Backbone.EventBroker.trigger('implementation:add', data);
    },

    ensureOwnerSelected: function (data) {
      if (data.is_owner == null) {
        this.$el.find('[data-question="is_owner"] > .question > span').show();
        return false;
      }

      return true;
    },

    ensureDoneSelected: function (data) {
      if (data.done == null) {
        this.$el.find('[data-question="done"] > .question > span').show();
        return false;
      }

      return true;
    },

    ensureSeekingContribsSelected: function (data) {
      if (data.seeking_contributors == null) {
        this.$el.find('[data-question="seeking_contributors"] > .question > span').show();
        return false;
      }

      return true;
    },

    ensureSomeURLExists: function (data) {
      if (data.irc.channel && data.irc.network) {
        return true;
      }

      var someURLExists = false;

      var keys = [
        'github_url',
        'other_url',
        'slack_url',
        'hipchat_url'
      ];

      _.each(keys, function (key) {
        if (data[key]) {
          someURLExists = true;
        }
      });

      if (!someURLExists) {
        this.$el.find('.add-url-error-message').show();
      }

      return someURLExists;
    },

    getData: function () {
      return {
        is_owner: this.is_owner,
        done: this.done,
        seeking_contributors: this.seeking_contributors,
        description: this.$description.val().trim() || null,
        github_url: this.$el.find('[name="gh-repo"]').val().trim() || null,
        other_url: this.$el.find('[name="other-url"]').val().trim() || null,
        slack_url: this.$el.find('[name="slack"]').val().trim() || null,
        hipchat_url: this.$el.find('[name="hipchat"]').val().trim() || null,
        irc: {
          channel: this.$el.find('[name="irc"]').val().trim() || null,
          network: this.irc.network
        }
      };
    },

    handleChoseIsOwner: function (e) {
      var $target = $(e.currentTarget);
      $target.closest('[data-question="is_owner"]').find('.question > span').hide();

      if (!$target.hasClass('selected')) {
        this.$el.find('[data-question="is_owner"] .data-answer-btn').removeClass('selected');
        $(e.currentTarget).addClass('selected');
        if ($(e.currentTarget).parent().attr('data-answer') === 'yes') {
          this.expand();
          this.is_owner = true;
        } else {
          this.collapse();
          this.is_owner = false;
        }
      }
    },

    handleChoseDone: function (e) {
      var $target = $(e.currentTarget);
      $target.closest('[data-question="done"]').find('.question > span').hide();

      if (!$target.hasClass('selected')) {
        this.$el.find('[data-question="done"] .data-answer-btn').removeClass('selected');
        $(e.currentTarget).addClass('selected');
        this.done = ($(e.currentTarget).parent().attr('data-answer') === 'yes');
      }
    },

    handleChoseSeekingContributors: function (e) {
      var $target = $(e.currentTarget);
      $target.closest('[data-question="seeking_contributors"]').find('.question > span').hide();

      if (!$target.hasClass('selected')) {
        this.$el.find('[data-question="seeking_contributors"] .data-answer-btn').removeClass('selected');
        $(e.currentTarget).addClass('selected');
        this.seeking_contributors = ($(e.currentTarget).parent().attr('data-answer') === 'yes');
      }
    },

    expand: function() {
      this.$el.find('.questions-pending').addClass('expand');
    },

    collapse: function() {
      var self = this;
      this.$el.find('.questions-pending').removeClass('expand');

      setTimeout(function () {
        self.$el.find('[data-question="done"] .data-answer-btn').removeClass('selected');
        self.$el.find('[data-question="seeking_contributors"] .data-answer-btn').removeClass('selected');
        self.$el.find('[data-question="done"] > .question > span').hide();
        self.$el.find('[data-question="seeking_contributors"] > .question > span').hide();
        self.done = null;
        self.seeking_contributors = null;
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

    addKeyDownListeners: function () {
      var self = this;
      var names = ['gh-repo', 'other-url', 'slack', 'hipchat', 'irc'];

      _.each(names, function (name) {
        self.$el.find('[name="' + name + '"]').keydown(function () {
          self.$el.find('.add-url-error-message').hide();
        });
      });
    },

    render: function (options) {
      options = options || {};

			this.$el.html(AddImplementationViewTpl({
        spinnerView: options.spinnerView
      }));

      if (options.spinnerView) {
        this.spinner = new Spinner({
          el: '#addImplementationSpinner',
          width: '95px',
          height: '95px'
        });

        this.spinner.render();
      } else {
        this.initIRCNetworkDropdown();

        this.$description = this.$el.find('.add-implementation-description-container > textarea');

        this.addKeyDownListeners();
      }
		}
	});

	return AddImplementationView;

});
