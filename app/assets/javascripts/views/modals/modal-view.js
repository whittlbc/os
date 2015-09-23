define(['jquery',
	'backbone',
	'underscore'
    ], function ($,
     Backbone,
     _) {
	'use strict';

	var ModalView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

        showModal: function () {
            this.$modal.modal('show');
            console.log(this.$modal);
        },

        hideModal: function () {
            this.$modal.modal('hide');
        }

	});

	return ModalView;

});
