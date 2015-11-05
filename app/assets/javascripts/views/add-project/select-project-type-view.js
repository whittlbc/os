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

    var ourBlue = '#00A6C9';

    var SelectProjectTypeView = Backbone.View.extend({

        initialize: function (){
        },

        events: {
            'click .project-type-selection': 'handleTypeSelected'
        },

        handleTypeSelected: function (e) {
            var self = this;
            var type = $(e.currentTarget).attr('data-project-type-index');
            this.selectedType = OSUtil.TYPE_MAP[type];
            this.render();
            this.trigger('type:selected', type);
        },

        autoSelectType: function () {
            var self = this;
            this.selectedType = OSUtil.TYPE_MAP['on-the-fence'];
            this.render();
        },

        setHeight: function (height) {
            var self = this;
            this.$el.find('.select-project-type-view').height(height);
        },

        setUpForGrabsToggle: function (bool) {
            this.hideUpForGrabs = bool;
        },

        setOnlyOnTheFenceToggle: function (bool) {
            this.onlyOnTheFence = bool;
        },

        toggleHighlight: function (pos, hoverOn) {
            var color = hoverOn ? ourBlue : 'black';
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
                    $parent = this.onTheFence.$el.parent();
                    if (!$parent.hasClass('selected-type') || ($parent.hasClass('selected-type') && hoverOn)) {
                        this.onTheFence.changeColor(color);
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
                upForGrabsSelected: this.selectedType == OSUtil.TYPE_MAP['up-for-grabs'],
                onTheFenceSelected: this.selectedType == OSUtil.TYPE_MAP['on-the-fence'],
                launchedSelected: this.selectedType == OSUtil.TYPE_MAP['launched'],
                hideUpForGrabs: this.hideUpForGrabs,
                onlyOnTheFence: this.onlyOnTheFence
            }));

            // Type 0
            this.upForGrabs = new SVG({
                el: '[data-project-type-index=up-for-grabs] > .create-project-icon',
                svg: 'up-for-grabs'
            });

            this.$type0Text = this.$el.find('[data-project-type-index=up-for-grabs] > .project-type-selection-text');

            this.upForGrabs.$el.parent().hover(function () {
                self.toggleHighlight(0, true);
            }, function () {
                self.toggleHighlight(0, false);
            });

            this.upForGrabs.render();

            // Type 1
            this.onTheFence = new SVG({
                el: '[data-project-type-index=on-the-fence] > .create-project-icon',
                svg: 'on-the-fence'
            });

            this.$type1Text = this.$el.find('[data-project-type-index=on-the-fence] > .project-type-selection-text');

            this.onTheFence.$el.parent().hover(function () {
                self.toggleHighlight(1, true);
            }, function () {
                self.toggleHighlight(1, false);
            });

            this.onTheFence.render();

            // Type 2
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
                case OSUtil.TYPE_MAP['up-for-grabs']:
                    this.toggleHighlight(0, true);
                    break;
                case OSUtil.TYPE_MAP['on-the-fence']:
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
