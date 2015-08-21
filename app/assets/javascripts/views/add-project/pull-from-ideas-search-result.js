define(['jquery',
	'backbone',
	'underscore',
	'stache!views/add-project/pull-from-ideas-search-result'
    ], function ($,
     Backbone,
     _,
     PullFromIdeasSearchResultTpl) {
	'use strict';

	var PullFromIdeasSearchResult = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

        setData: function (data) {
            this.title = data.title;
        },

		render: function () {
			var self = this;
            this.$el.html(PullFromIdeasSearchResultTpl({
                title: this.title
            }));
		}
	});

	return PullFromIdeasSearchResult;

});
