define(['jquery',
	'backbone',
	'underscore',
    'views/projects/minor/evolution/evolution-feed-item-view',
	'stache!views/projects/minor/evolution/evolution-feed-view'
    ], function ($,
     Backbone,
     _,
     EvolutionFeedItemView,
     EvolutionFeedViewTpl) {
	'use strict';

	var EvolutionFeedView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

        populate: function (data) {
            var self = this;
            this.$el.find('#evolutionFeedListView').empty();
            for (var i = 0; i < data.length; i++) {
                this.addItem(data[i]);
            }
        },

        addItem: function (data) {
            var self = this;
            var evolutionFeedItemView = new EvolutionFeedItemView({
                tagName: 'li'
            });
            evolutionFeedItemView.setData(data);
            evolutionFeedItemView.render();
            this.$el.find('#evolutionFeedListView').append(evolutionFeedItemView.el);
        },

		render: function () {
			var self = this;
            this.$el.html(EvolutionFeedViewTpl());
		}
	});

	return EvolutionFeedView;

});
