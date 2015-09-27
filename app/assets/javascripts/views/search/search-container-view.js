define(['jquery',
	'backbone',
	'underscore',
    'models/project',
    'views/search/search-result-view',
	'stache!views/search/search-container-view'
    ], function ($,
     Backbone,
     _,
     Project,
     SearchResultView,
     SearchContainerViewTpl) {
	'use strict';

	var SearchContainerView = Backbone.View.extend({

		initialize: function () {
            this.isOpen = false;
            this.searchTimeout = null;
            this.dropdownShown = false;
        },

		events: {},

        populate: function (projects) {
            var self = this;
            this.RESULTS = [];
            this.$dropdown.empty();
            for (var i = 0; i < projects.length; i++) {
                this.addResult(projects[i]);
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
                self.dropdownShown = false;
            });

            this.$input.keydown(function () {
                if (!self.dropdownShown) {
                    self.dropdownShown = true;
                    self.$dropdown.show();
                }
                if (self.searchTimeout != null) {
                    clearTimeout(self.searchTimeout);
                }
                self.searchTimeout = setTimeout(function () {
                    var query = self.$input.val();
                    if (_.isEmpty(query)) {
                        self.$dropdown.empty();
                        self.RESULTS = [];
                    } else {
                        project.search({query: query}, {success: function (projectResults) {
                            self.populate(projectResults);
                        }});
                    }
                }, 175);
            });
        },

		render: function () {
			var self = this;
            this.$el.html(SearchContainerViewTpl());
            this.$searchBox = this.$el.find('.searchbox');
            this.$input = this.$el.find('.searchbox > input');
            this.$dropdown = this.$el.find('.search-results-list');
            this.renderSearchBar();
            //
            //this.$dropdown.bind('mousewheel DOMMouseScroll', function (e) {
            //    var e0 = e.originalEvent;
            //    var delta = e0.wheelDelta || -e0.detail;
            //    this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
            //    e.preventDefault();
            //});

		}
	});

	return SearchContainerView;

});
