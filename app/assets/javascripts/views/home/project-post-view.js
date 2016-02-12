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
  'backbone-eventbroker',
  'jquery-transit',
  'linkify'
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

    postInitialize: function (options) {
      this.tagsExpanded = false;
      this.safari = options.safari;
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
      Backbone.EventBroker.trigger('project:vote', this);
    },

    errorHandler: function (resp, status, xhr) {
      console.log('AJAX ERROR: ', xhr, resp);
    },

    openProjectDetails: function (e) {
      Backbone.EventBroker.trigger('open-project', this.uuid, e);
    },

    handleVote: function () {
      var self = this;
      self.vote_count++;
      self.voted = true;
      self.$el.find('.new-vote-count-container > span').html(self.vote_count);
      self.$el.find('.vote-master-container').addClass('voted');

      var project = new Project();
      project.vote({uuid: self.uuid, user_uuid: this.currentUser.get('uuid')});
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
      this.domains = data.domains || [];
      this.seeking = data.seeking || [];
      this.upForGrabs = data.up_for_grabs || false;

      this.MAX_TAGS = 6 - this.domains.length;
    },

    hoverOn: function () {
      this.$seekingContainer.css('opacity', '1');
      this.$date.css('opacity', '1');
    },

    hoverOff: function () {
      this.$seekingContainer.css('opacity', '0');
      this.$date.css('opacity', '0');
      this.collapseTags();
    },

    showBubble: function () {
      if (!this.bubbleShown) {
        this.$el.find('.user-info-bubble').show();
        this.bubbleShown = true;
      }
    },

    hideBubble: function () {
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
        Backbone.EventBroker.trigger('pull-project', self.uuid);
      });

      this.$el.find('.tag-containers').hover(function () {
        self.expandTags();
      }, function () {
      });
    },

    expandTags: function () {
      var self = this;
      this.tagsExpanded = true;

      if (this.safari) {
        _.each(this.tagsToShow, function (element) {
          $(element).transition({width: 'auto'}, 285);
        });
      } else {
        _.each(this.tagsToShow, function (element) {
          var prevWidth = element.style.width;
          element.style.width = 'auto';
          var endWidth = getComputedStyle(element).width;
          element.style.width = prevWidth;
          element.offsetWidth;
          element.style.transition = 'width .285s';
          element.style.width = endWidth;
        });
      }

      if (!_.isEmpty(this.tagsToHide)) {
        setTimeout(function () {
          _.each(self.tagsToHide, function (element) {
            $(element).parent().css('display', 'none');
          });
          self.$moreTagsContainer.css('display', 'inline-block');
        }, 100);
      }
    },

    collapseTags: function () {
      var self = this;

      if (this.tagsExpanded) {

        if (this.safari) {
          _.each(this.tagsToShow, function (element) {
            $(element).transition({width: 0}, 285);
          });
        } else {
          _.each(this.tagsToShow, function (element) {
            element.style.width = getComputedStyle(element).width;
            element.style.transition = 'width .285s';
            element.offsetWidth;
            element.style.width = '0px';
          });
        }

        if (!_.isEmpty(this.tagsToHide)) {
          setTimeout(function () {
            self.$moreTagsContainer.css('display', 'none');
            _.each(self.tagsToHide, function (element) {
              $(element).parent().css('display', 'inline-block');
            });
          }, 100);
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

      this.decideWhichTagsWillBeHiddenOnExpand();

    },

    decideWhichTagsWillBeHiddenOnExpand: function () {
      var $allTagNames = this.$el.find('.tag-name');
      this.tagsToShow = $allTagNames.slice(0, this.MAX_TAGS);
      this.tagsToHide = $allTagNames.slice(this.MAX_TAGS);

      if (this.tagsToHide.length == 0) {
        this.tagsToHide = [];
      }
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
        searchResult: self.searchResult,
        projectType: self.projectType,
        userPic: self.owner_pic,
        voted: self.voted,
        hasTags: correctedLangsFramesArray.length > 0,
        hasDomain: !_.isEmpty(self.domains),
        domains: self.domains.join(',  '),
        showContribsCount: self.status == OSUtil.PROJECT_TYPES.indexOf('ideas') && !self.upForGrabs,
        upForGrabs: self.upForGrabs,
        hasSeeking: !_.isEmpty(self.seeking),
        seeking: self.seeking.join(',  ')
      }));

      this.trigger('addTags', this);
      this.$seekingContainer = this.$el.find('.post-seeking-container');
      this.$date = this.$el.find('.project-extra-details-container .date');
      this.addListeners();

      this.$el.find('.project-post-subtitle-text').linkify({
        target: '_blank'
      });

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
