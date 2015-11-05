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

        addHoverListeners: function () {
            for (var i = 0; i < this.icons.length; i++) {
                var icon = this.icons[i];
                icon.$el.parent().hover(function () {
                    icon.changeColor('#00A6C9');
                }, function () {
                    icon.changeColor('#000000');
                });
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

            this.upForGrabs = new SVG({
                el: '[data-project-type-index=up-for-grabs] > .create-project-icon',
                svg: 'up-for-grabs'
            });
            this.upForGrabs.$el.parent().hover(function () {
                self.upForGrabs.changeColor('#00A6C9');
                $(this).find('.project-type-selection-text').css('color', '#00A6C9');
            }, function () {
                self.upForGrabs.changeColor('#000000');
                $(this).find('.project-type-selection-text').css('color', '#000000');
            });
            this.upForGrabs.render();

            this.onTheFence = new SVG({
                el: '[data-project-type-index=on-the-fence] > .create-project-icon',
                svg: 'on-the-fence'
            });
            this.onTheFence.$el.parent().hover(function () {
                self.onTheFence.changeColor('#00A6C9');
                $(this).find('.project-type-selection-text').css('color', '#00A6C9');
            }, function () {
                self.onTheFence.changeColor('#000000');
                $(this).find('.project-type-selection-text').css('color', '#000000');
            });
            this.onTheFence.render();

            this.launched = new SVG({
                el: '[data-project-type-index=launched] > .create-project-icon',
                svg: 'launched'
            });
            this.launched.$el.parent().hover(function () {
                self.launched.changeColor('#00A6C9');
                $(this).find('.project-type-selection-text').css('color', '#00A6C9');
            }, function () {
                self.launched.changeColor('#000000');
                $(this).find('.project-type-selection-text').css('color', '#000000');
            });
            this.launched.render();
        }
	});

	return SelectProjectTypeView;

});
