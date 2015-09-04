define(['jquery',
	'backbone',
	'underscore',
    'views/home/index-view',
    'views/projects/project-view',
    'models/os.util',
    'stache!views/main-view'
    ], function ($,
     Backbone,
     _,
     IndexView,
     ProjectView,
     OSUtil,
     MainViewTpl) {
	'use strict';

	var MainView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

        changeHomeFeedType: function (index) {
            this.homeView.populateProjectFeed(index);
        },

        switchProject: function (id) {
            this.projectView = new ProjectView({
                el: this.$el.find('#projectViewContainer'),
                id: id
            });
            this.projectView.render();
        },

		render: function (options) {
			var self = this;

            var showHomeView = options && options.view == OSUtil.HOME_PAGE;
            var showProjectView = options && options.view == OSUtil.PROJECT_PAGE;

            this.$el.html(MainViewTpl({
                showHomeView: showHomeView,
                showProjectView: showProjectView
            }));

            if (showHomeView) {
                this.homeView = new IndexView({
                    el: this.$el.find('#homeViewContainer')
                });
                this.homeView.render({
                    index: options && options.index ? options.index : 1
                });
            }
            if (showProjectView) {
                this.projectView = new ProjectView({
                    el: this.$el.find('#projectViewContainer'),
                    id: options ? options.id : null
                });
                this.projectView.render();
            }
		}
	});

	return MainView;

});
