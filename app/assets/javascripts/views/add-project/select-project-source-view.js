define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
	'stache!views/add-project/select-project-source-view'
    ], function ($,
     Backbone,
     _,
     OSUtil,
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
		}
	});

	return SelectProjectSourceView;

});
