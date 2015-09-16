define(['jquery',
	'backbone',
	'underscore',
    'models/project',
    'models/os.util',
    'models/all-langs',
    'views/widgets/user-info-bubble',
	'stache!views/home/project-post-view',
    'backbone-eventbroker'
    ], function ($,
     Backbone,
     _,
     Project,
     OSUtil,
     AllLangs,
     UserInfoBubble,
     ProjectPostViewTpl) {8
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
            project.vote({uuid: self.uuid});
        },

        setData: function (data) {
            var self = this;
            this.data = data;
            this.title = data.title;
            this.id = data.id;
            this.uuid = data.uuid;
            this.vote_count = data.vote_count;
            this.commentCount = 5;  // actually connect this later
            this.contributorCount = data.contributors ? data.contributors.length : 0;
            //this.license = _.isEmpty(data.license) ? null : data.license[0];
            //this.privacy = _.isEmpty(data.privacy) ? null : data.privacy[0];
            //this.langs_and_frames = data.langs_and_frames;
            this.license = 'MIT';
            this.privacy = OSUtil.OPEN_PRIVACY;
            this.status = data.status;
            this.projectType = OSUtil.GRAMMATICAL_PROJECT_TYPES[self.status];
            this.searchResult = data.search_result;
            this.langs_and_frames = ['HTML', 'Ruby'];
            this.owner_pic = data.owner_pic;
            this.ownerGHUsername = data.owner_gh_username
        },

        hoverOn: function () {
            this.$licenseContainer.css('opacity', '1');
            this.$privacyContainer.css('opacity', '1');
        },

        hoverOff: function () {
            this.$licenseContainer.css('opacity', '0');
            this.$privacyContainer.css('opacity', '0');
        },

        addListeners: function () {
            var self = this;
            this.$el.hover(function() {
                self.hoverOn();
            }, function () {
                self.hoverOff();
            });

            this.$el.find('.project-post-user-pic').hover(function () {
                if (!self.bubbleShown) {
                    self.$el.find('.user-info-bubble').show();
                    self.bubbleShown = true;
                }
            }, function () {
                if (self.bubbleShown) {
                    self.$el.find('.user-info-bubble').hide();
                    self.bubbleShown = false;
                }
            });

            this.$el.find('.user-info-bubble').hover(function () {
                if (!self.bubbleShown) {
                    self.$el.find('.user-info-bubble').show();
                    self.bubbleShown = true;
                }
            }, function () {
                if (self.bubbleShown) {
                    self.$el.find('.user-info-bubble').hide();
                    self.bubbleShown = false;
                }
            });

            this.$el.find('.grab-btn').click(function () {
                Backbone.EventBroker.trigger('pull-project', self.id);
            });
        },

        addTags: function (namesAndColorsArray) {
            for (var i = 0; i < namesAndColorsArray.length; i++) {
                var $tag = $('<div>', {
                    class: 'post-tag'
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
                open: self.privacy == OSUtil.OPEN_PRIVACY,
                upForGrabsType: self.status == OSUtil.PROJECT_TYPES.indexOf('up-for-grabs'),
                searchResult: self.searchResult,
                projectType: self.projectType,
                userPic: self.owner_pic
            }));
            this.trigger('addTags', this);
            this.$licenseContainer = this.$el.find('.project-post-license');
            this.$privacyContainer = this.$el.find('.project-post-privacy');
            this.addListeners();

            this.userInfoBubble = new UserInfoBubble({
                el: this.$el.find('.user-info-bubble')
            });
            this.userInfoBubble.render({
                userPic: self.owner_pic,
                ghUsername: self.ownerGHUsername
            });



        }
	});

	return ProjectPostView;

});
