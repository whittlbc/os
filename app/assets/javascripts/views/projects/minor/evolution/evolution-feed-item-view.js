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

        capitalize: function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },

        setData: function (data) {
            var self = this;
            this.data = data;
            var date = new Date(this.data.created_at);
            var utcDate = OSUtil.dateToUTC(date);
            this.data.date = OSUtil.getTimeDiff(utcDate);
            if (this.data.property === 'Creation') {
                this.data.new_value = 'Project was created.'
            } else if (this.data.property === 'langs_and_frames') {
                this.data.property = 'Languages and Frameworks'
            } else {
                this.data.property = this.capitalize(this.data.property);
            }

            if (Array.isArray(this.data.new_value)) {
                this.data.new_value = this.data.new_value.join(', ');
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
