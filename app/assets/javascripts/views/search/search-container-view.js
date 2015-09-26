define(['jquery',
	'backbone',
	'underscore',
    'models/project',
	'stache!views/search/search-container-view'
    ], function ($,
     Backbone,
     _,
     Project,
     SearchContainerViewTpl) {
	'use strict';

	var SearchContainerView = Backbone.View.extend({

		initialize: function () {
            this.isOpen = false;
            this.searchTimeout = null;
            this.dropdownShown = false;
        },

		events: {},

        renderSearchBar: function () {
            var self = this;
            var project = new Project();
            this.$input.focus(function(){
                if(!self.isOpen) {
                    self.$searchBox.addClass('searchbox-open');
                    self.isOpen = true;
                }
            });
            this.$input.blur(function(){
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
                        // hide seach results
                    } else {
                        project.search({query: query}, {success: function (projectResults) {
                            console.log(projectResults)
                        }});
                    }
                }, 180);
            });
        },

		render: function () {
			var self = this;
            this.$el.html(SearchContainerViewTpl());
            this.$searchBox = this.$el.find('.searchbox');
            this.$input = this.$el.find('.searchbox > input');
            this.$dropdown = this.$el.find('.search-results-list');
            this.renderSearchBar();

		}
	});

	return SearchContainerView;

});
