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

        populateComments: function (comments) {
            var self = this;
            this.COMMENTS = [];
            this.$el.find('#generalFeedListView').empty();
            for (var i = 0; i < comments.length; i++) {
                this.prePopulateComment(comments[i].comment);
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

        passComments: function (comments) {
            comments.length > 0 ? this.populateComments(comments) : this.render({showNoComments: true});
        },

        render: function (options) {
			var self = this;
            this.$el.html(GeneralFeedViewTpl({
                showNoComments: options && options.showNoComments
            }));
        }
	});

	return GeneralFeedView;

});
