define(['jquery',
  'backbone',
  'underscore',
  'models/os.util',
  'views/svgs/svg-view',
  'stache!views/add-project/select-project-stage-view'
], function ($,
   Backbone,
   _,
   OSUtil,
   SVG,
   SelectProjectStageViewTpl) {
  'use strict';

  var SelectProjectStageView = Backbone.View.extend({

    initialize: function () {
    },

    events: {
      'click .project-stage-selection': 'handleStageSelected'
    },

    handleStageSelected: function (e) {
      var stage = $(e.currentTarget).attr('data-stage');
      this.selectedStage = stage;
      this.render();
      this.trigger('stage:selected', stage);
    },

    setHeight: function (height) {
      this.$el.find('.select-project-stage-view').height(height);
    },

    toggleHighlight: function (iconIndex, hoverOn) {
      var color = hoverOn ? '#00A6C9' : 'black';
      var $el;

      switch (iconIndex) {
        case 0:
          $el = this.$el.find('[data-stage=ideas]');
          if (!$el.hasClass('selected') || ($el.hasClass('selected') && hoverOn)) {
            this.stage1.changeColor(color);
            this.$stage1Text.css('color', color);
          }
          break;
        case 1:
          $el = this.$el.find('[data-stage=launched]');
          if (!$el.hasClass('selected') || ($el.hasClass('selected') && hoverOn)) {
            this.stage2.changeColor(color);
            this.$stage2Text.css('color', color);
            break;
          }
      }
    },

    renderIcons: function () {
      var self = this;

      // IDEA
      this.stage1 = new SVG({
        el: this.$el.find('[data-stage=ideas] > .create-project-icon'),
        svg: 'on-the-fence'
      });

      this.$stage1Text = this.$el.find('[data-stage=ideas] > .project-stage-selection-text');

      this.$el.find('[data-stage=ideas]').hover(function () {
        self.toggleHighlight(0, true);
      }, function () {
        self.toggleHighlight(0, false);
      });

      this.stage1.render();

      // LAUNCHED
      this.stage2 = new SVG({
        el: this.$el.find('[data-stage=launched] > .create-project-icon'),
        svg: 'launched'
      });

      this.$stage2Text = this.$el.find('[data-stage=launched] > .project-stage-selection-text');

      this.$el.find('[data-stage=launched]').hover(function () {
        self.toggleHighlight(1, true);
      }, function () {
        self.toggleHighlight(1, false);
      });

      this.stage2.render();
    },

    render: function () {

      this.$el.html(SelectProjectStageViewTpl({
        ideaSelected: this.selectedStage === OSUtil.PROJECT_TYPES[0],
        launchedSelected: this.selectedStage === OSUtil.PROJECT_TYPES[1]
      }));

      this.renderIcons();

      if (this.selectedStage) {
        this.toggleHighlight(OSUtil.PROJECT_TYPES.indexOf(this.selectedStage), true);
      }
    }
  });

  return SelectProjectStageView;

});
