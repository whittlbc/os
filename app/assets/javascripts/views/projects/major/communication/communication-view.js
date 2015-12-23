define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/communication/communication-tabs-view',
    'views/projects/major/communication/communication-panels-view',
    'stache!views/projects/major/communication/communication-view',
    'velocity',
    'tabs'
    ], function ($,
     Backbone,
     _,
     CommunicationTabsView,
     CommunicationPanelsView,
     CommunicationViewTpl) {
	'use strict';

	var CommunicationView = Backbone.View.extend({

		initialize: function () {
        },

		events: {
        },

        handleTabSelected: function (index) {
            this.communicationPanelsView.render({
                activePanel: index
            });
        },

        showNewComment: function (data) {
          this.communicationPanelsView.showNewComment(data);
        },

        passComments: function (data) {
          this.communicationPanelsView.passComments(data);
        },

        render: function (options) {
			var self = this;

            this.$el.html(CommunicationViewTpl({
            }));

            this.communicationTabsView = new CommunicationTabsView({
                el: '#tabsView'
            });
            this.listenTo(this.communicationTabsView, 'tab:selected', this.handleTabSelected);
            this.communicationTabsView.render(options);

            this.communicationPanelsView = new CommunicationPanelsView({
                el: '#panelsView'
            });
            this.communicationPanelsView.render();
        }
	});

	return CommunicationView;

});
