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
            var self = this;
            this.createLoginPopupView();
            this.loginPopupShown = false;
            this.loginPopup = $('.myPopup');
            this.backdrop = $('.popup-backdrop');
            this.backdrop.click(function(){
                self.hideLoginPopup();
            });
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

                this.backdrop.removeClass('hidden-popup').addClass('animated fadeIn');
                this.loginPopup.removeClass('hidden-popup').addClass('animated fadeInDown');
                this.loginPopupShown = true;
            }
        },

        hideLoginPopup: function () {
            var self = this;
            if (this.loginPopupShown) {
                this.loginPopup.removeClass('fadeInDown').addClass('fadeOut');
                this.backdrop.removeClass('fadeIn').addClass('fadeOut');
                setTimeout(function () {
                    self.loginPopup.addClass('hidden-popup').removeClass('fadeOut');
                    self.backdrop.addClass('hidden-popup').removeClass('fadeOut');
                }, OSUtil.hidePopupTimeout);

                this.loginPopupShown = false;
            }
        }


	});

	return OSView;

});
