define(['jquery',
  'backbone',
  'underscore',
  'views/projects/minor/minor-info/contributors-item-view',
  'views/widgets/spinner-chasing-dots',
  'stache!views/projects/minor/minor-info/contributors-view'
], function ($,
             Backbone,
             _,
             ContributorsItemView,
             Spinner,
             ContributorsViewTpl) {
  'use strict';

  var ContributorsView = Backbone.View.extend({

    initialize: function () {
      this.maxShownContribs = 13;
    },

    events: {},

    populate: function () {
      var self = this;
      this.CONTRIBUTORS = [];
      this.$el.find('#contributorsListView').empty();
      for (var i = 0; i < this.shownContributors.length; i++) {
        this.addContrib(this.shownContributors[i], i);
      }
      if (this.allContributors.length > this.maxShownContribs) {
        var $seeAllContribsBtn = $('<li>', {
          class: 'see-all-contribs-btn'
        });
        $seeAllContribsBtn.html('See All');
        $seeAllContribsBtn.click(function () {
          Backbone.EventBroker.trigger('contribs-modal:show');
        });
        this.$el.find('#contributorsListView').append($seeAllContribsBtn);
      }
    },

    addContrib: function (data, i) {
      var self = this;
      var contribItemView = new ContributorsItemView({
        tagName: 'li',
        ghUsername: data.login,
        admin: data.admin,
        anonProj: this.anon,
        pic: data.avatar_url,
        index: i
      });
      contribItemView.render();
      this.listenTo(contribItemView, 'hide-all-other-bubbles', function (view) {
        self.hideAllBubbles(view);
      });
      this.$el.find('#contributorsListView').append(contribItemView.el);
      this.CONTRIBUTORS.push(contribItemView);
    },

    hideAllBubbles: function (view) {
      var self = this;
      for (var i = 0; i < this.CONTRIBUTORS.length; i++) {
        if (this.CONTRIBUTORS[i] != view) {
          this.CONTRIBUTORS[i].contributorInfoBubble.fadeOut();
        }
      }
    },

    render: function (options) {
      var self = this;
      this.anon = options.anon;

      this.$el.html(ContributorsViewTpl({
        showSpinner: options.showSpinner
      }));
      if (options.showSpinner) {
        this.spinner = new Spinner({
          el: '#contribsLoading',
          width: '35px',
          height: '35px'
        });

        // Don't show the spinner timeout unless it's been loading for more than 300 ms
        setTimeout(function () {
          self.spinner.render();
        }, 300);

      } else {
        this.allContributors = options.contributors;
        this.shownContributors = options.contributors.slice(0, this.maxShownContribs);
        this.populate();
      }
    }
  });

  return ContributorsView;

});
