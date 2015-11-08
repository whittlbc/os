define(['jquery',
	'backbone',
	'underscore',
    'views/filters/license-filters-view',
    'views/filters/chat-filters-view',
    'views/widgets/vertical-toggle',
    'stache!views/filters/minor-filters-view'
    ], function ($,
     Backbone,
     _,
     LicenseFiltersView,
     ChatFiltersView,
     VerticalToggle,
     MinorFiltersViewTpl) {
	'use strict';

	var MinorFiltersView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

        addLicenseFilters: function () {
            var self = this;
            // create a div on the fly and append it as the last child of #minorFiltersView -- this will be your anchor for your filter view
            var $div = $('<div>', { id: 'licenseFiltersView' });
            this.$el.append($div);

            this.licenseFiltersView = new LicenseFiltersView({
                el: '#licenseFiltersView'
            });

            this.licenseFiltersView.render();
        },

        removeLicenseFilters: function () {
            var self = this;
            this.licenseFiltersView.remove();
            this.licenseFiltersView.unbind();
        },

        addChatFilters: function () {
            var self = this;
            // create a div on the fly and append it as the last child of #minorFiltersView -- this will be your anchor for your filter view
            var $div = $('<div>', { id: 'chatFiltersView' });
            this.$el.append($div);

            this.chatFiltersView = new ChatFiltersView({
                el: '#chatFiltersView'
            });

            this.chatFiltersView.render();
        },

        removeChatFilters: function () {
            var self = this;
            var $chatFilters = this.$el.find('#chatFiltersView');
            $chatFilters.remove();
            $chatFilters.unbind();
        },

        togglePrivacyFilters: function () {
            var self = this;
            if (this.filterTypeDoesntExist('#privacyFiltersView')) {
                // create a div on the fly and append it to #minorFiltersView -- this will be your anchor for your filter view
                var $div = $('<div>', {id: 'privacyFiltersView'});
                this.$el.append($div);

                this.privacyFiltersView = new VerticalToggle({
                    el: '#privacyFiltersView',
                    topName: 'Open',
                    topIcon: 'fa-users',
                    bottomName: 'Request',
                    bottomIcon: 'fa-lock'
                });

                this.privacyFiltersView.render();

            } else {
                var $privacyFilters = this.$el.find('#privacyFiltersView');
                $privacyFilters.remove();
                $privacyFilters.unbind();
            }
        },

        filterTypeDoesntExist: function (id) {
            return this.$el.find(id).length === 0;
        },

        addLicenseItem: function (data) {
            var self = this;
            if (this.filterTypeDoesntExist('#licenseFiltersView')){
                this.addLicenseFilters();
            }

            this.licenseFiltersView.addItem({
                value: data.value,
                animate: data.animate
            });
        },

        addChatItem: function (data) {
            if (this.filterTypeDoesntExist('#chatFiltersView')){
                this.addChatFilters();
            }

            this.chatFiltersView.addItem({
                value: data.value,
                animate: data.animate
            });
        },

        removeLicenseItem: function () {
            var self = this;
            if (this.licenseFiltersView.isEmpty()) {
                this.removeLicenseFilters();
            }
        },

        removeChatItem: function () {
            var self = this;
            if (this.chatFiltersView.isEmpty()) {
                this.removeChatFilters();
            }
        },

		render: function () {
			var self = this;
            this.$el.html(MinorFiltersViewTpl());
		}
	});

	return MinorFiltersView;

});
