define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
	'stache!views/starred/starred-item-view'
    ], function ($,
     Backbone,
     _,
     OSUtil,
     StarredItemViewTpl) {
	'use strict';

	var StarredItemView = Backbone.View.extend({

		initialize: function (options) {
		    options = options || {};
            this.data = options.data;
        },

		events: {
            'click .owner > a': 'preventPropagation'
        },

        preventPropagation: function (e) {
            e.preventPropagation();
        },

		render: function () {
			var self = this;
            var notYours = this.data && this.data.owner_gh_username;

            this.$el.html(StarredItemViewTpl({
                title: this.data ? this.data.title : '',
                subtitle: this.data ? this.data.subtitle : '',
                notYours: notYours,
                owner: notYours ? this.data.owner_gh_username : '',
                type: this.data && this.data.hasOwnProperty('status') ? OSUtil.GRAMMATICAL_PROJECT_TYPES[this.data.status] : ''
            }));
		}
	});

	return StarredItemView;

});