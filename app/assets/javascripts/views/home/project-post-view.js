define(['jquery',
	'backbone',
	'underscore',
    'models/project',
	'stache!views/home/project-post-view'
    ], function ($,
     Backbone,
     _,
     Project,
     ProjectPostViewTpl) {
	'use strict';

	var ProjectPostView = Backbone.View.extend({

		initialize: function () {
		},

		events: {
            'click .vote-arrow': 'handleVote'
        },

        errorHandler: function(resp, status, xhr) {
            console.log('AJAX ERROR: ', xhr, resp);
        },

        handleVote: function() {
            var self = this;
            self.voteCount++;
            self.render();
            var project = new Project();
            project.vote({uuid: self.uuid}, {success: self.voteSuccess, error: self.errorHandler});
        },

        voteSuccess: function (resp) {
            var self = this;
            console.log(resp);
        },

        setData: function (data) {
            var self = this;
            this.data = data;
            this.title = data.title;
            this.uuid = data.uuid;
            this.voteCount = data.vote_count;
        },

        render: function () {
			var self = this;
            this.$el.html(ProjectPostViewTpl({
                title: self.title,
                voteCount: self.voteCount
            }));
		}
	});

	return ProjectPostView;

});
