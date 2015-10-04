define(['jquery',
	'backbone',
	'underscore',
	'stache!views/widgets/request-to-join-popover'
    ], function ($,
     Backbone,
     _,
     RequestToJoinPopoverTpl) {
	'use strict';

	var RequestToJoinPopover = Backbone.View.extend({

		initialize: function () {
            this.statuses = [
                'Request to Join',
                'Request Sent'
            ];
		},

		events: {
            'click .rtj-popover-content': 'handleContentClick'
        },

        handleContentClick: function (e) {
            var self = this;
            e.stopPropagation();
            if (this.status === 0) {
                this.trigger('join');
                this.render({
                    status: 1
                });
            }
        },

		render: function (options) {
			var self = this;
            options = options || {};

            this.status = options.hasOwnProperty('status') ? options.status : 0;

            this.$el.html(RequestToJoinPopoverTpl({
                content: this.statuses[options.status],
                status0: options.status == 0,
                status1: options.status == 1
            }));
		}
	});

	return RequestToJoinPopover;

});
