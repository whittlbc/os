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

            this.githubLogo = new SVG({
                el: '#gh > .create-project-icon',
                svg: 'github'
            });
            this.githubLogo.$el.parent().hover(function () {
                self.githubLogo.changeColor('#00A6C9');
                $(this).find('.project-source-selection-text').css('color', '#00A6C9');
            }, function () {
                self.githubLogo.changeColor('#000000');
                $(this).find('.project-source-selection-text').css('color', '#000000');
            });
            this.githubLogo.render();

            this.createFromScratch = new SVG({
                el: '#scratch > .create-project-icon',
                svg: 'create-from-scratch'
            });
            this.createFromScratch.$el.parent().hover(function () {
                self.createFromScratch.changeColor('#00A6C9');
                $(this).find('.project-source-selection-text').css('color', '#00A6C9');
            }, function () {
                self.createFromScratch.changeColor('#000000');
                $(this).find('.project-source-selection-text').css('color', '#000000');
            });
            this.createFromScratch.render();

            this.pullFromIdeas = new SVG({
                el: '#pull-from-ideas > .create-project-icon',
                svg: 'pull-from-ideas'
            });
            this.pullFromIdeas.$el.parent().hover(function () {
                self.pullFromIdeas.changeColor('#00A6C9');
                $(this).find('.project-source-selection-text').css('color', '#00A6C9');
            }, function () {
                self.pullFromIdeas.changeColor('#000000');
                $(this).find('.project-source-selection-text').css('color', '#000000');
            });
            this.pullFromIdeas.render();
		}
	});

	return SelectProjectSourceView;

});
