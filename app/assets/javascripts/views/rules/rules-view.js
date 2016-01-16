define(['jquery',
  'backbone',
  'underscore',
  'stache!views/rules/rules-view'
], function ($,
             Backbone,
             _,
             RulesViewTpl) {
  'use strict';

  var RulesView = Backbone.View.extend({

    initialize: function () {
    },

    events: {
      'click .project-type-name > span': 'toggleShowScenarios'
    },

    toggleShowScenarios: function (e) {
      var $showScenariosBtn = $(e.currentTarget);
      var $scenarios = $showScenariosBtn.parent().next();
      $scenarios.hasClass('expand') ?
        this.collapseScenarios($scenarios, $showScenariosBtn) : this.expandScenarios($scenarios, $showScenariosBtn);
    },

    expandScenarios: function ($fuckSafari, $showScenariosBtn) {
      $showScenariosBtn.html('hide scenarios');
      $fuckSafari.addClass('expand');
    },

    collapseScenarios: function $scenarios($fuckSafari, $showScenariosBtn) {
      $showScenariosBtn.html('show scenarios');
      $fuckSafari.removeClass('expand');
    },

    render: function () {
      this.$el.html(RulesViewTpl());
    }
  });

  return RulesView;

});