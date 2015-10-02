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

		events: {
            'click .fa-trash': 'handleDeleteEvolutionItem'
        },

        handleDeleteEvolutionItem: function () {
            var self = this;
            this.trigger('evolution-item:delete', this.data.uuid);
        },

		render: function () {
			var self = this;
            this.$el.html(EvolutionFeedItemViewTpl({
                date: OSUtil.getTimeAgo(this.data.created_at),
                text: this.data.text,
                isAdmin: this.data.is_admin
            }));

            if (this.data.is_admin) {
                this.$el.hover(function () {self.$el.find('.fa-trash').show();}, function () {self.$el.find('.fa-trash').hide();});
            }

		}
	});

	return EvolutionFeedItemView;

});
