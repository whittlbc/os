define(['jquery',
	'backbone',
	'underscore',
    'views/add-project/repo-list-item',
	'stache!views/add-project/add-project-details-view'
    ], function ($,
     Backbone,
     _,
     RepoListItem,
     AddProjectDetailsViewTpl) {
	'use strict';

	var AddProjectDetailsView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

        passUserRepos: function (repos) {
            var self = this;
            this.repos = repos;
            console.log('repos', this.repos);
            this.populateUIRepoList();
        },

        populateUIRepoList: function () {
            var self = this;
            this.REPOS = [];
            this.$el.find('#addNewProjectRepoList').empty();
            for (var i = 0; i < this.repos.length; i++) {
                console.log('add list item');
                this.addRepoToList(this.repos[i]);
            }
        },

        addRepoToList: function(name) {
            var repoListItem = new RepoListItem({
                tagName: 'li'
            });
            var data = {
                name: name
            };
            repoListItem.setData(data);
            this.setItemListeners(repoListItem);
            repoListItem.render();
            this.$el.find('#addNewProjectRepoList').append(repoListItem.el);
            this.REPOS.push(repoListItem);
        },

        setItemListeners: function (repoListItem) {
            var self = this;
            this.listenTo(repoListItem, 'repo:selected', function (name) {
                self.trigger('repo:getDetails', name);
            });
        },

        setHeight: function (height) {
            this.$el.find('.add-project-details-view').height(height);
        },

        initLangFramesDropdown: function () {
            var self = this;
            var options = {
                theme: 'links',
                maxItems: null,
                valueField: 'id',
                searchField: 'title',
                options: this.dropdown_items,
                normal: true,
                selectOnTab: true,
                render: {
                    option: function (data, escape) {
                        return '<div class="option title">' + escape(data.title) + '</div>';
                    },
                    item: function (data, escape) {
                        return '<div class="item">' + escape(data.title) + '</div>';
                    }
                }
            };

            var $langFrameSelect= this.$el.find('#filters-langs-frames').selectize(options);
            var langFrameSelectize = $langFrameSelect[0].selectize;
            this.langFrameSelectize = langFrameSelectize;
        },

		render: function (options) {
			var self = this;
            if (options && options.selectedSource) {
                this.selectedSource = options.selectedSource;
                this.selectedSource = options.selectedSource;
            }
            this.$el.html(AddProjectDetailsViewTpl({
                gh: this.selectedSource == this.sourceMap['gh'],
                scratch: this.selectedSource == this.sourceMap['scratch'],
                ideas: this.selectedSource == this.sourceMap['pull-from-ideas'],
            }));
		}
	});

	return AddProjectDetailsView;

});
