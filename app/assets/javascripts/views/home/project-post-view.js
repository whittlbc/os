define(['jquery',
  'backbone',
  'underscore',
  'models/project',
  'models/os.util',
  'views/os.view',
  'models/all-langs',
  'views/widgets/user-info-bubble',
  'views/widgets/more-dropdown/more-dropdown',
  'stache!views/home/project-post-view',
  'backbone-eventbroker'
], function ($,
             Backbone,
             _,
             Project,
             OSUtil,
             OSView,
             AllLangs,
             UserInfoBubble,
             MoreDropdown,
             ProjectPostViewTpl) {
  'use strict';

  var ProjectPostView = OSView.extend({

    initialize: function () {
      this.tagsExpanded = false;
      this.MAX_TAGS = 8;
    },

    events: {
      'click .new-vote-count-container': 'checkIfUserAuthed',
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

    errorHandler: function (resp, status, xhr) {
      console.log('AJAX ERROR: ', xhr, resp);
    },

    openProjectDetails: function () {
      Backbone.EventBroker.trigger('open-project', this.uuid);
    },

    handleVote: function () {
      var self = this;
      self.vote_count++;
      self.voted = true;
      self.$el.find('.new-vote-count-container > span').html(self.vote_count);
      self.$el.find('.vote-master-container').addClass('voted');

      var project = new Project();
      project.vote({uuid: self.uuid, user_uuid: this.currentUser.get('uuid')}, {
        success: function (data) {
          Backbone.EventBroker.trigger('updateUpvotedProjectsArray', data);
        }
      });
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
      this.commentCount = data.total_comments || 0;
      this.contributorCount = data.total_contributors || 0;
      this.license = _.isEmpty(data.license) ? null : data.license[0];
      this.privacy = _.isEmpty(data.privacy) ? null : data.privacy[0];
      this.langs_and_frames = data.langs_and_frames;
      this.status = data.status;
      this.projectType = OSUtil.GRAMMATICAL_PROJECT_TYPES[self.status];
      this.searchResult = data.search_result;
      this.owner_pic = data.owner_pic;
      this.ownerGHUsername = data.owner_gh_username;
      this.anon = data.anon;
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
      this.collapseTags();
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
      this.$el.hover(function () {
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
        self.expandTags();
      }, function () {
      });
    },

    expandTags: function () {
      var self = this;
      this.tagsExpanded = true;
      var tagCount = 0;
      var tagsToHide = [];

      _.each(this.$el.find('.tag-name'), function (element) {
        tagCount++;
        if (tagCount > self.MAX_TAGS) {
          tagsToHide.push(element);
        } else {
          var prevWidth = element.style.width;
          element.style.width = 'auto';
          var endWidth = getComputedStyle(element).width;
          element.style.width = prevWidth;
          element.offsetWidth;
          element.style.transition = 'width .285s';
          element.style.width = endWidth;
        }
      });

      if (!_.isEmpty(tagsToHide)) {
        setTimeout(function () {
          _.each(tagsToHide, function (element) {
            $(element).parent().css('display', 'none');
          });
          self.$moreTagsContainer.css('display', 'inline-block');
        }, 200);
      }
    },

    collapseTags: function () {
      var self = this;

      if (this.tagsExpanded) {
        var tagCount = 0;
        var hiddenTags = [];

        _.each(self.$el.find('.tag-name'), function (element) {
          tagCount++;
          if (tagCount > self.MAX_TAGS) {
            hiddenTags.push(element);
          } else {
            element.style.width = getComputedStyle(element).width;
            element.style.transition = 'width .285s';
            element.offsetWidth;
            element.style.width = '0px';
          }
        });

        if (!_.isEmpty(hiddenTags)) {
          setTimeout(function () {
            self.$moreTagsContainer.css('display', 'none');
            _.each(hiddenTags, function (element) {
              $(element).parent().css('display', 'inline-block');
            });
          }, 200);
        }

      }
    },

    hideOverlappingTags: function (containerRight, $tag) {
      var self = this;
      var tagRight = $tag.offset().left + $tag.width();
      if (tagRight > containerRight) {
        $tag.hide();
        this.hideOverlappingTags(containerRight, $tag.prev());
      }
    },

    addTags: function (namesAndColorsArray) {
      var self = this;
      this.tagWidths = [];
      var extraTags = [];
      var $div;

      if (namesAndColorsArray.length > this.MAX_TAGS) {
        for (var i = 0; i < namesAndColorsArray.length + 1; i++) {
          if (i < this.MAX_TAGS) {
            $div = $('<div>', {class: 'project-post-tag'});
            $div.html('<i class="fa fa-circle" style="color:' + namesAndColorsArray[i].color + '"></i><div class="tag-name">' + namesAndColorsArray[i].name + '&nbsp;&nbsp;&nbsp;&nbsp;</div>');
          }
          else if (i == this.MAX_TAGS) {
            $div = $('<div>', {class: 'more-tags-container'});
            this.$moreTagsContainer = $div;
            var $moreTagsCount = $('<div>', {class: 'more-tags-count'});
            var $moreTagsDropdown = $('<div>', {class: 'more-tags-dropdown'});
            $div.append($moreTagsCount);
            $div.append($moreTagsDropdown);
          }
          else {
            extraTags.push(namesAndColorsArray[i-1].name);
            $div = $('<div>', {class: 'project-post-tag'});
            $div.html('<i class="fa fa-circle" style="color:' + namesAndColorsArray[i-1].color + '"></i><div class="tag-name">' + namesAndColorsArray[i-1].name + '&nbsp;&nbsp;&nbsp;&nbsp;</div>');
          }
          this.$el.find('.tag-container').append($div);
        }

        this.moreTagsDropdown = new MoreDropdown({
          el: this.$el.find('.more-tags-dropdown')
        });

        this.moreTagsDropdown.render();
        this.moreTagsDropdown.populate(extraTags);

        $moreTagsCount.html(extraTags.length + ' more');
        $moreTagsCount.hover(function () {
          self.moreTagsDropdown.showDropdown();
        }, function () {
          self.moreTagsDropdown.hideDropdown();
        });

      } else {
        for (var i = 0; i < namesAndColorsArray.length; i++) {
          $div = $('<div>', {class: 'project-post-tag'});
          $div.html('<i class="fa fa-circle" style="color:' + namesAndColorsArray[i].color + '"></i><div class="tag-name">' + namesAndColorsArray[i].name + '&nbsp;&nbsp;&nbsp;&nbsp;</div>');
          this.$el.find('.tag-container').append($div);
        }
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
        hasLicense: !_.isEmpty(self.license),
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
        ghUsername: self.ownerGHUsername,
        anon: self.anon
      });

      this.$el.find('[data-toggle="tooltip"]').tooltip();
    }
  });

  return ProjectPostView;

});
