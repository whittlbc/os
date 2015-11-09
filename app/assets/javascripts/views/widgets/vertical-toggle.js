define(['jquery',
	'backbone',
	'underscore',
	'stache!views/widgets/vertical-toggle',
    'velocity',
    'backbone-eventbroker'
], function ($,
     Backbone,
     _,
     VerticalToggleTpl) {
	'use strict';

	var VerticalToggle = Backbone.View.extend({

		initialize: function (options) {
            options = options || {};
            this.options = options;
            this.animateDuration = 210;
		},

		events: {},

        addClickListeners: function () {
            var self = this;
            this.$el.find('.selection').click(function () {
                if (!$(this).hasClass('.selected')) {
                    self.select($(this));
                    Backbone.EventBroker.trigger('addPrivacyFilter', this.id);
                }
            });
        },

        select: function ($option) {
            var self = this;
            $option.find('.anchor').velocity({width: 25, height: 25, top: 0, right: 0, backgroundColor: '#00A6C9'}, {duration: self.animateDuration, queue: false}, 'easeInSine');
            $option.find('.anchor > i').animate({opacity: 1}, {duration: self.animateDuration, queue: false});
            $option.addClass('selected');
            var $siblings = $option.siblings();
            $siblings.find('.anchor').velocity({width: 10, height: 10, top: 7.5, right: 7.5, backgroundColor: '#C4C5CA'}, {duration: self.animateDuration, queue: false}, 'easeInSine');
            $siblings.find('.anchor > i').animate({opacity: 0}, {duration: self.animateDuration, queue: false});
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

            // go ahead and preselect the OPEN filter
            this.select(this.$el.find('.selected'));
            Backbone.EventBroker.trigger('addPrivacyFilter', 'open');
		}
	});

	return VerticalToggle;

});
