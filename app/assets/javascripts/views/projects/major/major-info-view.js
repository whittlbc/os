define(['jquery',
  'backbone',
  'underscore',
  'models/os.util',
  'models/project',
  'models/all-langs',
  'views/widgets/more-dropdown/more-dropdown',
  'stache!views/projects/major/major-info-view',
  'dotdotdot',
  'selectize',
  'toggle',
  'backbone-eventbroker'
], function ($,
   Backbone,
   _,
   OSUtil,
   Project,
   AllLangs,
   MoreDropdown,
   MajorInfoViewTpl) {
  'use strict';

  var MajorInfoView = Backbone.View.extend({

    initialize: function () {
      this.allLangs = AllLangs.getAll();
      this.descriptionMaxHeight = 135;
      Backbone.EventBroker.register({
        're-render-for-cancel-edit-mode': 'cancelEditMode'
      }, this);
    },

    events: {
      'click .see-all-description': 'handleToggleDescriptionSize',
      'click .project-page-vote-container': 'checkIfUserAuthed',
      'click .join-btn': 'checkAuthedStatusOnMajorActionBtnClick',
      'click .star': 'handleStarProject',
      'click .edit-btn': 'handleProjectEdit',
      'click .delete-btn': 'handleProjectDelete',
      'click .cancel-edit-mode': 'handleCancelEditMode',
      'click #reddit': 'handleRedditShareClick',
      'click #twitter': 'handleTwitterShareClick',
      'click #facebook': 'handleFacebookShareClick',
      'click #hackerNews': 'handleHackerNewsShareClick',
      'click .launch-btn': 'handleLaunchProject'
    },

    handleLaunchProject: function () {
      Backbone.EventBroker.trigger('project:confirm-launch');
    },

    handleRedditShareClick: function () {
      window.open("http:\/\/reddit.com\/submit?url=" + encodeURIComponent(window.location) + "&title=" + encodeURIComponent(this.title));
    },

    handleTwitterShareClick: function () {
      window.open("http:\/\/twitter.com\/intent\/tweet?url=" + encodeURIComponent(window.location));
    },

    handleFacebookShareClick: function () {
      window.open("http:\/\/www.facebook.com\/dialog\/share?app_id=846135902169770\u0026href=" + encodeURIComponent(window.location) + "\u0026display=popup\u0026redirect_uri=" + encodeURIComponent(window.location));
    },

    handleHackerNewsShareClick: function () {
      window.open("http:\/\/news.ycombinator.com\/submitlink?u=" + encodeURIComponent(window.location) + "&t=" + encodeURIComponent(this.title));
    },

    handleCancelEditMode: function () {
      Backbone.EventBroker.trigger('edit-mode:cancel');
    },

    checkAuthedStatusOnMajorActionBtnClick: function () {
      Backbone.EventBroker.trigger('project:major-action-btn-clicked', {
        view: this,
        status: this.projectStatus
      });
    },

    handleProjectMajorActionBtnClick: function () {
      if (this.editMode) {
        Backbone.EventBroker.trigger('project:save-edit');
      } else {
        if (!this.pendingProjectRequest && !this.isContributor) {
          this.upForGrabsType ? Backbone.EventBroker.trigger('pull-project', this.projectID) : Backbone.EventBroker.trigger('project:join');
        }
      }
    },

    handleProjectEdit: function () {
      var self = this;
      this.trigger('project:edit');
    },

    handleProjectDelete: function () {
      var self = this;
      Backbone.EventBroker.trigger('project:delete');
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

    checkIfUserAuthed: function () {
      Backbone.EventBroker.trigger('project:vote', {view: this, projectID: this.projectID});
    },

    handleVote: function (userUUID) {
      var self = this;
      var oldVote = Number(this.$el.find('.new-vote-count-container > span').html());
      this.$el.find('.new-vote-count-container > span').html(oldVote + 1);
      this.$el.find('.project-page-vote-container').addClass('voted');
      var project = new Project();
      project.vote({project_uuid: self.uuid, user_uuid: userUUID}, {
        success: function (data) {
          Backbone.EventBroker.trigger('updateUpvotedProjectsArray', data);
        }
      });
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
      var $tagContainer = this.$el.find('.major-info-tag-container');
      var tagContainerWidth = $tagContainer.width();
      var tagsWidth = 0;
      var extraTags = [];

      if (Array.isArray(langsFrames)) {
        for (var i = 0; i < langsFrames.length; i++) {
          if (tagContainerWidth - tagsWidth < 100) {
            extraTags.push(langsFrames[i]);

            if (i === langsFrames.length - 1) {
              this.populatMoreTagsDropdown(extraTags);
            }
          } else {
            var $tag = $('<div>', {
              class: 'major-info-tag'
            });
            $tag.html(langsFrames[i]);
            var colors_and_initials = this.allLangs['colors_and_initials'];
            var langFrame = colors_and_initials[langsFrames[i]];
            if (langFrame) {
              var color = langFrame['color'];
              $tag.css({
                color: color,
                border: '2px solid ' + color
              });
              $tagContainer.append($tag);
              tagsWidth += $tag.outerWidth(true);
            }
          }
        }
      }
    },

    populatMoreTagsDropdown: function (extraTags) {
      var self = this;
      var $div = $('<div>', {class: 'more-project-tags-container'});
      var $moreTagsCount = $('<div>', {class: 'more-tags-count'});
      var $moreTagsDropdown = $('<div>', {class: 'more-tags-dropdown'});
      $div.append($moreTagsCount);
      $div.append($moreTagsDropdown);
      this.$el.find('.major-info-tag-container').append($div);

      $moreTagsCount.html(extraTags.length + ' more');

      this.moreTagsDropdown = new MoreDropdown({
        el: this.$el.find('.more-tags-dropdown')
      });

      this.moreTagsDropdown.render();
      this.moreTagsDropdown.populate(extraTags);

      $moreTagsCount.hover(function () {
        self.moreTagsDropdown.showDropdown();
      }, function () {
        self.moreTagsDropdown.hideDropdown();
      });
    },

    showEditMode: function (data) {
      var self = this;
      data.editMode = true;
      this.render(data);
    },

    switchToRequestSent: function () {
      var self = this;
      this.$el.find('.join-btn').removeClass('regular').addClass('pending').html('Request Sent');
    },

    getSavedEditData: function () {
      var self = this;
      var data = {
        title: this.$el.find('[name="edit-title"]').val(),
        subtitle: this.$el.find('[name="edit-subtitle"]').val(),
        description: this.$el.find('.edit-description').val(),
        langs_and_frames: this.langsFrames,
        status: Number(this.$el.find('#projectTypeSelection').val()),
        privacy: this.$el.find('[name="privacy-edit"]').is(':checked') ? [OSUtil.OPEN_PRIVACY] : [OSUtil.REQUEST_PRIVACY]
      };
      if (this.upForGrabsType) {
        data.anon = this.$el.find('[name="anon-edit"]').is(':checked');
      }
      return data;
    },

    cancelEditMode: function (cachedData) {
      var self = this;
      this.render(cachedData);
    },

    passLanguages: function (data) {
      this.dropdownItems = data.dropdown_items;
      this.allFrames = data.all_frames;
      this.colors_and_initials = data.colors_and_initials;
    },

    initLangFramesDropdown: function (langFrames) {
      var self = this;
      var options = {
        theme: 'links',
        maxItems: null,
        valueField: 'id',
        searchField: 'title',
        options: this.dropdownItems,
        onBlur: function () {
          self.langsFrames = self.langFrameSelectize.getValue();
        },
        selectOnTab: false,
        render: {
          option: function (data, escape) {
            return '<div class="option title">' + escape(data.title) + '</div>';
          },
          item: function (data, escape) {
            return '<div class="item">' + escape(data.title) + '</div>';
          }
        }
      };
      var $langFrameSelect = this.$el.find('#editLangFrames').selectize(options);
      this.langFrameSelectize = $langFrameSelect[0].selectize;

      this.langFrameSelectize.on('item_add', function (value, $item) {
        $item.css('color', self.colors_and_initials[value]['color']);
        $item.css('border', '2px solid ' + self.colors_and_initials[value]['color']);

        if (!self.preventAddingMore && self.allFrames[value] && !_.contains(self.langsFramesValue, self.allFrames[value])) {
          self.langsFrames = self.langFrameSelectize.getValue();
          self.langFrameSelectize.addItem(self.allFrames[value]);
        } else {
          self.langsFrames = self.langFrameSelectize.getValue();
        }
      });

      this.preventAddingMore = true;
      for (var i = 0; i < langFrames.length; i++) {
        this.langFrameSelectize.addItem(langFrames[i]);
      }
      this.preventAddingMore = false;

      this.langsFrames = this.langFrameSelectize.getValue();
    },

    render: function (options) {
      var self = this;
      options = options || {};

      this.editMode = options.editMode;
      this.uuid = options.uuid;
      this.projectID = options.id;
      this.privacy = options.privacy;
      this.projectStatus = options.status;

      this.upForGrabsType = (options.status == 0);
      this.pendingProjectRequest = options.pending_project_request;
      this.isContributor = options.is_contributor;
      this.title = options.title || '';

      var hasTags = !_.isEmpty(options.langs_and_frames);

      this.$el.html(MajorInfoViewTpl({
        title: this.title,
        projectType: options.hasOwnProperty('status') ? OSUtil.GRAMMATICAL_PROJECT_TYPES[options.status] : '',
        subtitle: options.subtitle ? options.subtitle : '',
        description: options.description ? options.description : '',
        voteCount: options.hasOwnProperty('vote_count') ? options.vote_count : '-',
        joinText: options.privacy[0] === OSUtil.OPEN_PRIVACY ? 'Join' : 'Request to Join',
        starred: options.starred,
        voted: options.voted,
        isAdmin: options.is_admin,
        isOwner: options.is_owner,
        isContributor: options.is_contributor,
        pendingProjectRequest: options.pending_project_request,
        editMode: options.editMode,
        upForGrabsType: this.upForGrabsType,
        otf: options.status == 1,
        open: options.privacy[0] === OSUtil.OPEN_PRIVACY,
        anon: options.anon === true,
        hasTags: hasTags
      }));

      if (!this.editMode) {
        if (hasTags) {
          this.addTags(options.langs_and_frames);
        }
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

        // if no description, say so
        if (_.isEmpty(options.description)) {
          this.$el.find('p.none').show();
        }

      } else {
        this.initLangFramesDropdown(options.langs_and_frames);
        this.$el.find('[name="privacy-edit"]').bootstrapSwitch({
          onText: 'Open',
          offText: 'Request'
        });
        if (this.upForGrabsType) {
          this.$el.find('[name="anon-edit"]').bootstrapSwitch({
            onText: 'Yes',
            offText: 'No'
          });
        }
        this.$el.find('#projectTypeSelection').val(options.status.toString());
      }

      this.$el.find('[data-toggle="tooltip"]').tooltip();

    }
  });

  return MajorInfoView;

});
