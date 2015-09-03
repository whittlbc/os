define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
	'stache!views/add-project/select-project-type-view'
    ], function ($,
     Backbone,
     _,
     OSUtil,
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

        setHeight: function (height) {
            var self = this;
            this.$el.find('.select-project-type-view').height(height);
        },

		render: function () {
			var self = this;
            this.$el.html(SelectProjectTypeViewTpl({
                upForGrabsSelected: this.selectedType == OSUtil.TYPE_MAP['up-for-grabs'],
                onTheFenceSelected: this.selectedType == OSUtil.TYPE_MAP['on-the-fence'],
                launchedSelected: this.selectedType == OSUtil.TYPE_MAP['launched'],
            }));
		}
	});

	return SelectProjectTypeView;

});
