fdefine(['jquery',
	'backbone',
	'underscore',
    'views/add-project/repo-list-item',
    'views/add-project/repos-loading-view',
    'stache!views/add-project/repo-list-view'
    ], function ($,
     Backbone,
     _,
     RepoListItem,
     ReposLoadingView,
     RepoListViewTpl) {
	'use strict';

	var RepoListView = Backbone.View.extend({

		initialize: function () {
            this.selectedRepo = null;
		},

		events: {},

        populate: function () {
            this.REPOS = [];
            this.$el.find('#addNewProjectRepoList').empty();
            for (var i = 0; i < this.repos.length; i++) {
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
                self.selectedRepo = name;
                self.trigger('repo:selected', name);
            });
        },

        getSelectedRepo: function () {
            return this.selectedRepo;
        },

        showRepoMessage: function () {
            this.$el.find('.select-repo-message').show();
        },

        hideReposLoadingView: function () {
            var self = this;
            this.reposLoadingView.hide();
        },

        passUserRepos: function (repos) {
            this.repos = repos;
        },

        render: function (options) {
			var self = this;
            this.$el.html(RepoListViewTpl());
            if (this.repos) {
                this.populate();
            }

            this.reposLoadingView = new ReposLoadingView({
                el: '#reposLoadingView'
            });
            this.reposLoadingView.setMessage('Fetching your repositories...');
            this.reposLoadingView.render();

            options && options.showReposLoadingView ? this.reposLoadingView.show() : this.reposLoadingView.hide();
        }
	});

	return RepoListView;

});
