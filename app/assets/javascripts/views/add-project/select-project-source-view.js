define(['jquery',
	'backbone',
	'underscore',
	'stache!views/add-project/select-project-source-view'
    ], function ($,
     Backbone,
     _,
     SelectProjectSourceViewTpl) {
	'use strict';

	var SelectProjectSourceView = Backbone.View.extend({

		initialize: function (){
            // this.sourceMap is set from CreateNewProjectPopup
        },

		events: {
            'click .project-source-selection': 'handleSourceSelected'
        },

        handleSourceSelected: function (e) {
            var self = this;
            this.selectedSource = this.sourceMap[e.currentTarget.id];
            this.render();
            this.trigger('source:selected', e.currentTarget.id);
        },

        setHeight: function (height) {
            var self = this;
            this.$el.find('.select-project-source-view').height(height);
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
                ghSelected: this.selectedSource == this.sourceMap['gh'],
                scratchSelected: this.selectedSource == this.sourceMap['scratch'],
                ideasSelected: this.selectedSource == this.sourceMap['pull-from-ideas'],
                upForGrabsType: upForGrabsType
            }));
		}
	});

	return SelectProjectSourceView;

});
