define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/communication/communication-feed-container-view',
    'views/projects/major/communication/general/general-feed-view',
	'stache!views/projects/major/communication/general/general-feed-container-view'
    ], function ($,
     Backbone,
     _,
     CommunicationFeedContainerView,
     GeneralFeedView,
     GeneralFeedContainerViewTpl) {
	'use strict';

	var GeneralFeedContainerView = CommunicationFeedContainerView.extend({

		initialize: function () {
		},

		events: {},

        passComments: function (comments) {
            var self = this;
            this.generalFeedView.passComments(comments);
        },

        render: function () {
			var self = this;
            this.$el.html(GeneralFeedContainerViewTpl());

            this.generalFeedView = new GeneralFeedView({
                el: '#generalFeedView'
            });
            this.generalFeedView.render();
		}
	});

	return GeneralFeedContainerView;

});
