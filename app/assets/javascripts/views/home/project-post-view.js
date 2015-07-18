define(['jquery',
	'backbone',
	'underscore',
	'stache!views/home/project-post-view'
    ], function ($,
     Backbone,
     _,
     ProjectPostViewTpl) {
	'use strict';

	var ProjectPostView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

        setData: function (data) {
            var self = this;
            this.data = data;
            this.title = data.title;
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
