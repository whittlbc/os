define(['jquery',
	'backbone',
	'underscore',
    'models/project',
    'views/home/project-post-view',
	'stache!views/home/project-feed-view',
    ], function ($,
     Backbone,
     _,
     Project,
     ProjectPostView,
     ProjectFeedViewTpl
     ) {
	'use strict';

    var view;

	var ProjectFeedView = Backbone.View.extend({

        initialize: function() {
            view = this;
        },

        setProjectTypeStatus: function (val) {
            var self = this;
            this.projectTypeStatus = val;
        },

        errorHandler: function(resp, status, xhr) {
            console.log('AJAX ERROR: ', xhr, resp);
        },

        passColorsAndInitials: function (data) {
            this.colors_and_initials = data;
        },

		handleFetchProjects: function (resp, status, xhr) {
            view.populateFeed(resp);
		},

        //handleShowNewProject: function (data) {
        //    // only immediately show the newly created project if the type of project they created matches the others in the current feed
        //    if (data.status == this.projectTypeStatus) {
        //        var self = this;
        //        this.$el.find('.project-feed-list').empty();
        //        this.unshiftNewPostToPostViews(data);
        //        var newViewsArray = [];
        //        for (var i = 0; i < this.POST_VIEWS.length; i++) {
        //            var projectPostView = this.POST_VIEWS[i];
        //            projectPostView.setData(this.POST_VIEWS[i].data);
        //            this.setProjectListeners(projectPostView);
        //            projectPostView.render();
        //            this.$el.find('.project-feed-list').append(projectPostView.el);
        //            newViewsArray.push(projectPostView);
        //        }
        //        this.POST_VIEWS = newViewsArray;
        //    }
        //},

        //unshiftNewPostToPostViews: function(data) {
        //    var projectPostView = new ProjectPostView({
        //        tagName: 'li'
        //    });
        //    projectPostView.setData(data);
        //    this.setProjectListeners(projectPostView);
        //    this.POST_VIEWS.unshift(projectPostView);
        //},

        populateFeed: function (projects) {
            var self = this;
            this.POST_VIEWS = [];
            this.$el.find('.project-feed-list').empty();
            for (var i = 0; i < projects.length; i++) {
                this.addPost(projects[i]);
            }
        },

        addPost: function(data) {
            var projectPostView = new ProjectPostView({
                tagName: 'li'
            });
            projectPostView.setData(data);
            this.setProjectListeners(projectPostView);
            projectPostView.render();
            this.$el.find('.project-feed-list').append(projectPostView.el);
            this.POST_VIEWS.push(projectPostView);
        },

        setProjectListeners: function (projectPostView) {
            var self = this;
            this.listenTo(projectPostView, 'addTags', function(postView) {
                self.colorsForTags(postView);
            });
        },

        colorsForTags: function (postView) {
            var self = this;
            var namesAndColorsArray = [];
            if (Array.isArray(postView.langs_and_frames)) {
                for (var i = 0; i < postView.langs_and_frames.length; i++) {
                    var entry = self.colors_and_initials[postView.langs_and_frames[i]];
                    if (entry) {
                        namesAndColorsArray.push({
                            name: postView.langs_and_frames[i],
                            color: entry["color"]
                        });
                    }
                }
            }
            postView.addTags(namesAndColorsArray);
        },

		events: {
            'click .project-post-view': 'onSelectProject'
        },

        onSelectProject: function() {
            var self = this;
        },

        createProjectSuccess: function(resp, status, xhr) {
            console.log('Successfully created new project');
        },

        updateProjectSuccess: function(resp, status, xhr) {
            console.log('Successfully updated project');
        },

        deleteProjectSuccess: function(resp, status, xhr) {
            console.log('Successfully deleted project');
        },

		render: function () {
			var self = this;
            this.$el.html(ProjectFeedViewTpl());
		}
	});

	return ProjectFeedView;

});
