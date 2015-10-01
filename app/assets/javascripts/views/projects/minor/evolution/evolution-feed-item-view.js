define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
	'stache!views/projects/minor/evolution/evolution-feed-item-view'
    ], function ($,
     Backbone,
     _,
     OSUtil,
     EvolutionFeedItemViewTpl) {
	'use strict';

	var EvolutionFeedItemView = Backbone.View.extend({

		initialize: function (options) {
            options = options || {};
            this.data = options.data;
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(EvolutionFeedItemViewTpl({
                date: OSUtil.getTimeAgo(this.data.created_at),
                text: this.data.text
            }));
		}
	});

	return EvolutionFeedItemView;

});
