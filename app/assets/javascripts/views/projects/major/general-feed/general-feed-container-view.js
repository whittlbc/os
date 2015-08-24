define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/general-feed/general-feed-view',
	'stache!views/projects/major/general-feed/general-feed-container-view'
    ], function ($,
     Backbone,
     _,
     GeneralFeedView,
     GeneralFeedContainerViewTpl) {
	'use strict';

	var GeneralFeedContainerView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

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
