define(['jquery',
	'backbone',
	'underscore',
    'models/project',
    'views/search/search-result-view',
    'views/widgets/spinner-chasing-dots',
    'stache!views/search/search-container-view'
    ], function ($,
     Backbone,
     _,
     Project,
     SearchResultView,
     Spinner,
     SearchContainerViewTpl) {
	'use strict';

    var master;

	var SearchContainerView = Backbone.View.extend({

		initialize: function () {
            master = this;
            this.isOpen = false;
            this.searchTimeout = null;
            this.dropdownShown = false;
            this.gettingMoreData = false;
            this.spinnerTimeout = null;
        },

		events: {},

        populate: function (projects) {
            var self = this;
            this.RESULTS = [];
            this.spinner.$el.hide();
            this.$dropdown.empty();
            if (projects.length > 0) {
                for (var i = 0; i < projects.length; i++) {
                    this.addResult(projects[i]);
                }
            } else {
                this.$noResults.show();
            }
        },

        addResult: function(data) {
            var self = this;
            var searchResultView = new SearchResultView({
                tagName: 'li',
                data: data
            });
            searchResultView.$el.click(function (e) {
                e.stopPropagation();
                if (window.location.hash == ('#projects/' + data.id)) {
                    window.location.reload();
                } else {
                    window.location.hash = '#projects/' + data.id;
                }
            });
            searchResultView.render();
            this.$dropdown.append(searchResultView.el);
            this.RESULTS.push(searchResultView);
        },

        renderSearchBar: function () {
            var self = this;
            var project = new Project();

            this.$input.click(function (e) {
                e.stopPropagation();
            });

            this.$input.focus(function(){
                if(!self.isOpen) {
                    self.$searchBox.addClass('searchbox-open');
                    self.isOpen = true;
                }
            });

            $(document).click(function(){
                if(self.isOpen) {
                    self.$searchBox.removeClass('searchbox-open');
                    self.isOpen = false;
                }
                self.$dropdown.hide();
                self.$noResults.hide();
                self.dropdownShown = false;
            });

            this.$input.keydown(function () {
                self.limit = 10;
                self.gettingMoreData = true;
                if (!self.dropdownShown) {
                    self.dropdownShown = true;
                    self.$dropdown.show();
                }
                if (self.searchTimeout != null) {
                    clearTimeout(self.searchTimeout);
                }
                self.searchTimeout = setTimeout(function () {
                    var query = self.$input.val();
                    self.query = query;
                    if (_.isEmpty(query)) {
                        self.$dropdown.empty();
                        self.RESULTS = [];
                        self.$noResults.show();
                    } else {
                        self.$noResults.hide();
                        self.showSpinner();
                        project.search({query: query, limit: self.limit}, {success: function (data) {
                            self.handleProjectsFetched(data);
                        }});
                    }
                }, 175);
            });

            this.$input.keyup(function () {
                if (_.isEmpty(self.$input.val())) {
                    self.$noResults.show();
                }
            });
        },

        showSpinner: function () {
            var self = this;
            this.spinnerTimeout = setTimeout(function () {
                self.spinnerTimeout = null;
                self.$dropdown.empty();
            }, 200);
        },

        handleProjectsFetched: function (data) {
            var self = this;
            if (this.spinnerTimeout != null) {
                clearTimeout(this.spinnerTimeout);
            }
            this.limit += 10;
            if (!data.gotAll) {
                this.gettingMoreData = false;
            }
            this.populate(data.projects);
        },

        getMoreResults: function () {
            var self = this;
            var project = new Project();
            project.search({query: self.query, limit: self.limit}, {success: function (data) {
                self.handleProjectsFetched(data);
            }})
        },

        addScrollLoadListener: function () {
            this.$el.find('.search-results-list').bind('scroll', master.searchResultsScrollListener);
        },

        searchResultsScrollListener: function () {
            if (!master.gettingMoreData) {
                var pos = master.$el.find('.search-results-list').scrollTop();
                var numItems = master.$el.find('.search-results-list > li').length;
                var itemHeight = master.$el.find('.search-results-list > li').height();
                if (pos > (0.75 * numItems * itemHeight)) {
                    master.gettingMoreData = true;
                    master.getMoreResults();
                }
            }
        },

        removeScrollListener: function () {
            this.$el.find('.search-results-list').unbind('scroll', master.searchResultsScrollListener);
        },

		render: function () {
			var self = this;
            this.$el.html(SearchContainerViewTpl());
            this.$searchBox = this.$el.find('.searchbox');
            this.$input = this.$el.find('.searchbox > input');
            this.$dropdown = this.$el.find('.search-results-list');
            this.$noResults = this.$el.find('.no-search-results');

            this.spinner = new Spinner({
                el: '#searchSpinner',
                width: '60px',
                height: '60px'
            });

            this.spinner.render();

            this.renderSearchBar();
            this.addScrollLoadListener();
		}
	});

	return SearchContainerView;

});
