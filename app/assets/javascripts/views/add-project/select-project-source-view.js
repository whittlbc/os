define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
    'views/svgs/svg-view',
	'stache!views/add-project/select-project-source-view'
    ], function ($,
     Backbone,
     _,
     OSUtil,
     SVG,
     SelectProjectSourceViewTpl) {
	'use strict';

    var ourBlue = '#00A6C9';

	var SelectProjectSourceView = Backbone.View.extend({

		initialize: function (){
        },

		events: {
            'click .project-source-selection': 'handleSourceSelected'
        },

        handleSourceSelected: function (e) {
            var self = this;
            this.selectedSource = OSUtil.SOURCE_MAP[e.currentTarget.id];
            this.render();
            this.trigger('source:selected', e.currentTarget.id);
        },

        autoSelectSource: function () {
            var self = this;
            this.selectedSource = OSUtil.SOURCE_MAP['pull-from-ideas'];
            this.render();
        },

        setHeight: function (height) {
            var self = this;
            this.$el.find('.select-project-source-view').height(height);
        },

        setOnlyPullFromIdeasToggle: function (bool) {
            this.onlyPullFromIdeas = bool
        },

        toggleHighlight: function (pos, hoverOn) {
            var color = hoverOn ? ourBlue : 'black';
            var $parent;

            switch (pos) {
                case 0:
                    $parent = this.githubLogo.$el.parent();
                    if (!$parent.hasClass('selected-source') || ($parent.hasClass('selected-source') && hoverOn)) {
                        this.githubLogo.changeColor(color);
                        this.$source0Text.css('color', color);
                    }
                    break;
                case 1:
                    $parent = this.createFromScratch.$el.parent();
                    if (!$parent.hasClass('selected-source') || ($parent.hasClass('selected-source') && hoverOn)) {
                        this.createFromScratch.changeColor(color);
                        this.$source1Text.css('color', color);
                        break;
                    }
                case 2:
                    $parent = this.pullFromIdeas.$el.parent();
                    if (!$parent.hasClass('selected-source') || ($parent.hasClass('selected-source') && hoverOn)) {
                        this.pullFromIdeas.changeColor(color);
                        this.$source2Text.css('color', color);
                        break;
                    }
            }
        },

		render: function (options) {
			var self = this;
            if (options && options.showPullFromIdeas !== undefined) {
                this.showPullFromIdeas = options.showPullFromIdeas;
            }
            if (options && options.selectedSource !== undefined) {
                this.selectedSource = options.selectedSource;
            }
            var upForGrabsType = false;
            if (options && options.upForGrabsType) {
                upForGrabsType = true;
            }

            this.$el.html(SelectProjectSourceViewTpl({
                showPullFromIdeas: this.showPullFromIdeas && !upForGrabsType,
                ghSelected: this.selectedSource == OSUtil.SOURCE_MAP['gh'],
                scratchSelected: this.selectedSource == OSUtil.SOURCE_MAP['scratch'],
                ideasSelected: this.selectedSource == OSUtil.SOURCE_MAP['pull-from-ideas'],
                upForGrabsType: upForGrabsType,
                onlyPullFromIdeas: this.onlyPullFromIdeas
            }));

            // Source 0
            this.githubLogo = new SVG({
                el: '#gh > .create-project-icon',
                svg: 'github'
            });

            this.$source0Text = this.$el.find('#gh > .project-source-selection-text');

            this.githubLogo.$el.parent().hover(function () {
                self.toggleHighlight(0, true);
            }, function () {
                self.toggleHighlight(0, false);
            });

            this.githubLogo.render();

            // Source 1
            this.createFromScratch = new SVG({
                el: '#scratch > .create-project-icon',
                svg: 'create-from-scratch'
            });

            this.$source1Text = this.$el.find('#scratch > .project-source-selection-text');

            this.createFromScratch.$el.parent().hover(function () {
                self.toggleHighlight(1, true);
            }, function () {
                self.toggleHighlight(1, false);
            });

            this.createFromScratch.render();

            // Source 2
            this.pullFromIdeas = new SVG({
                el: '#pull-from-ideas > .create-project-icon',
                svg: 'pull-from-ideas'
            });

            this.$source2Text = this.$el.find('#pull-from-ideas > .project-source-selection-text');

            this.pullFromIdeas.$el.parent().hover(function () {
                self.toggleHighlight(2, true);
            }, function () {
                self.toggleHighlight(2, false);
            });

            this.pullFromIdeas.render();

            // Add color to the selected source if there is one
            switch (this.selectedSource) {
                case OSUtil.SOURCE_MAP['gh']:
                    this.toggleHighlight(0, true);
                    break;
                case OSUtil.SOURCE_MAP['scratch']:
                    this.toggleHighlight(1, true);
                    break;
                case OSUtil.SOURCE_MAP['pull-from-ideas']:
                    this.toggleHighlight(2, true);
                    break;
            }

		}
	});

	return SelectProjectSourceView;

});
