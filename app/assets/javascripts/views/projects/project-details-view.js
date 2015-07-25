define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/project-details-view'
    ], function ($,
     Backbone,
     _,
     ProjectDetailsViewTpl) {
	'use strict';

	var ProjectDetailsView = Backbone.View.extend({

		initialize: function () {
		},

		events: {
            'click .add-comment': 'clickedAddComment',
            'click .join-project': 'clickedJoinProject'
        },

        clickedAddComment: function() {
            this.trigger('comment:add', this.$el.find('.comment-input').val());
        },

        clickedJoinProject: function () {
            this.trigger('project:join');
        },

		render: function (data) {
			var self = this;
            this.$el.html(ProjectDetailsViewTpl({
                title: data.title,
                created_at: data.created_at,
                repo_name: data.repo_name,
                description: data.description,
                vote_count: data.vote_count,
                user_id: data.user_id,
                status: data.status,
                anon: data.anon,
                langs_and_frames: data.langs_and_frames,
                contributors: data.contributors.length > 0 ? 'exists' : 'none',
                license: data.license.length > 0 ? 'exists' : 'none',
                privacy: data.privacy.length > 0 ? 'exists' : 'none'
            }));
		}
	});

	return ProjectDetailsView;

});
