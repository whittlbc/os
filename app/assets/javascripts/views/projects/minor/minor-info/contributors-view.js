define(['jquery',
	'backbone',
	'underscore',
    'views/projects/minor/minor-info/contributors-item-view',
    'stache!views/projects/minor/minor-info/contributors-view'
    ], function ($,
     Backbone,
     _,
     ContributorsItemView,
     ContributorsViewTpl) {
	'use strict';

	var ContributorsView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

        populate: function (data) {
            var self = this;
            this.CONTRIBUTORS = [];
            this.$el.find('#contributorsListView').empty();
            for (var i = 0; i < data.length; i++) {
                this.addContrib(data[i]);
            }
        },

        addContrib: function(data) {
            var contribItemView = new ContributorsItemView({
                tagName: 'li',
                name: data.name,
                admin: data.admin,
                pic: data.pic
            });
            contribItemView.render();
            this.$el.find('#contributorsListView').append(contribItemView.el);
            this.CONTRIBUTORS.push(contribItemView);
        },

		render: function (options) {
			var self = this;
            this.$el.html(ContributorsViewTpl());
            this.populate(options);
		}
	});

	return ContributorsView;

});
