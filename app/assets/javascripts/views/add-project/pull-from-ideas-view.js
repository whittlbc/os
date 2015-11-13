define(['jquery',
	'backbone',
	'underscore',
    'models/project',
    'views/widgets/spinner-chasing-dots',
    'views/add-project/pull-from-ideas-search-result',
	'stache!views/add-project/pull-from-ideas-view'
    ], function ($,
     Backbone,
     _,
     Project,
     Spinner,
     PullFromIdeasSearchResult,
     PullFromIdeasViewTpl) {
	'use strict';

	var PullFromIdeasView = Backbone.View.extend({

		initialize: function () {
            this.limit = 5;
            this.searchTimeout = null;
            this.spinnerTimeout = null;
            this.project = new Project();
        },

		events: {
        },

        addSearchListener: function () {
            var self = this;
            this.$input.keydown(function (e) {
                if (e.keyCode != 13 && e.keyCode != 9) {    // need to add more keys than this...hack as fuck
                    if (self.searchTimeout != null) {
                        clearTimeout(self.searchTimeout);
                    }
                    self.searchTimeout = setTimeout(function () {
                        var query = self.$input.val();
                        self.query = query;
                        if (_.isEmpty(query)) {
                            self.$resultList.empty();
                            self.RESULTS = [];
                            self.showNoResults();
                        } else {
                            self.hideNoResults();
                            self.showSpinner();
                            self.project.search({query: query, limit: self.limit, upForGrabs: true}, {
                                success: function (data) {
                                    self.handleProjectsFetched(data);
                                }
                            });
                        }
                    }, 175);
                }
            });

            this.$input.keyup(function (e) {
                if (e.keyCode != 13 && e.keyCode != 9) {
                    if (_.isEmpty(self.$input.val())) {
                        self.showNoResults();
                    }
                }
            });
        },

        showSpinner: function () {
            var self = this;
            this.spinnerTimeout = setTimeout(function () {
                self.spinnerTimeout = null;
                self.$resultList.empty();
                self.spinner.$el.show();
            }, 200);
        },

        handleProjectsFetched: function (data) {
            var self = this;
            if (this.spinnerTimeout != null) {
                clearTimeout(this.spinnerTimeout);
            }
            this.populateResults(data.projects);
        },

        populateResults: function (projects) {
            var self = this;
            this.RESULTS = [];
            this.spinner.$el.hide();
            this.$resultList.empty();
            if (projects.length > 0) {
                for (var i = 0; i < projects.length; i++) {
                    this.addResult(projects[i]);
                }
            } else {
                this.hideNoResults();
            }
        },

        addResult: function (data) {
            var pullFromIdeasSearchResult = new PullFromIdeasSearchResult({
                tagName: 'li'
            });
            pullFromIdeasSearchResult.render(data);
            this.addItemListeners(pullFromIdeasSearchResult);
            this.$resultList.append(pullFromIdeasSearchResult.el);
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
            this.$input = this.$el.find('#searchUpForGrabsInput');
            this.addSearchListener();

            this.spinner = new Spinner({
                el: '#pullFromIdeasSpinner',
                width: '60px',
                height: '60px'
            });

            this.spinner.render();
		}
	});

	return PullFromIdeasView;

});
