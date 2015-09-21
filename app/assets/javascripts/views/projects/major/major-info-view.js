define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
    'models/project',
    'models/all-langs',
	'stache!views/projects/major/major-info-view',
    'dotdotdot',
    'backbone-eventbroker'
], function ($,
     Backbone,
     _,
     OSUtil,
     Project,
     AllLangs,
     MajorInfoViewTpl) {
	'use strict';

	var MajorInfoView = Backbone.View.extend({

		initialize: function () {
            this.allLangs = AllLangs.getAll();
            this.descriptionMaxHeight = 135;
		},

		events: {
            'click .see-all-description': 'handleToggleDescriptionSize',
            'click .project-page-vote-container': 'checkIfUserAuthed',
            'click .join-btn': 'handleJoin',
            'click .star': 'handleStarProject'
        },

        handleStarProject: function () {
            var self = this;
            var $star = this.$el.find('.star');
            if ($star.hasClass('starred')) {
                // unstar
                Backbone.EventBroker.trigger('project:star', false);
                $star.removeClass('starred');
                self.$el.find('.star > .fa').removeClass('fa-star').addClass('fa-star-o');
            } else {
                // star
                Backbone.EventBroker.trigger('project:star', true);
                $star.addClass('starred');
                self.$el.find('.star > .fa').addClass('fa-star').removeClass('fa-star-o');
            }
        },

        handleJoin: function () {
            Backbone.EventBroker.trigger('project:join');
        },

        checkIfUserAuthed: function () {
            Backbone.EventBroker.trigger('project:vote', this);
        },

        handleVote: function() {
            var self = this;
            var oldVote = Number(this.$el.find('.project-page-vote-count').html());
            this.$el.find('.project-page-vote-count').html(oldVote + 1);
            var project = new Project();
            project.vote({uuid: self.uuid});
        },

        handleToggleDescriptionSize: function () {
            this.$descriptionContainer.hasClass('is-truncated') ? this.showMoreDescription() : this.showLessDescription();
            //this.$descriptionContainer.height(this.descriptionMaxHeight);
            //this.$descriptionContainer.css('overflow', 'hidden');
            //this.$el.find('.major-info-project-description > p').height(this.descriptionMaxHeight);
            //this.$el.find('.major-info-project-description > p').css('overflow', 'hidden');
            //setTimeout(function () {
            //    self.$descriptionContainer.trigger('destroy');
            //    self.$descriptionContainer.removeClass('is-truncated');
            //    self.$el.find('.major-info-project-description > p').css('display', 'inline');
            //    self.$el.find('.see-all-description').html('See Less');
            //    self.$el.find('.see-all-description').css('margin-left', '8px');
                //self.$descriptionContainer.animate({height: self.originalDescriptionHeight}, {duration: 300});
            //}, 5);
        },

        showMoreDescription: function () {
            this.$descriptionContainer.trigger('destroy');
            this.$descriptionContainer.removeClass('is-truncated');
            this.$el.find('.major-info-project-description > p').css('display', 'inline');
            this.$el.find('.see-all-description').html('See Less');
            this.$el.find('.see-all-description').css('margin-left', '8px');
        },

        showLessDescription: function () {
            this.$descriptionContainer.dotdotdot({
                height: this.descriptionMaxHeight,
                after: '.see-all-description'
            });
            this.$el.find('.see-all-description').html('See All');
            this.$el.find('.see-all-description').css('margin-left', '0');
        },

        addTags: function (langsFrames) {
            if (Array.isArray(langsFrames)) {
                for (var i = 0; i < langsFrames.length; i++) {
                    var $tag = $('<div>', {
                        class: 'major-info-tag'
                    });
                    $tag.html(langsFrames[i]);
                    var colors_and_initials = this.allLangs['colors_and_initials'];
                    var langFrame = colors_and_initials[langsFrames[i]];
                    if (langFrame) {
                        var color = langFrame['color'];
                        $tag.css('color', color);
                        $tag.css('border', '2px solid ' + color);
                        this.$el.find('.major-info-tag-container').append($tag);
                    }
                }
            }
        },

		render: function (options) {
			var self = this;
            options = options || {};

            this.uuid = options ? options.uuid : null;

            this.$el.html(MajorInfoViewTpl({
                title: options.title ? options.title : '',
                projectType: options.hasOwnProperty('status') ? OSUtil.GRAMMATICAL_PROJECT_TYPES[options.status] : '',
                subtitle: options.subtitle ? options.subtitle : '',
                description: options.description ? options.description : '',
                voteCount: options.hasOwnProperty('vote_count') ? options.vote_count : '-',
                starred: options.starred
            }));
            this.addTags(options.langs_and_frames);
            this.$descriptionContainer = this.$el.find('.major-info-project-description');
            this.originalDescriptionHeight = this.$descriptionContainer.height();
            this.$descriptionContainer.dotdotdot({
                height: this.descriptionMaxHeight,
                after: '.see-all-description'
            });
            var isTruncated = this.$descriptionContainer.triggerHandler('isTruncated');
            if (!isTruncated) {
                this.$el.find('.see-all-description').hide();
            }

		}
	});

	return MajorInfoView;

});
