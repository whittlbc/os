define(['jquery',
	'backbone',
	'underscore',
	'stache!views/home/index-view'
    ], function ($,
     Backbone,
     _,
     ReposLoadingViewTpl) {
	'use strict';

	var ReposLoadingView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

        setMessage: function (message) {
            this.message = message;
        },

        startSpinner: function () {
            var self = this;

        },

        stopSpinner: function () {
            var self = this;

        },

        show: function () {
            this.startSpinner();
            this.$el.show();
        },

        hide: function () {
            this.$el.hide();
            this.stopSpinner();
        },

		render: function () {
			var self = this;
            this.$el.html(ReposLoadingViewTpl({
                message: this.message
            }));

            this.$spinner = this.$el.find('.repos-loading-spinner');
		}
	});

	return ReposLoadingView;

});
