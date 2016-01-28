define(['jquery',
  'backbone',
  'underscore',
  'views/filters/domain-filters-view',
  'views/filters/seeking-filters-view',
  'views/widgets/vertical-toggle',
  'stache!views/filters/minor-filters-view',
  'backbone-eventbroker'
], function ($,
             Backbone,
             _,
             DomainFiltersView,
             SeekingFiltersView,
             VerticalToggle,
             MinorFiltersViewTpl) {
  'use strict';

  var MinorFiltersView = Backbone.View.extend({

    initialize: function () {
      Backbone.EventBroker.register({
        'filters:remove-all': 'removeAllFilters',
        'adjust-seeking-filters': 'adjustSeekingFilters'
      }, this);
    },

    events: {},

    removeAllFilters: function () {
      var minorFilterViews = [
        this.domainFiltersView,
        this.seekingFiltersView
      ];

      _.each(minorFilterViews, function (view) {
        if (view) {
          view.removeAllFilters();
        }
      });
    },

    addDomainFilters: function () {
      var $div = $('<div>', {id: 'domainFiltersView'});
      this.$el.append($div);

      this.domainFiltersView = this.domainFiltersView || new DomainFiltersView();
      this.domainFiltersView.$el = $('#domainFiltersView');
      this.domainFiltersView.render();
    },

    removeDomainFilters: function () {
      this.domainFiltersView.remove();
      this.domainFiltersView.unbind();
    },

    addSeekingFilters: function () {
      var $div = $('<div>', {id: 'seekingFiltersView'});
      this.$el.append($div);

      this.seekingFiltersView = this.seekingFiltersView || new SeekingFiltersView();
      this.seekingFiltersView.$el = $('#seekingFiltersView');
      this.seekingFiltersView.render();
    },

    removeSeekingFilters: function () {
      var $seekingFilters = this.$el.find('#seekingFiltersView');
      $seekingFilters.remove();
      $seekingFilters.unbind();
    },

    togglePrivacyFilters: function () {
      var self = this;
      if (this.filterTypeDoesntExist('#privacyFiltersView')) {
        // create a div on the fly and append it to #minorFiltersView -- this will be your anchor for your filter view
        var $div = $('<div>', {id: 'privacyFiltersView'});
        this.$el.append($div);

        this.privacyFiltersView = new VerticalToggle({
          el: '#privacyFiltersView',
          topName: 'Open',
          topIcon: 'fa-users',
          bottomName: 'Request',
          bottomIcon: 'fa-lock'
        });

        this.privacyFiltersView.render();

      } else {
        Backbone.EventBroker.trigger('removePrivacyFilter');
        var $privacyFilters = this.$el.find('#privacyFiltersView');
        $privacyFilters.remove();
        $privacyFilters.unbind();
      }
    },

    filterTypeDoesntExist: function (id) {
      return this.$el.find(id).length === 0;
    },

    addDomainItem: function (data) {
      var self = this;
      if (this.filterTypeDoesntExist('#domainFiltersView')) {
        this.addDomainFilters();
      }

      this.domainFiltersView.addItem({
        value: data.value,
        animate: data.animate
      });
    },

    addSeekingItem: function (data) {
      if (this.filterTypeDoesntExist('#seekingFiltersView')) {
        this.addSeekingFilters();
      }

      this.seekingFiltersView.addItem({
        value: data.value,
        animate: data.animate
      });
    },

    removeDomainItem: function () {
      if (this.domainFiltersView.isEmpty()) {
        this.removeDomainFilters();
      }
    },

    removeSeekingItem: function () {
      if (this.seekingFiltersView.isEmpty()) {
        this.removeSeekingFilters();
      }
    },

    prePopulateFilters: function (filtersMap) {
      var self = this;
      var cachedDomainFilters = Object.keys(filtersMap[1]);
      var cachedSeekingFilters = Object.keys(filtersMap[2]);
      _.each(cachedDomainFilters, function (domain) {
        self.addDomainItem({
          value: domain,
          animate: false
        });
      });
      //_.each(cachedSeekingFilters, function (seeking) {
      //  self.addSeekingItem({
      //    value: seeking,
      //    animate: false
      //  });
      //});
    },

    adjustSeekingFilters: function (seekingFilters) {
      var self = this;

      // if filters aren't supposed to be there, but they are, remove them
      if (_.isEmpty(seekingFilters) && !this.filterTypeDoesntExist('#seekingFiltersView')) {
        this.removeSeekingFilters();
      }
      // if seeking filters should exist, proceed
      else if (!_.isEmpty(seekingFilters)){
        if (this.filterTypeDoesntExist('#seekingFiltersView')) {
          this.addSeekingFilters();
        }

        var currentFilters = this.seekingFiltersView.namesForFilters();

        // first add filters that SHOULD exist but don't

        console.log(seekingFilters, currentFilters);

        _.each(seekingFilters, function (filter) {
          if (!_.contains(currentFilters, filter)) {
            self.addSeekingItem({
              value: filter,
              animate: false
            });
          }
        });

        // then remove filters that exist but SHOULD NOT
        _.each(currentFilters, function (filter) {
          if (!_.contains(seekingFilters, filter)) {
            self.seekingFiltersView.forceDeleteItem(filter);
          }
        });
      }
    },

    render: function () {
      this.$el.html(MinorFiltersViewTpl());

      $(window).resize(function () {
        Backbone.EventBroker.trigger('resize-minor-filter-names');
      });
    }
  });

  return MinorFiltersView;

});
