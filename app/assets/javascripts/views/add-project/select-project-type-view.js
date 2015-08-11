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
            this.selectedType = this.typeMap[e.currentTarget.id];
            this.render();
            this.trigger('type:selected', e.currentTarget.id);
        },

        setHeight: function (height) {
            var self = this;
            this.$el.find('.select-project-type-view').height(height);
        },

		render: function () {
			var self = this;
            this.$el.html(SelectProjectTypeViewTpl({
                upForGrabsSelected: this.selectedType == this.typeMap['up-for-grabs'],
                onTheFenceSelected: this.selectedType == this.typeMap['on-the-fence'],
                launchedSelected: this.selectedType == this.typeMap['launched'],
            }));
		}
	});

	return SelectProjectTypeView;

});
