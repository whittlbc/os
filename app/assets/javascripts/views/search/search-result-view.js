define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
	'stache!views/search/search-result-view'
    ], function ($,
     Backbone,
     _,
     OSUtil,
     SearchResultViewTpl) {
	'use strict';

	var SearchResultView = Backbone.View.extend({

		initialize: function (options) {
            this.options = options.data || {};
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(SearchResultViewTpl({
                title: this.options.title,
                subtitle: this.options.subtitle,
                type: OSUtil.GRAMMATICAL_PROJECT_TYPES[this.options.status],
                voteCount: this.options.voteCount
            }));
		}
	});

	return SearchResultView;

});
