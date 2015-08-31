define(['jquery',
	'backbone',
	'underscore',
    'stache!views/projects/minor/minor-info/contributors-item-view'
    ], function ($,
     Backbone,
     _,
     ContributorsItemViewTpl) {
	'use strict';

	var ContributorsItemView = Backbone.View.extend({

		initialize: function (options) {
            if (options) {
                this.setPropsFromOptions(options);
            }
		},

        setPropsFromOptions: function (options) {
            this.name = options.name;
            this.admin = options.admin;
            this.pic = options.pic;
        },

		events: {},

		render: function () {
			var self = this;
            this.$el.html(ContributorsItemViewTpl({
                name: this.name,
                admin: this.admin,
                pic: this.pic
            }));
		}
	});

	return ContributorsItemView;

});
