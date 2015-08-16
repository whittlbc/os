define(['jquery',
	'backbone',
	'underscore',
    'views/add-project/repo-list-view',
    'views/add-project/details-view',
    'stache!views/add-project/add-project-details-view'
], function ($,
     Backbone,
     _,
     RepoListView,
     DetailsView,
     AddProjectDetailsViewTpl) {
	'use strict';

	var AddProjectDetailsView = Backbone.View.extend({

		initialize: function () {
            this.langsFramesValue = [];
        },

		events: {},

        passUserRepos: function (repos) {
            this.repos = repos;
            this.repoListView.passUserRepos(repos);
            this.repoListView.hideReposLoadingView();
            this.populateUIRepoList();
        },

        populateUIRepoList: function () {
            this.repoListView.showRepoMessage();
            this.repoListView.populate();
        },

        setHeight: function (height) {
            //this.$el.find('.add-project-details-inside-container').height(height);
        },

        passLangDropdownItems: function (data) {
            this.langDropdownItems = data;
        },

        passTags: function (data) {
            this.tags = data;
        },

        passRepoInfo: function (data) {
            this.repoData = data;
            this.detailsView.resetInfo();
            this.detailsView.setRepoInfo(data);
        },

        passType: function (type) {
            this.selectedType = type;
        },

        scrollToDetailsView: function () {
            var self = this;
            var $scrollContainer = this.$el.find('.add-project-details-scroll-container');
            var reposViewHeight = this.repoListView.$el.height();
            $scrollContainer.animate({scrollTop: reposViewHeight}, {duration: 500, specialEasing: 'easeInOutCubic'});
        },

		render: function (options) {
			var self = this;

            if (options && options.selectedSource == this.sourceMap['gh'] && selectedRepo == null) {
                options.hideDetailsView = (this.selectedSource == options.selectedSource) ? false : true;
            }

            if (options && options.selectedSource) {
                this.selectedSource = options.selectedSource;
            }

            var selectedRepo = null;
            if (this.selectedSource == this.sourceMap['gh'] && this.repoListView) {
                selectedRepo = this.repoListView.getSelectedRepo();
            }

            this.$el.html(AddProjectDetailsViewTpl({
                showReposView: this.selectedSource == this.sourceMap['gh']
            }));

            this.detailsView = new DetailsView({
                el: '#detailsView'
            });

            this.detailsView.typeMap = this.typeMap;
            this.detailsView.sourceMap = this.sourceMap;
            if (this.selectedType) {
                this.detailsView.passType(this.selectedType);
            }
            if (this.langDropdownItems) {
                this.detailsView.passLangDropdownItems(this.langDropdownItems);
            }
            if (this.tags) {
                this.detailsView.passTags(this.tags);
            }
            this.detailsView.render(options);

            this.repoListView = new RepoListView({
                el: '#reposView'
            });
            this.listenTo(this.repoListView, 'repo:selected', function (name) {
                self.trigger('repo:getDetails', name);
                self.detailsView.render({hideDetailsView: false});
                setTimeout(function () {
                    self.scrollToDetailsView();
                }, 10);
            });
            if (this.repos) {
                this.repoListView.passUserRepos(this.repos);
            }
            var repoListViewOptions = {};
            if (options && options.showReposLoadingView) {
                repoListViewOptions.showReposLoadingView = options.showReposLoadingView;
            }
            this.repoListView.render(repoListViewOptions);

            if (this.repos && this.selectedSource == this.sourceMap['gh']) {
                this.populateUIRepoList();
            }
        }
	});

	return AddProjectDetailsView;

});
