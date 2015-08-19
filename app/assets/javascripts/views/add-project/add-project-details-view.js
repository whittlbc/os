define(['jquery',
	'backbone',
	'underscore',
    'views/add-project/repo-list-view',
    'views/add-project/details-view',
    'views/add-project/creating-project-view',
    'models/os.util',
    'stache!views/add-project/add-project-details-view'
], function ($,
     Backbone,
     _,
     RepoListView,
     DetailsView,
     CreatingProjectView,
     OSUtil,
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

        allowCreate: function () {
            var self = this;

        },

        showCreatingProjectView: function () {
            this.creatingProjectView.show();
        },

		render: function (options) {
			var self = this;
            var showCreatingProjectView = false;
            if (options && options.selectedSource == OSUtil.SOURCE_MAP['gh'] && selectedRepo == null) {
                options.hideDetailsView = (this.selectedSource == options.selectedSource) ? false : true;
            }

            if (options && options.selectedSource) {
                this.selectedSource = options.selectedSource;
            }

            if (options && options.showCreatingProjectView) {
                showCreatingProjectView = true;
            }

            var selectedRepo = null;
            if (this.selectedSource == OSUtil.SOURCE_MAP['gh'] && this.repoListView) {
                selectedRepo = this.repoListView.getSelectedRepo();
            }

            this.$el.html(AddProjectDetailsViewTpl({
                showReposView: this.selectedSource == OSUtil.SOURCE_MAP['gh'],
                showCreatingProjectView: showCreatingProjectView
            }));

            this.detailsView = new DetailsView({
                el: '#detailsView'
            });

            if (this.selectedType) {
                this.detailsView.passType(this.selectedType);
            }
            if (this.langDropdownItems) {
                this.detailsView.passLangDropdownItems(this.langDropdownItems);
            }
            if (this.tags) {
                this.detailsView.passTags(this.tags);
            }

            if (!showCreatingProjectView) {
                this.detailsView.render(options);
            }

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

            if (this.repos && this.selectedSource == OSUtil.SOURCE_MAP['gh']) {
                this.populateUIRepoList();
            }

            if (showCreatingProjectView) {
                this.creatingProjectView = new CreatingProjectView({
                    el: '#creatingProjectView'
                });
                this.creatingProjectView.setMessage('Creating project...');
                this.creatingProjectView.render();
            }

            $('[data-toggle="tooltip"]').tooltip();
        }
	});

	return AddProjectDetailsView;

});
