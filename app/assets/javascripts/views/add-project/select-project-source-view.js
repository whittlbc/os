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
        },

		events: {
            'click .project-source-selection': 'handleSourceSelected'
        },

        showSelection3: function () {
            var self = this;
            console.log('show selection');
            this.showPullFromIdeas = true;
            this.render();
        },

        hideSelection3: function () {
            var self = this;
            console.log('hide selection');
            this.showPullFromIdeas = false;
            this.render();
        },

        handleSourceSelected: function (e) {
            var self = this;
            this.trigger('source:selected', e.currentTarget.id);
        },

        setHeight: function (height) {
            var self = this;
            this.$el.find('.select-project-source-view').height(height);
        },

		render: function () {
			var self = this;
            this.$el.html(SelectProjectSourceViewTpl({
                showPullFromIdeas: this.showPullFromIdeas
            }));
		}
	});

	return SelectProjectSourceView;

});
