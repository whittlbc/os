define(['jquery',
  'backbone',
  'underscore',
  'models/os.util',
  'views/svgs/svg-view',
  'stache!views/add-project/select-project-type-view'
], function ($,
   Backbone,
   _,
   OSUtil,
   SVG,
   SelectProjectTypeViewTpl) {
  'use strict';

  var SelectProjectTypeView = Backbone.View.extend({

    initialize: function () {
    },

    events: {
      'click .project-type-selection': 'handleTypeSelected'
    },

    handleTypeSelected: function (e) {
      var type = $(e.currentTarget).attr('data-project-type-index');
      this.selectedType = OSUtil.TYPE_MAP[type];
      this.render();
      this.trigger('type:selected', type);
    },

    // Not currently used, but leave in case we bring back pulling projects functionality - bwhit
    autoSelectType: function () {
      this.selectedType = OSUtil.TYPE_MAP['on-the-fence'];
      this.render();
    },

    setHeight: function (height) {
      this.$el.find('.select-project-type-view').height(height);
    },

    toggleHighlight: function (pos, hoverOn) {
      var color = hoverOn ? '#00A6C9' : 'black';
      var $parent;

      switch (pos) {
        case 0:
          $parent = this.upForGrabs.$el.parent();
          if (!$parent.hasClass('selected-type') || ($parent.hasClass('selected-type') && hoverOn)) {
            this.upForGrabs.changeColor(color);
            this.$type0Text.css('color', color);
          }
          break;
        case 1:
          $parent = this.idea.$el.parent();
          if (!$parent.hasClass('selected-type') || ($parent.hasClass('selected-type') && hoverOn)) {
            this.idea.changeColor(color);
            this.$type1Text.css('color', color);
            break;
          }
        case 2:
          $parent = this.launched.$el.parent();
          if (!$parent.hasClass('selected-type') || ($parent.hasClass('selected-type') && hoverOn)) {
            this.launched.changeColor(color);
            this.$type2Text.css('color', color);
            break;
          }
      }
    },

    render: function () {
      var self = this;

      this.$el.html(SelectProjectTypeViewTpl({
        ideaSelected: this.selectedType == OSUtil.TYPE_MAP['idea'],
        launchedSelected: this.selectedType == OSUtil.TYPE_MAP['launched']
      }));

      // IDEA
      this.idea = new SVG({
        el: '[data-project-type-index=idea] > .create-project-icon',
        svg: 'on-the-fence' // change this name
      });

      this.$type1Text = this.$el.find('[data-project-type-index=idea] > .project-type-selection-text');

      this.idea.$el.parent().hover(function () {
        self.toggleHighlight(1, true);
      }, function () {
        self.toggleHighlight(1, false);
      });

      this.idea.render();

      // LAUNCHED
      this.launched = new SVG({
        el: '[data-project-type-index=launched] > .create-project-icon',
        svg: 'launched'
      });

      this.$type2Text = this.$el.find('[data-project-type-index=launched] > .project-type-selection-text');

      this.launched.$el.parent().hover(function () {
        self.toggleHighlight(2, true);
      }, function () {
        self.toggleHighlight(2, false);
      });

      this.launched.render();

      // Add color to the selected type if there is one
      switch (this.selectedType) {
        case OSUtil.TYPE_MAP['idea']:
          this.toggleHighlight(1, true);
          break;
        case OSUtil.TYPE_MAP['launched']:
          this.toggleHighlight(2, true);
          break;
      }
    }
  });

  return SelectProjectTypeView;

});
