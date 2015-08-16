define(['jquery',
	'backbone',
	'underscore',
	'stache!views/add-project/repo-list-item'
    ], function ($,
     Backbone,
     _,
     RepoListItemTpl) {
	'use strict';

	var RepoListItem = Backbone.View.extend({

		initialize: function () {
		},

		events: {
            'click .repo-list-item': 'handleClick'
        },

        handleClick: function () {
            var self = this;
            this.trigger('repo:selected', this.name);
        },

        setData: function (data) {
            this.name = data.name;
        },

		render: function () {
			var self = this;
            this.$el.html(RepoListItemTpl({
                name: this.name
            }));
		}
	});

	return RepoListItem;

});
