define(['jquery',
	'backbone',
	'underscore',
    'stache!views/projects/major/communication/communication-tabs-view',
    'backbone-eventbroker'
    ], function ($,
     Backbone,
     _,
     CommunicationTabsViewTpl) {
	'use strict';

	var CommunicationTabsView = Backbone.View.extend({

		initialize: function () {
            this.activeTab = 0;
		},

		events: {
            'mousedown .communication-tab > a': 'handleTabClick'
        },

        handleTabClick: function (e) {
            var self = this;
            if (!$(e.currentTarget).hasClass('disabled')) {
                var selectedIndex = Number($(e.currentTarget).attr('index'));
                if (this.activeTab != selectedIndex) {
                    this.activeTab = selectedIndex;
                    this.trigger('tab:selected', this.activeTab);
                    Backbone.EventBroker.trigger('comments:fetch', this.activeTab);
                }
            }
        },

		render: function (options) {
			var self = this;
            options = options || {};

            this.$el.html(CommunicationTabsViewTpl({
                onTeam: options.project ? options.project.is_contributor : false,
                showAdmin: options.project ? options.project.is_admin : false,
                //onTeam: false,
                //showAdmin: false,
                generalActive: this.activeTab == 0,
                suggestionsActive: this.activeTab == 1,
                teamActive: this.activeTab == 2,
                adminActive: this.activeTab == 3
            }));

            this.$el.find('ul.tabs').tabs();
        }
	});

	return CommunicationTabsView;

});
