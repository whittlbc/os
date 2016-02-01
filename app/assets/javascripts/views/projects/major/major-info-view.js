define(['jquery',
  'backbone',
  'underscore',
  'models/os.util',
  'views/os.view',
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
   OSView,
   Project,
   AllLangs,
   MoreDropdown,
   MajorInfoViewTpl) {
  'use strict';

  var MajorInfoView = OSView.extend({

    postInitialize: function () {
      this.getAllLanguages();
      this.descriptionMaxHeight = 135;

      Backbone.EventBroker.register({
        're-render-for-cancel-edit-mode': 'cancelEditMode',
      }, this);
    },

    getAllLanguages: function () {
      this.allLangs = AllLangs.getAll();
      this.dropdownItems = this.allLangs.dropdown_items;
      this.allFrames = this.allLangs.all_frames;
      this.colors_and_initials = this.allLangs.colors_and_initials;
    },

    events: {
      'click .see-all-description': 'handleToggleDescriptionSize',
      'click .project-page-vote-container': 'checkIfUserAuthed',
      'click .join-btn': 'checkAuthedStatusOnMajorActionBtnClick',
      'click .star': 'loginOrStar',
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
      } else if (this.upForGrabsType) {
        Backbone.EventBroker.trigger('pull-project', this.uuid);
      } else if (!this.pendingProjectRequest && !this.isContributor) {
        Backbone.EventBroker.trigger('project:join');
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

    loginOrStar: function () {
      Backbone.EventBroker.trigger('project:login-or-star', this);
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
      Backbone.EventBroker.trigger('project:vote', this);
    },

    handleVote: function () {
      var self = this;
      this.voted = true;
      var oldVote = Number(this.$el.find('.new-vote-count-container > span').html());
      this.$el.find('.new-vote-count-container > span').html(oldVote + 1);
      this.$el.find('.project-page-vote-container').addClass('voted');

      var project = new Project();
      project.vote({uuid: self.uuid, user_uuid: this.currentUser.get('uuid')}, {
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
      this.$el.find('p.none').hide();
    },

    showLessDescription: function () {
      this.$descriptionContainer.dotdotdot({
        height: this.descriptionMaxHeight,
        after: '.see-all-description'
      });
      this.$el.find('.see-all-description').html('See All');
      this.$el.find('.see-all-description').css('margin-left', '0');
      this.$el.find('p.none').hide();
    },

    addTags: function (options) {
      this.addDomainTags((options.domains || []), (options.langs_and_frames || []));
      this.addLangFrameTags(options.langs_and_frames || []);
      this.addSeekingTags(options.seeking || []);
    },

    addDomainTags: function (domains, langsFrames) {
      var bothTagsContainerWidth = this.$el.find('.major-info-tag-container').width();
      var $domainTagContent = this.$el.find('.domain-tags-content');
      var content = '';
      var domainTagsWidth = 0;
      var domainIconWith = 28;
      var extraTags = [];
      var maxWidth = _.isEmpty(langsFrames) ? 0.95 : 0.5;

      for (var i = 0; i < domains.length; i++) {
        if (((domainTagsWidth + domainIconWith + 100)/ bothTagsContainerWidth) > maxWidth) {
          extraTags.push(domains[i]);

          if (i === domains.length - 1) {
            this.populateMoreDomainTagsDropdown(extraTags);
          }
        } else {
          content += ((i == 0) ? domains[i] : (', ' + domains[i]));
          $domainTagContent.html(content);
          domainTagsWidth = $domainTagContent.outerWidth(true);
        }
      }
    },

    addLangFrameTags: function (langsFrames) {
      var bothTagsContainerWidth = this.$el.find('.major-info-tag-container').width();
      var $langFrameTagContainer = this.$el.find('.lang-frame-tags');
      var langFrameTagsWidth = 21; // start with width of linebreak separating tag containers
      var extraTags = [];

      for (var i = 0; i < langsFrames.length; i++) {
        if (((langFrameTagsWidth + 100) / bothTagsContainerWidth) > 0.5) {
          extraTags.push(langsFrames[i]);

          if (i === langsFrames.length - 1) {
            this.populateMoreLFTagsDropdown(extraTags);
          }
        } else {
          var colors_and_initials = this.allLangs['colors_and_initials'];
          var langFrame = colors_and_initials[langsFrames[i]];
          if (langFrame) {
            var color = langFrame['color'];
            var $tag = $('<div>', {class: 'project-lf-tag'});
            $tag.html('<i class="fa fa-circle" style="color:' + color + '"></i><div class="tag-name">' + langsFrames[i] + '&nbsp;&nbsp;&nbsp;&nbsp;</div>');
            $langFrameTagContainer.append($tag);
            langFrameTagsWidth += $tag.outerWidth(true);
          }
        }
      }
    },

    addSeekingTags: function (seeking) {
      var containerWidth = this.$el.find('.major-info-seeking-tags').width();
      var $seekingTagContent = this.$el.find('.seeking-tags-content');
      var content = '';
      var seekingTagsWidth = 0;
      var seekingIconWith = 28;
      var extraTags = [];

      for (var i = 0; i < seeking.length; i++) {
        if (((seekingTagsWidth + seekingIconWith + 100)/ containerWidth) > 0.95) {
          extraTags.push(seeking[i]);

          if (i === seeking.length - 1) {
            this.populateMoreSeekingTagsDropdown(extraTags);
          }
        } else {
          content += ((i == 0) ? seeking[i] : (', ' + seeking[i]));
          $seekingTagContent.html(content);
          seekingTagsWidth = $seekingTagContent.outerWidth(true);
        }
      }
    },

    populateMoreDomainTagsDropdown: function (extraTags) {
      var self = this;
      var $div = $('<div>', {class: 'more-project-tags-container'});
      var $moreTagsCount = $('<div>', {class: 'more-tags-count'});
      var $moreTagsDropdown = $('<div>', {class: 'more-tags-dropdown'});
      $div.append($moreTagsCount);
      $div.append($moreTagsDropdown);
      this.$el.find('.major-info-domain-tags').append($div);

      $moreTagsCount.html(extraTags.length + ' more');

      this.moreTagsDomainDropdown = new MoreDropdown({
        el: this.$el.find('.major-info-domain-tags .more-tags-dropdown')
      });

      this.moreTagsDomainDropdown.render();
      this.moreTagsDomainDropdown.populate(extraTags);

      $moreTagsCount.hover(function () {
        self.moreTagsDomainDropdown.showDropdown();
      }, function () {
        self.moreTagsDomainDropdown.hideDropdown();
      });
    },

    populateMoreLFTagsDropdown: function (extraTags) {
      var self = this;
      var $div = $('<div>', {class: 'more-project-tags-container'});
      var $moreTagsCount = $('<div>', {class: 'more-tags-count'});
      var $moreTagsDropdown = $('<div>', {class: 'more-tags-dropdown'});
      $div.append($moreTagsCount);
      $div.append($moreTagsDropdown);
      this.$el.find('.lang-frame-tags').append($div);

      $moreTagsCount.html(extraTags.length + ' more');

      this.moreTagsLFDropdown = new MoreDropdown({
        el: this.$el.find('.lang-frame-tags .more-tags-dropdown')
      });

      this.moreTagsLFDropdown.render();
      this.moreTagsLFDropdown.populate(extraTags);

      $moreTagsCount.hover(function () {
        self.moreTagsLFDropdown.showDropdown();
      }, function () {
        self.moreTagsLFDropdown.hideDropdown();
      });
    },

    populateMoreSeekingTagsDropdown: function (extraTags) {
      var self = this;
      var $div = $('<div>', {class: 'more-project-tags-container'});
      var $moreTagsCount = $('<div>', {class: 'more-tags-count'});
      var $moreTagsDropdown = $('<div>', {class: 'more-tags-dropdown'});
      $div.append($moreTagsCount);
      $div.append($moreTagsDropdown);
      this.$el.find('.major-info-seeking-tags').append($div);

      $moreTagsCount.html(extraTags.length + ' more');

      this.moreTagsSeekingDropdown = new MoreDropdown({
        el: this.$el.find('.major-info-seeking-tags .more-tags-dropdown')
      });

      this.moreTagsSeekingDropdown.render();
      this.moreTagsSeekingDropdown.populate(extraTags);

      $moreTagsCount.hover(function () {
        self.moreTagsSeekingDropdown.showDropdown();
      }, function () {
        self.moreTagsSeekingDropdown.hideDropdown();
      });
    },

    showEditMode: function (data) {
      data.editMode = true;
      this.render(data);
    },

    switchToRequestSent: function () {
      var self = this;
      this.$el.find('.join-btn').removeClass('regular').addClass('pending').html('Request Sent');
    },

    checkIfCanSave: function () {
      var titleExists = true;
      var subtitleExists = true;
      var title = this.$el.find('[name="edit-title"]').val();
      var subtitle = this.$el.find('[name="edit-subtitle"]').val();

      if (_.isEmpty(title)) {
        titleExists = false;
        this.$el.find('.no-title-error').show();
      }

      if (_.isEmpty(subtitle)) {
        subtitleExists = false;
        this.$el.find('.no-subtitle-error').show();
      }

      return titleExists && subtitleExists;
    },

    getSavedEditData: function () {
      var data = {
        title: this.$el.find('[name="edit-title"]').val(),
        subtitle: this.$el.find('[name="edit-subtitle"]').val(),
        description: this.$el.find('.edit-description').val(),
        langs_and_frames: this.langsFrames,
        status: Number(this.$el.find('#projectTypeSelection').val())
      };

      // if Up for Grabs
      if (data.status == 0) {
        data.anon = this.$el.find('[name="anon-edit"]').is(':checked');
      } else {
        data.privacy = this.$el.find('[name="privacy-edit"]').is(':checked') ? [OSUtil.OPEN_PRIVACY] : [OSUtil.REQUEST_PRIVACY];
      }

      return data;
    },

    cancelEditMode: function (cachedData) {
      var self = this;
      this.render(cachedData);
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

      if (!_.isEmpty(langFrames)) {
        this.preventAddingMore = true;
        for (var i = 0; i < langFrames.length; i++) {
          this.langFrameSelectize.addItem(langFrames[i]);
        }
        this.preventAddingMore = false;
      }

      this.langsFrames = this.langFrameSelectize.getValue();
    },

    getMajorActionBtnInfo: function (options) {
      // For other button for UFG projects, will need something like:
      //if (options.pending_project_request) {
      //  text = 'pending';
      //  text = 'Request Sent';
      //}
      //else {
      //  text = (options.privacy[0] === OSUtil.OPEN_PRIVACY) ? 'Join' : 'Request to Join';
      //}

      var obj = {};

      if (options.editMode) {
        obj.className = 'regular';
        obj.text = 'Save';
      } else {
        obj.className = 'launched';
        obj.text = (options.status == 0) ? 'Grab' : '<i class="fa fa-check"></i>Launched';
      }

      return obj;
    },

    render: function (options) {
      var self = this;
      options = options || {};

      this.editMode = options.editMode;
      this.uuid = options.uuid;
      this.privacy = options.privacy;
      this.projectStatus = options.status;
      this.voted = options.voted;

      this.upForGrabsType = (options.status == 0);
      this.pendingProjectRequest = options.pending_project_request;
      this.isContributor = options.is_contributor;
      this.title = options.title || '';

      options.domains = ['Academia', 'Mobile', 'Web'];
      options.seeking = ['Contributors', 'Feedback'];

      var hasTags = !_.isEmpty(options.domains) || !_.isEmpty(options.langs_and_frames);

      var majorActionBtnInfo = this.getMajorActionBtnInfo(options);

      this.$el.html(MajorInfoViewTpl({
        title: this.title,
        projectType: options.hasOwnProperty('status') ? OSUtil.GRAMMATICAL_PROJECT_TYPES[options.status] : '',
        subtitle: options.subtitle ? options.subtitle : '',
        description: options.description ? options.description : '',
        voteCount: options.hasOwnProperty('vote_count') ? options.vote_count : '-',
        starred: options.starred,
        voted: options.voted,
        isAdmin: options.is_admin,
        isOwner: options.is_owner,
        editMode: options.editMode,
        upForGrabsType: this.upForGrabsType,
        otf: options.status == 1,
        open: options.privacy && (options.privacy[0] === OSUtil.OPEN_PRIVACY),
        hasTags: hasTags,
        hasLangsFrames: !_.isEmpty(options.langs_and_frames),
        needsLineBreak: !_.isEmpty(options.domains) && !_.isEmpty(options.langs_and_frames),
        hasSeeking: !_.isEmpty(options.seeking),
        majorActionBtnClass: majorActionBtnInfo.className || 'regular',
        majorActionBtnText: majorActionBtnInfo.text,
        isFirefox: $('body').attr('browser') === 'firefox',
        isSafari: $('body').attr('browser') === 'safari'
      }));

      if (this.editMode) {
        this.initLangFramesDropdown(options.langs_and_frames);

        this.$el.find('[name="privacy-edit"]').bootstrapSwitch({
          onText: 'Open',
          offText: 'Request'
        });

        this.$el.find('[name="anon-edit"]').bootstrapSwitch({
          onText: 'Yes',
          offText: 'No'
        });

        //var $projectStatusDropdown = this.$el.find('#projectTypeSelection');
        //$projectStatusDropdown.val(options.status.toString());

        //$projectStatusDropdown.change(function () {
        //  Backbone.EventBroker.trigger('project:edit:change-type', Number($(this).val()));
        //});

        this.$el.find('[name="edit-title"]').keydown(function () {
          self.$el.find('.no-title-error').hide();
        });

        this.$el.find('[name="edit-subtitle"]').keydown(function () {
          self.$el.find('.no-subtitle-error').hide();
        });

      } else {

        if (hasTags) {
          this.addTags(options);
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
        } else {
          this.$el.find('p.none').hide();
        }
      }

      this.$el.find('[data-toggle="tooltip"]').tooltip();

    }
  });

  return MajorInfoView;

});
