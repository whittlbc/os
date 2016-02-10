define(['jquery',
  'backbone',
  'underscore',
  'models/os.util',
  'views/os.view',
  'models/project',
  'models/all-langs',
  'views/widgets/more-dropdown/more-dropdown',
  'stache!views/projects/major/major-info-view',
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
      this.formatDomains();
      this.truncated = false;
      this.isSafari = ($('body').attr('browser') === 'safari');

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

    formatDomains: function () {
      this.domainOptions = [];

      for (var key in OSUtil.DOMAIN_FILTERS) {
        this.domainOptions.push(OSUtil.DOMAIN_FILTERS[key]);
      }
    },

    events: {
      'click .see-more-description': 'handleToggleDescriptionSize',
      'click .project-page-vote-container': 'checkIfUserAuthed',
      'click .join-btn': 'checkAuthedStatusOnMajorActionBtnClick',
      'click .star': 'loginOrStar',
      'click .edit-btn': 'handleProjectEdit',
      'click .delete-btn': 'handleProjectDelete',
      'click .cancel-edit-mode': 'handleCancelEditMode',
      'click #reddit': 'handleRedditShareClick',
      'click #twitter': 'handleTwitterShareClick',
      'click #facebook': 'handleFacebookShareClick',
      'click #hackerNews': 'handleHackerNewsShareClick'
    },

    isIdea: function () {
      return this.status == OSUtil.PROJECT_TYPES.indexOf('ideas');
    },

    isLaunched: function () {
      return this.status == OSUtil.PROJECT_TYPES.indexOf('launched');
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
      if (this.majorBtnEvent) {
        Backbone.EventBroker.trigger('project:major-action-btn-clicked', {
          view: this,
          upForGrabs: this.upForGrabs
        });
      }
    },

    handleProjectMajorActionBtnClick: function () {
      Backbone.EventBroker.trigger(this.majorBtnEvent, this.uuid);
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
      project.vote({uuid: self.uuid, user_uuid: this.currentUser.get('uuid')});
    },

    handleToggleDescriptionSize: function () {
      var self = this;

      if (this.isSafari) {
        if (this.truncated) {
          this.showMoreDescription();

          if (!this.hasShownMoreBefore) {
            setTimeout(function () {
              self.hasShownMoreBefore = true;
              self.entireDescriptionHeight = self.$el.find('.major-info-project-description > p').height();
            }, 305);
          }
        } else {
          this.showLessDescription();
        }
      } else {
        this.truncated ? this.showMoreDescription() : this.showLessDescription();
      }
    },

    showMoreDescription: function () {
      var $description = this.$el.find('.major-info-project-description > p');
      var endHeight;

      if (this.entireDescriptionHeight) {
        endHeight = this.entireDescriptionHeight;
      } else {
        var description = $description[0];
        var prevHeight = $description.height();
        $description.height('auto');
        endHeight = getComputedStyle(description).height;
        $description.height(prevHeight);
        description.offsetHeight;
      }

      $description.css({ transition: 'height 0.3s' });
      $description.height(endHeight);
      this.$el.find('.see-more-description').html('See Less');
      this.truncated = false;
    },

    showLessDescription: function () {
      var $description = this.$el.find('.major-info-project-description > p');
      var description = $description[0];
      $description.height(getComputedStyle(description).height);
      description.offsetHeight;
      $description.height(100);
      this.$el.find('.see-more-description').html('See More');
      this.truncated = true;
    },

    addTags: function (options) {
      this.addDomainTags((options.domains || []), (options.langs_and_frames || []));
      this.addLangFrameTags((options.langs_and_frames || []), (options.domains || []));
    },

    addDomainTags: function (domains, langsFrames) {
      var bothTagsContainerWidth = this.$el.find('.major-info-tag-container').width();
      var $domainTagContent = this.$el.find('.domain-tags-content');
      var content = '';
      var domainTagsWidth = 0;
      var extraTags = [];
      var maxWidth = _.isEmpty(langsFrames) ? 0.95 : 0.5;

      for (var i = 0; i < domains.length; i++) {
        if (((domainTagsWidth + 100)/ bothTagsContainerWidth) > maxWidth) {
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

    addLangFrameTags: function (langsFrames, domains) {
      var bothTagsContainerWidth = this.$el.find('.major-info-tag-container').width();
      var $langFrameTagContainer = this.$el.find('.lang-frame-tags');
      var langFrameTagsWidth = 21; // start with width of linebreak separating tag containers
      var extraTags = [];
      var maxWidth = _.isEmpty(domains) ? 0.95 : 0.5;

      for (var i = 0; i < langsFrames.length; i++) {
        if (((langFrameTagsWidth + 100) / bothTagsContainerWidth) > maxWidth) {
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
        domains: this.domains
      };

      // if Up for Grabs
      if (this.isIdea() && this.upForGrabs) {
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

      this.langFrameSelectize.on('item_remove', function () {
        self.langsFrames = self.langFrameSelectize.getValue();
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

    initDomainsDropdown: function (domains) {
      var self = this;
      var options = {
        theme: 'links',
        maxItems: null,
        valueField: 'id',
        searchField: 'title',
        options: this.domainOptions,
        onBlur: function () {
          self.domains = self.domainSelectize.getValue();
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

      var $domainSelect = this.$el.find('#editDomains').selectize(options);
      var domainSelectize = $domainSelect[0].selectize;
      this.domainSelectize = domainSelectize;

      this.domainSelectize.on('item_add', function (value, $item) {
        $item.css('color', '#00A6C9');
        $item.css('border', '2px solid #00A6C9');
        self.domains = self.domainSelectize.getValue();
      });

      this.domainSelectize.on('item_remove', function () {
        self.domains = self.domainSelectize.getValue();
      });

      if (!_.isEmpty(domains)) {
        for (var i = 0; i < domains.length; i++) {
          this.domainSelectize.addItem(domains[i]);
        }
      }

      this.domains = this.domainSelectize.getValue();
    },

    getMajorActionBtnInfo: function (options) {
      var self = this;

      var obj = {
        className: 'regular'
      };

      if (options.editMode) {
        obj.text = 'Save';
        this.majorBtnEvent = 'project:save-edit';
      } else {
        switch (options.status) {
          case OSUtil.PROJECT_TYPES.indexOf('ideas'):
            // UP FOR GRABS
            if (options.up_for_grabs === true) {
              obj.className = 'up-for-grabs';
              obj.text = '<img src="http://sourcehoney.s3-website-us-west-1.amazonaws.com/images/bulb_blue.svg" />Up for Grabs';
            }
            // NOT Up for Grabs
            else {
              if (self.isContributor) {
                if (self.isOwner) {
                  obj.text = 'Launch';
                  self.majorBtnEvent = 'project:confirm-launch';
                } else {
                  obj.className = 'contributor';
                  obj.text = '<i class="fa fa-check"></i>On Team';
                }
              } else if (self.pendingProjectRequest) {
                obj.className = 'pending';
                obj.text = 'Request Sent';
              } else {
                obj.text = ((options.privacy || [])[0] === OSUtil.OPEN_PRIVACY) ? 'Join' : 'Request to Join';
                self.majorBtnEvent = 'project:save-edit';
              }
            }
            break;
          case OSUtil.PROJECT_TYPES.indexOf('launched'):
            obj.className = 'launched';
            obj.text = '<i class="fa fa-check"></i>Launched';
            break;
        }
      }

      return obj;
    },

    determineDescriptionHeight: function () {
      var $description = this.$el.find('.major-info-project-description > p');

      if ($description.height() > 100) {
        $description.height(100);
        this.$el.find('.see-more-description').show();
        this.truncated = true;
      }
    },

    render: function (options) {
      var self = this;
      options = options || {};

      this.editMode = options.editMode;
      this.uuid = options.uuid;
      this.privacy = options.privacy;
      this.voted = options.voted;
      this.status = options.status;
      this.upForGrabs = options.up_for_grabs;
      this.pendingProjectRequest = options.pending_project_request;
      this.isContributor = options.is_contributor;
      this.isOwner = options.is_owner;
      this.title = options.title || '';

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
        isOwner: this.isOwner,
        editMode: options.editMode,
        showPrivacy: this.isIdea() && !this.upForGrabs,
        open: options.privacy && (options.privacy[0] === OSUtil.OPEN_PRIVACY),
        hasTags: hasTags,
        hasLangsFrames: !_.isEmpty(options.langs_and_frames),
        needsLineBreak: !_.isEmpty(options.domains) && !_.isEmpty(options.langs_and_frames),
        majorActionBtnClass: majorActionBtnInfo.className || 'regular',
        majorActionBtnText: majorActionBtnInfo.text,
        isFirefox: $('body').attr('browser') === 'firefox',
        isSafari: $('body').attr('browser') === 'safari'
      }));

      if (this.editMode) {
        this.initLangFramesDropdown(options.langs_and_frames);
        this.initDomainsDropdown(options.domains);

        this.$el.find('[name="privacy-edit"]').bootstrapSwitch({
          onText: 'Open',
          offText: 'Request'
        });

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

        if (_.isEmpty(options.description)) {
          this.$el.find('p.none').show();
        } else {
          this.$el.find('p.none').hide();
          this.determineDescriptionHeight();
        }
      }

      this.$el.find('[data-toggle="tooltip"]').tooltip();

    }
  });

  return MajorInfoView;

});
