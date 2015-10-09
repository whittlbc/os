define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
	'stache!views/my-projects/my-projects-item-view'
    ], function ($,
     Backbone,
     _,
     OSUtil,
     MyProjectsItemViewTpl) {
	'use strict';

	var MyProjectsItemView = Backbone.View.extend({

		initialize: function (options) {
		    options = options || {};
            this.data = options.data;
        },

		events: {},

		render: function () {
			var self = this;
            this.$el.html(MyProjectsItemViewTpl({
                title: this.data ? this.data.title : '',
                subtitle: this.data ? this.data.subtitle : '',
                owner: (this.data && this.data.owner_gh_username) ? this.data.owner_gh_username : '',
                projectType: this.data && this.data.hasOwnProperty('status') ? OSUtil.GRAMMATICAL_PROJECT_TYPES[this.data.status] : ''
            }));
		}
	});

	return MyProjectsItemView;

});