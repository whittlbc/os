define(['jquery',
	'backbone',
	'underscore',
	'stache!views/widgets/vertical-toggle',
    'velocity'
], function ($,
     Backbone,
     _,
     VerticalToggleTpl) {
	'use strict';

	var VerticalToggle = Backbone.View.extend({

		initialize: function (options) {
            options = options || {};
            this.options = options;
		},

		events: {},

        addClickListeners: function () {
            var self = this;
            this.$el.find('.selection').click(function () {
                if (!$(this).hasClass('.selected')) {
                    self.select($(this));
                }
            });
        },

        select: function ($option) {
            var self = this;
            $option.find('.anchor').velocity({width: 25, height: 25, top: 0, right: 0, backgroundColor: '#00A6C9'}, 650, [100, 18]);
            $option.find('.anchor > i').animate({opacity: 1}, {duration: 250, queue: false});
            $option.addClass('selected');
            var $siblings = $option.siblings();
            $siblings.find('.anchor').velocity({width: 10, height: 10, top: 7.5, right: 7.5, backgroundColor: '#C4C5CA'}, 650, [100, 18]);
            $siblings.find('.anchor > i').animate({opacity: 0}, {duration: 250, queue: false});
        },

		render: function () {
			var self = this;
            this.$el.html(VerticalToggleTpl({
                topName: this.options.topName,
                topIcon: this.options.topIcon,
                bottomName: this.options.bottomName,
                bottomIcon: this.options.bottomIcon
            }));
            this.addClickListeners();
            this.select(this.$el.find('.selected'));
		}
	});

	return VerticalToggle;

});
