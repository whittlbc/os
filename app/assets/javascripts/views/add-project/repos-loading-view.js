define(['jquery',
	'backbone',
	'underscore',
    'views/widgets/spinner-chasing-dots',
	'stache!views/add-project/repos-loading-view'
    ], function ($,
     Backbone,
     _,
     Spinner,
     ReposLoadingViewTpl) {
	'use strict';

	var ReposLoadingView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

        setMessage: function (message) {
            this.message = message;
        },

        show: function () {
            this.$el.show();
        },

        hide: function () {
            this.$el.hide();
        },

		render: function () {
			var self = this;
            this.$el.html(ReposLoadingViewTpl({
                message: this.message
            }));

            this.spinner = new Spinner({
                el: '#reposLoadingSpinner',
                width: '95px',
                height: '95px'
            });

            this.spinner.render();
		}
	});

	return ReposLoadingView;

});
