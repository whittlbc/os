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

		initialize: function () {
		},

		events: {},

        setData: function (data) {
            var self = this;
            this.data = data;
            var date = new Date(this.data.created_at);
            var utcDate = OSUtil.dateToUTC(date);
            this.data.date = OSUtil.getTimeDiff(utcDate);
            if (this.data.property === 'Creation') {
                this.data.new_value = 'Project was created.'
            }
        },

		render: function () {
			var self = this;
            this.$el.html(EvolutionFeedItemViewTpl({
                date: this.data.date,
                property: this.data.property,
                newValue: this.data.new_value
            }));
		}
	});

	return EvolutionFeedItemView;

});
