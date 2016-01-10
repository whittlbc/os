define(['jquery',
  'backbone',
  'underscore',
  'views/projects/minor/minor-info/minor-info-view',
  'views/projects/minor/evolution/evolution-view',
  'stache!views/projects/minor/minor-info-evolution-view',
  'tabs',
  'backbone-eventbroker'
], function ($,
             Backbone,
             _,
             MinorInfoView,
             EvolutionView,
             MinorInfoEvolutionViewTpl) {
  'use strict';

  var MinorInfoEvolutionView = Backbone.View.extend({

    initialize: function () {
    },

    events: {
      'click .info-evolution-toggle-btn': 'handleClickToggleBtn'
    },

    handleClickToggleBtn: function (e) {
      var self = this;
      var $flipper = this.$el.find('#minorInfoEvolutionFlipper');
      if (e.currentTarget.id == 'info' && $flipper.hasClass('flipped')) {
        this.infoBtnActive();
        $flipper.removeClass('flipped');
        this.voidToggleClicks();
      } else if (e.currentTarget.id == 'evolution' && !$flipper.hasClass('flipped')) {
        Backbone.EventBroker.trigger('evolution:fetch');
        this.evolutionBtnActive();
        $flipper.addClass('flipped');
        this.voidToggleClicks();
      }
    },

    infoBtnActive: function () {
      this.$el.find('#info').addClass('active');
      this.$el.find('#evolution').removeClass('active');
    },

    evolutionBtnActive: function () {
      this.$el.find('#evolution').addClass('active');
      this.$el.find('#info').removeClass('active');
    },

    voidToggleClicks: function () {
      var $infoBtn = this.$el.find('#info');
      var $evolutionBtn = this.$el.find('#evolution');
      $infoBtn.css('pointer-events', 'none');
      $evolutionBtn.css('pointer-events', 'none');
      setTimeout(function () {
        $infoBtn.css('pointer-events', 'initial');
        $evolutionBtn.css('pointer-events', 'initial');
      }, 400);
    },

    lazyLoadContribs: function (contribs, wasError) {
      this.minorInfoView.lazyLoadContribs(contribs, wasError);
    },

    lazyLoadRepoStats: function (data) {
      this.minorInfoView.lazyLoadRepoStats(data);
    },

    showEditMode: function (data) {
      var self = this;
      this.minorInfoView.showEditMode(data);
    },

    getSavedEditData: function () {
      return this.minorInfoView.getSavedEditData();
    },

    render: function (options) {
      var self = this;
      options = options || {};

      this.$el.html(MinorInfoEvolutionViewTpl({
        launched: options.status == 2
      }));

      this.minorInfoView = new MinorInfoView({
        el: '#minorInfoView'
      });
      this.minorInfoView.render(options);

      this.evolutionView = new EvolutionView({
        el: '#evolutionView'
      });
      this.evolutionView.render(options);

    }
  });

  return MinorInfoEvolutionView;

});
