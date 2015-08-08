define(['jquery',
	'backbone',
	'underscore',
    'models/project',
    'models/os.util',
    'models/all-langs',
	'stache!views/home/project-post-view'
    ], function ($,
     Backbone,
     _,
     Project,
     OSUtil,
     AllLangs,
     ProjectPostViewTpl) {
	'use strict';

	var ProjectPostView = Backbone.View.extend({

		initialize: function () {
		},

		events: {
            'click .arrow': 'handleVote',
            'click .project-post-title-text': 'openProjectDetails',
        },

        errorHandler: function(resp, status, xhr) {
            console.log('AJAX ERROR: ', xhr, resp);
        },

        openProjectDetails: function () {
            window.location.hash = '#projects/' + this.id;
        },

        handleVote: function() {
            var self = this;
            self.vote_count++;
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
            this.id = data.id;
            this.uuid = data.uuid;
            this.vote_count = data.vote_count;
            this.commentCount = 5;  // actually connect this later
            this.contributorCount = data.contributors.length;
            //this.license = _.isEmpty(data.license) ? null : data.license[0];
            //this.privacy = _.isEmpty(data.privacy) ? null : data.privacy[0];
            //this.langs_and_frames = data.langs_and_frames;
            this.license = 'MIT';
            this.privacy = 'open';
            this.langs_and_frames = ['HTML', 'Ruby'];
        },

        hoverOn: function () {
            this.$licenseContainer.animate({opacity: 1}, {duration: 80, queue: false});
            this.$privacyContainer.animate({opacity: 1}, {duration: 80, queue: false});
        },

        hoverOff: function () {
            this.$licenseContainer.css('opacity', '0');
            this.$privacyContainer.css('opacity', '0');
        },

        addHoverListener: function () {
            var self = this;
            this.$el.hover(function() {
                self.hoverOn();
            }, function () {
                self.hoverOff();
            });
        },

        addTags: function (namesAndColorsArray) {
            for (var i = 0; i < namesAndColorsArray.length; i++) {
                var $tag = $('<div>', {
                    class: 'post-tag',
                    content: namesAndColorsArray[i].name
                });
                $tag.html(namesAndColorsArray[i].name);
                $tag.css('color', namesAndColorsArray[i].color);
                $tag.css('border', '2px solid ' + namesAndColorsArray[i].color);
                this.$el.find('.tag-container').append($tag);
            }
        },

        render: function () {
			var self = this;
            this.$el.html(ProjectPostViewTpl({
                title: self.title,
                vote_count: self.vote_count,
                commentCount: self.commentCount,
                contributorCount: self.contributorCount,
                license: self.license,
                requestToJoin: self.privacy == OSUtil.REQUEST_PRIVACY,
                open: self.privacy == OSUtil.OPEN_PRIVACY
            }));
            this.trigger('addTags', this);
            this.$licenseContainer = this.$el.find('.project-post-license');
            this.$privacyContainer = this.$el.find('.project-post-privacy');
            this.addHoverListener();
		}
	});

	return ProjectPostView;

});
