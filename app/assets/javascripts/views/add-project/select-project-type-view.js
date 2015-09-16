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

		render: function () {
			var self = this;
            this.$el.html(SelectProjectTypeViewTpl({
                upForGrabsSelected: this.selectedType == OSUtil.TYPE_MAP['up-for-grabs'],
                onTheFenceSelected: this.selectedType == OSUtil.TYPE_MAP['on-the-fence'],
                launchedSelected: this.selectedType == OSUtil.TYPE_MAP['launched'],
                hideUpForGrabs: this.hideUpForGrabs,
                onlyOnTheFence: this.onlyOnTheFence
            }));
		}
	});

	return SelectProjectTypeView;

});
