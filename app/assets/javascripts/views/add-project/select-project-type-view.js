define(['jquery',
	'backbone',
	'underscore',
	'stache!views/add-project/select-project-type-view'
    ], function ($,
     Backbone,
     _,
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
            console.log(e.currentTarget.id);
            this.trigger('type:selected', e.currentTarget.id);
        },

        setHeight: function (height) {
            var self = this;
            this.$el.find('.select-project-type-view').height(height);
        },

		render: function () {
			var self = this;
            this.$el.html(SelectProjectTypeViewTpl({
            }));
		}
	});

	return SelectProjectTypeView;

});
