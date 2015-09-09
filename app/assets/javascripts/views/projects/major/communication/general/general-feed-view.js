define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/communication/communication-feed-view',
    'views/projects/major/communication/general/general-feed-item-view',
	'stache!views/projects/major/communication/general/general-feed-view'
    ], function ($,
     Backbone,
     _,
     CommunicationFeedView,
     GeneralFeedItemView,
     GeneralFeedViewTpl) {
	'use strict';

	var GeneralFeedView = CommunicationFeedView.extend({

		initialize: function () {
		},

		events: {},

        populateComments: function () {
            var self = this;
            this.COMMENTS = [];
            this.$el.find('#generalFeedListView').empty();
            for (var i = 0; i < 10; i++) {
                this.prePopulateComment();
            }
        },

        prePopulateComment: function(data) {
            var generalFeedItemView = new GeneralFeedItemView({
                tagName: 'li'
            });
            generalFeedItemView.setData(data);
            generalFeedItemView.render();
            this.$el.find('#generalFeedListView').append(generalFeedItemView.el);
            this.COMMENTS.push(generalFeedItemView);
        },


        render: function () {
			var self = this;
            this.$el.html(GeneralFeedViewTpl({
                showNoComments: false
            }));
            this.populateComments();
        }
	});

	return GeneralFeedView;

});
