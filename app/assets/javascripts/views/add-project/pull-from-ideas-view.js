define(['jquery',
	'backbone',
	'underscore',
    'models/project',
    'views/add-project/pull-from-ideas-search-result',
	'stache!views/add-project/pull-from-ideas-view'
    ], function ($,
     Backbone,
     _,
     Project,
     PullFromIdeasSearchResult,
     PullFromIdeasViewTpl) {
	'use strict';

	var PullFromIdeasView = Backbone.View.extend({

		initialize: function () {
		},

		events: {
            'keyup #searchUpForGrabsInput': 'getResults'
        },

        getResults: function (e) {
            var self = this;
            var query = $(e.currentTarget).val();
            if (query == "") {
                this.populateResults([], true);
            } else {
                var project = new Project();
                project.getUpForGrabs({query: query}, {
                    success: function (results) {
                        self.populateResults(results)
                    }
                });
            }
        },

        populateResults: function (results, hideNoResultsMessage) {
            var self = this;
            this.RESULTS = [];
            this.$resultList.empty();
            if (_.isEmpty(results)) {
                hideNoResultsMessage ? this.hideNoResults() : this.showNoResults();
            } else {
                this.hideNoResults();
                for (var i = 0; i < results.length; i++) {
                    this.addItem(results[i]);
                }
            }
        },

        addItem: function (data) {
            var pullFromIdeasSearchResult = new PullFromIdeasSearchResult({
                tagName: 'li'
            });
            pullFromIdeasSearchResult.render(data);
            this.addItemListeners(pullFromIdeasSearchResult);
            this.$el.find('#pullFromIdeasSearchResults').append(pullFromIdeasSearchResult.el);
            this.RESULTS.push(pullFromIdeasSearchResult);
        },

        addItemListeners: function (view) {
            var self = this;
            this.listenTo(view, 'project:selected', function (data) {
                self.trigger('project:selected', data);
            });
        },

        showNoResults: function () {
            this.$noResultsMessage.show();
        },

        hideNoResults: function () {
            this.$noResultsMessage.hide();
        },

		render: function () {
			var self = this;
            this.$el.html(PullFromIdeasViewTpl());
            this.$resultList = this.$el.find('#pullFromIdeasSearchResults');
            this.$noResultsMessage = this.$el.find('#noUpForGrabsMessage');
		}
	});

	return PullFromIdeasView;

});
