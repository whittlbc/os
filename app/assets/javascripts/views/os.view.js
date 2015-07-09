define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
    'views/login/login-view'
], function ($,
     Backbone,
     _,
     OSUtil,
     LoginView) {
	'use strict';

	var OSView = Backbone.View.extend({

		osInitialize: function () {
            this.createLoginPopupView();
            this.loginPopupShown = false;
		},

        events: {
        },

        createLoginPopupView: function () {
            var self = this;

            if (!this.loginView) {
                this.loginView = new LoginView({
                    el: '#myPopup'
                });

                this.loginView.render();

                this.listenTo(this.loginView, 'hidePopup', self.hideLoginPopup);
            }
        },

        showLoginPopup: function () {
            var self = this;
            if (!this.loginPopupShown) {
                $('.popup-backdrop').show();
                $('.popup-backdrop').click(function(){
                    self.hideLoginPopup();
                });
                $('.myPopup').removeClass('hidden-popup');
                $('.myPopup').removeClass('fadeOutUp');
                $('.myPopup').addClass('animated fadeInDown');
                this.loginPopupShown = true;
            }
        },

        hideLoginPopup: function () {
            if (this.loginPopupShown) {
                $('.myPopup').removeClass('fadeInDown');
                $('.myPopup').addClass('fadeOutUp');
                $('.popup-backdrop').hide();
                setTimeout(function () {
                    $('.myPopup').addClass('hidden-popup');
                }, OSUtil.hidePopupTimeout);
                this.loginPopupShown = false;
            }
        }
	});

	return OSView;

});
