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

		render: function (data) {
			var self = this;
            this.data = data;
            this.$el.html(PullFromIdeasSearchResultTpl({
                title: data.title
            }));

            this.$el.click(function () {
                self.trigger('project:selected', data);
            });

		}
	});

	return PullFromIdeasSearchResult;

});
