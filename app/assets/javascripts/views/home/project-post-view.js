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
     ProjectPostViewTpl) {
	'use strict';

	var ProjectPostView = Backbone.View.extend({

		initialize: function () {
            this.tagsExpanded = false;
		},

		events: {
            'click .arrow': 'checkIfUserAuthed',
            'click .project-post-user-pic': 'clickedUserPic',
            'click .project-post-view': 'openProjectDetails'
        },

        clickedUserPic: function (e) {
            e.stopPropagation();
        },

        checkIfUserAuthed: function (e) {
            e.stopPropagation();
            Backbone.EventBroker.trigger('project:vote', {view: this, projectID: this.id});
        },

        errorHandler: function(resp, status, xhr) {
            console.log('AJAX ERROR: ', xhr, resp);
        },

        openProjectDetails: function () {
            Backbone.EventBroker.trigger('open-project', this.id);
        },

        handleVote: function(userUUID) {
            var self = this;
            self.vote_count++;
            self.voted = true;
            self.$el.find('.vote-count-container').html(self.vote_count);
            self.$el.find('.vote-master-container').addClass('voted');
            var project = new Project();
            project.vote({project_uuid: self.uuid, user_uuid: userUUID}, {success: function (data) {
                Backbone.EventBroker.trigger('updateUpvotedProjectsArray', data);
            }});
        },

        setData: function (data) {
            var self = this;
            this.data = data;
            this.title = data.title;
            this.subtitle = data.subtitle;
            this.date = OSUtil.getTimeAgo(data.created_at);
            this.id = data.id;
            this.uuid = data.uuid;
            this.vote_count = data.vote_count;
            this.voted = data.voted;
            this.commentCount = data.total_comments;
            this.contributorCount = data.contributors ? data.contributors.length : 0;
            this.license = _.isEmpty(data.license) ? null : data.license[0];
            this.privacy = _.isEmpty(data.privacy) ? null : data.privacy[0];
            this.langs_and_frames = data.langs_and_frames;
            this.status = data.status;
            this.projectType = OSUtil.GRAMMATICAL_PROJECT_TYPES[self.status];
            this.searchResult = data.search_result;
            this.owner_pic = data.owner_pic;
            this.ownerGHUsername = data.owner_gh_username
        },

        hoverOn: function () {
            var self = this;
            this.$licenseContainer.css('opacity', '1');
            this.$privacyContainer.css('opacity', '1');
            this.$date.css('opacity', '1');
        },

        hoverOff: function () {
            var self = this;
            this.$licenseContainer.css('opacity', '0');
            this.$privacyContainer.css('opacity', '0');
            this.$date.css('opacity', '0');
            if (this.tagsExpanded) {
                _.each(self.$el.find('.tag-name'), function (element) {
                    element.style.width = getComputedStyle(element).width;
                    element.style.transition = 'width .285s';
                    element.offsetWidth;
                    element.style.width = '0px';
                });
            }
        },

        showBubble: function () {
            var self = this;
            if (!this.bubbleShown) {
                this.$el.find('.user-info-bubble').show();
                this.bubbleShown = true;
            }
        },

        hideBubble: function () {
            var self = this;
            if (this.bubbleShown) {
                this.$el.find('.user-info-bubble').hide();
                this.bubbleShown = false;
            }
        },

        addListeners: function () {
            var self = this;
            this.$el.hover(function() {
                self.hoverOn();
            }, function () {
                self.hoverOff();
            });

            this.$el.find('.project-post-user-pic').hover(function () {
                self.showBubble();
            }, function () {
                self.hideBubble();
            });

            this.$el.find('.user-info-bubble').hover(function () {
                self.showBubble();
            }, function () {
                self.hideBubble();
            });

            this.$el.find('.grab-btn').click(function (e) {
                e.stopPropagation();
                Backbone.EventBroker.trigger('pull-project', self.id);
            });

            this.$el.find('.tag-container').hover(function () {
                self.tagsExpanded = true;
                _.each(self.$el.find('.tag-name'), function (element) {
                    var prevWidth = element.style.width;
                    element.style.width = 'auto';
                    var endWidth = getComputedStyle(element).width;
                    element.style.width = prevWidth;
                    element.offsetWidth;
                    element.style.transition = 'width .285s';
                    element.style.width = endWidth;
                });
            }, function () {});
        },

        addTags: function (namesAndColorsArray) {
            var self = this;
            this.tagWidths = [];
            for (var i = 0; i < namesAndColorsArray.length; i++) {
                var $div = $('<div>', { class: 'project-post-tag' });
                $div.html('<i class="fa fa-circle" style="color:'+ namesAndColorsArray[i].color +'"></i><div class="tag-name">'+ namesAndColorsArray[i].name +'&nbsp;&nbsp;&nbsp;&nbsp;</div>');
                this.$el.find('.tag-container').append($div);
            }
        },

        applyAlreadyVoted: function () {
            this.$el.find('.vote-master-container').addClass('voted');
        },

        render: function () {
			var self = this;
            var correctedLangsFramesArray = [];

            if (Array.isArray(self.langs_and_frames)) {
                _.each(self.langs_and_frames, function (item) {
                    if (item) {
                        correctedLangsFramesArray.push(item);
                    }
                });
            }

            this.$el.html(ProjectPostViewTpl({
                title: self.title,
                subtitle: self.subtitle,
                date: self.date,
                vote_count: self.vote_count,
                commentCount: self.commentCount,
                contributorCount: self.contributorCount,
                license: self.license,
                requestToJoin: self.privacy === OSUtil.REQUEST_PRIVACY,
                open: self.privacy === OSUtil.OPEN_PRIVACY,
                upForGrabsType: self.status == OSUtil.PROJECT_TYPES.indexOf('up-for-grabs'),
                searchResult: self.searchResult,
                projectType: self.projectType,
                userPic: self.owner_pic,
                voted: self.voted,
                hasTags: correctedLangsFramesArray.length > 0
            }));
            this.trigger('addTags', this);
            this.$licenseContainer = this.$el.find('.project-post-license');
            this.$privacyContainer = this.$el.find('.project-post-privacy');
            this.$date = this.$el.find('.project-extra-details-container .date');
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
