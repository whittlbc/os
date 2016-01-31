define(['jquery',
  'backbone',
  'underscore',
  'models/os.util',
  'views/svgs/svg-view',
  'stache!views/add-project/select-project-source-view',
  'stache!views/add-project/select-up-for-grabs'
], function ($,
   Backbone,
   _,
   OSUtil,
   SVG,
   SelectProjectSourceViewTpl,
   SelectUpForGrabsTpl
) {
  'use strict';

  var ourBlue = '#00A6C9';

  // this.upForGrabs IS A BOOLEAN!!

  var SelectProjectSourceView = Backbone.View.extend({

    initialize: function () {
      var self = this;
      var types = OSUtil.PROJECT_TYPES;
      var templates = [SelectUpForGrabsTpl, SelectProjectSourceViewTpl];
      var options = ['getUpForGrabsOptions', 'getSourceOptions'];

      this.templateMap = {};
      this.optionsMap = {};

      _.each(types, function (stage, i) {
        self.templateMap[stage] = templates[i];
        self.optionsMap[stage] = options[i];
      });
    },

    events: {
      'click .project-source-selection': 'handleSourceSelected',
      'click .ufg-choice': 'handleChoseUpForGrabs'
    },

    handleChoseUpForGrabs: function (e) {
      var $target = $(e.currentTarget);
      this.upForGrabs = $target.attr('data-ufg') === 'yes';

      this.render({
        selectedStage: OSUtil.PROJECT_TYPES[0]
      });

      this.trigger('ufg:selected', this.upForGrabs);
    },

    handleSourceSelected: function (e) {
      var $target = $(e.currentTarget);
      var source = $target.attr('data-source');
      this.selectedSource = source;
      this.render();
      this.trigger('source:selected', source);
    },

    setHeight: function (height) {
      this.$el.find('.select-project-source-view').height(height);
    },

    toggleHighlight: function (iconIndex, hoverOn) {
      var color = hoverOn ? ourBlue : 'black';
      var $el;

      switch (iconIndex) {
        case 0:
          $el = this.$el.find('[data-source=gh]');
          if (!$el.hasClass('selected') || ($el.hasClass('selected') && hoverOn)) {
            this.github.changeColor(color);
            this.$source1Text.css('color', color);
          }
          break;
        case 1:
          $el = this.$el.find('[data-source=scratch]');
          if (!$el.hasClass('selected') || ($el.hasClass('selected') && hoverOn)) {
            this.createFromScratch.changeColor(color);
            this.$source2Text.css('color', color);
            break;
          }
      }
    },

    renderIcons: function () {
      var self = this;

      // Github
      this.github = new SVG({
        el: this.$el.find('[data-source=gh] > .create-project-icon'),
        svg: 'github'
      });

      this.$source1Text = this.$el.find('[data-source=gh] > .project-source-selection-text');

      this.$el.find('[data-source=gh]').hover(function () {
        self.toggleHighlight(0, true);
      }, function () {
        self.toggleHighlight(0, false);
      });

      this.github.render();

      // Scratch
      this.createFromScratch = new SVG({
        el: this.$el.find('[data-source=scratch] > .create-project-icon'),
        svg: 'create-from-scratch'
      });

      this.$source2Text = this.$el.find('[data-source=scratch] > .project-source-selection-text');

      this.$el.find('[data-source=scratch]').hover(function () {
        self.toggleHighlight(1, true);
      }, function () {
        self.toggleHighlight(1, false);
      });

      this.createFromScratch.render();
    },

    getUpForGrabsOptions: function () {
      return { upForGrabs: this.upForGrabs };
    },

    getSourceOptions: function () {
      return {
        ghSelected: this.selectedSource == OSUtil.SOURCE_TYPES[0],
        scratchSelected: this.selectedSource == OSUtil.SOURCE_TYPES[1]
      }
    },

    render: function (options) {
      options = options || {};

      var template = this.templateMap[options.selectedStage || OSUtil.PROJECT_TYPES[1]];
      var options = this[this.optionsMap[options.selectedStage || OSUtil.PROJECT_TYPES[1]]]();

      this.$el.html(template(options));

      this.renderIcons();

      if (this.selectedSource) {
        this.toggleHighlight(OSUtil.SOURCE_TYPES.indexOf(this.selectedSource), true);
      }
    }
  });

  return SelectProjectSourceView;

});
