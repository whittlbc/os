define(['jquery',
	'backbone',
	'underscore',
    'views/widgets/spinner-chasing-dots',
    'stache!views/add-project/creating-project-view'
    ], function ($,
     Backbone,
     _,
     Spinner,
     CreatingProjectViewTpl) {
	'use strict';

	var CreatingProjectView = Backbone.View.extend({

        initialize: function () {
        },

        events: {},

        setMessage: function (message) {
            this.message = message;
        },

        render: function () {
            var self = this;
            this.$el.html(CreatingProjectViewTpl({
                message: this.message
            }));

            this.spinner = new Spinner({
                el: '#creatingProjectSpinner',
                width: '95px',
                height: '95px'
            });

            this.spinner.render();
        }
	});

	return CreatingProjectView;

});
