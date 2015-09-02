define(['jquery',
	'backbone',
	'underscore',
    'stache!views/projects/major/communication/communication-tabs-view',
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
            var selectedIndex = Number($(e.currentTarget).attr('index'));
            if (this.activeTab != selectedIndex) {
                this.activeTab = selectedIndex;
                this.trigger('tab:selected', this.activeTab);
            }
        },

		render: function () {
			var self = this;
            this.$el.html(CommunicationTabsViewTpl({
                showTeam: true,
                showAdmin: true,
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
