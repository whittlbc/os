define(['jquery',
	'backbone',
	'underscore',
    'views/modals/modal-view',
	'stache!views/modals/basic-question-modal'
    ], function ($,
     Backbone,
     _,
     ModalView,
     BasicQuestionModalTpl) {
	'use strict';

	var BasicQuestionModal = ModalView.extend({

		initialize: function (options) {
            options = options || {};
            this.showConfirm = options.showConfirm ? options.showConfirm : true;
            this.showCancel = options.showCancel ? options.showCancel : true;
            this.message = options.message ? options.message : '';
            this.currentTopPos = 200;
            this.modalHeight = 250;
        },

		events: {
            'click .confirm': 'handleConfirm',
            'click .cancel': 'handleCancel'
        },

        handleConfirm: function () {
            this.trigger('confirm');
        },

        handleCancel: function () {
            this.trigger('cancel');
        },

        sizeModal: function () {
            var self = this;
            var modalMarginTop = ((window.innerHeight - this.modalHeight - this.currentTopPos) / 2);
            this.$modal.css('margin-top', modalMarginTop + 'px');
            this.$el.find('#basicQuestionModalContentContainer').width(500);
            //this.$el.find('#contributorsModalContentContainer').css('left', '-50px');
        },

        render: function () {
			var self = this;
            this.$el.html(BasicQuestionModalTpl({
                showConfirm: this.showConfirm,
                showCancel: this.showConfirm,
                message: this.message
            }));
            this.$modal = this.$el.find('#basicQuestionModalView');
            this.sizeModal();
        }
	});

	return BasicQuestionModal;

});
