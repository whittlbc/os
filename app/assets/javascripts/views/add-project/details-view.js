define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
	'stache!views/add-project/details-view',
    'selectize',
    'velocity'
    ], function ($,
     Backbone,
     _,
     OSUtil,
     DetailsViewTpl) {
	'use strict';

	var DetailsView = Backbone.View.extend({

		initialize: function () {
            this.toggleDescriptionSizeDuration = 275;
            this.licenseItems = [
                {
                    "id": "MIT",
                    "title": "MIT"
                },
                {
                    "id": "GPL",
                    "title": "GPL"
                },
                {
                    "id": "BSD",
                    "title": "BSD"
                }
            ];
		},

		events: {
            'focus [name=add-project-description]': 'expandDescription',
            'blur [name=add-project-description]': 'contractDescription',
            'click .add-project-privacy-choice': 'handlePrivacySelection',
            'blur [name=add-project-title]': 'handleTitleBlur',
            'blur [name=add-project-repo-name]': 'handleRepoNameBlur',
            'click .add-project-anon-choice': 'handleAnonSelection',
        },

        handleTitleBlur: function (e) {
            this.title = $(e.currentTarget).val();
            Backbone.EventBroker.trigger('title:updated', this.title);
        },

        handleRepoNameBlur: function (e) {
            this.repoName = $(e.currentTarget).val();
            Backbone.EventBroker.trigger('repoName:updated', this.repoName);
        },

        handlePrivacySelection: function (e) {
            if (!$(e.currentTarget).hasClass('active-privacy')) {
                ($(e.currentTarget).attr('name') == OSUtil.REQUEST_PRIVACY) ? this.switchToRequest() : this.switchToOpen();
            }
        },

        handleAnonSelection: function (e) {
            if (!$(e.currentTarget).hasClass('active-anon')) {
                ($(e.currentTarget).attr('name') == 'anon-yes') ? this.switchToAnon() : this.switchToKnown();
            }
        },

        switchToOpen: function () {
            this.$el.find('[name=request]').removeClass('active-privacy');
            this.$el.find('[name=open]').addClass('active-privacy');
            this.privacy = OSUtil.OPEN_PRIVACY;
            Backbone.EventBroker.trigger('privacy:updated', this.privacy);
        },

        switchToRequest: function () {
            this.$el.find('[name=open]').removeClass('active-privacy');
            this.$el.find('[name=request]').addClass('active-privacy');
            this.privacy = OSUtil.REQUEST_PRIVACY;
            Backbone.EventBroker.trigger('privacy:updated', this.privacy);
        },

        switchToKnown: function () {
            this.$el.find('[name=anon-yes]').removeClass('active-anon');
            this.$el.find('[name=anon-no]').addClass('active-anon');
            this.anon = false;
            Backbone.EventBroker.trigger('anon:updated', this.anon);
        },

        switchToAnon: function () {
            this.$el.find('[name=anon-no]').removeClass('active-anon');
            this.$el.find('[name=anon-yes]').addClass('active-anon');
            this.anon = true;
            Backbone.EventBroker.trigger('anon:updated', this.anon);
        },

        expandDescription: function (e) {
            var self = this;
            $(e.currentTarget).velocity({height: 220}, {duration: self.toggleDescriptionSizeDuration});
        },

        contractDescription: function (e) {
            var self = this;
            $(e.currentTarget).velocity({height: 90}, {duration: self.toggleDescriptionSizeDuration});
            this.description = $(e.currentTarget).val();
            Backbone.EventBroker.trigger('description:updated', this.description);
        },

        adjustHeightOfParent: function () {
            var inputHeight = this.$el.find('.selectize-control.multi').height();
            this.$el.find('.add-project-langs-frames-container').height(inputHeight+38);
        },

        initLangFramesDropdown: function () {
            var self = this;
            var options = {
                theme: 'links',
                maxItems: null,
                valueField: 'id',
                searchField: 'title',
                options: this.dropdownItems,
                onBlur: function () {
                    self.langsFrames = self.langFrameSelectize.getValue();
                    Backbone.EventBroker.trigger('langsFrames:updated', self.langsFrames);
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
            var $langFrameSelect = this.$el.find('#add-project-langs-frames-selection').selectize(options);
            var langFrameSelectize = $langFrameSelect[0].selectize;
            this.langFrameSelectize = langFrameSelectize;
            this.langFrameSelectize.on('item_add', function (value, $item) {
                if (self.allFrames[value] && !_.contains(self.langsFramesValue, self.allFrames[value])){
                    self.langsFramesValue = self.langFrameSelectize.getValue();
                    self.langFrameSelectize.addItem(self.allFrames[value]);
                } else {
                    self.langsFramesValue = self.langFrameSelectize.getValue();
                }
                self.adjustHeightOfParent();
            });
            this.langFrameSelectize.on('item_remove', function (value, $item) {
                self.langsFramesValue = self.langFrameSelectize.getValue();
                self.adjustHeightOfParent();
            });
        },

        initLicenseDropdown: function () {
            var self = this;
            var options = {
                theme: 'links',
                maxItems: 1,
                valueField: 'id',
                searchField: 'title',
                options: this.licenseItems,
                onBlur: function () {
                    self.license = self.licenseSelectize.getValue();
                    Backbone.EventBroker.trigger('license:updated', self.license);
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
            var $licenseSelect = this.$el.find('#add-project-license-selection').selectize(options);
            var licenseSelectize = $licenseSelect[0].selectize;
            this.licenseSelectize = licenseSelectize;
            this.licenseSelectize.on('item_add', function () {
                self.licenseValue = self.licenseSelectize.getValue();
            });
            this.licenseSelectize.on('item_remove', function () {
                self.licenseValue = self.licenseSelectize.getValue();
            });
        },

        //initTagsDropdown: function () {
        //    var self = this;
        //    var options = {
        //        theme: 'links',
        //        maxItems: null,
        //        valueField: 'id',
        //        searchField: 'title',
        //        options: this.tags,
        //        normal: true,
        //        selectOnTab: false,
        //        render: {
        //            option: function (data, escape) {
        //                return '<div class="option title">' + escape(data.title) + '</div>';
        //            },
        //            item: function (data, escape) {
        //                return '<div class="item">' + escape(data.title) + '</div>';
        //            }
        //        }
        //    };
        //
        //    var $tagsSelect = this.$el.find('#add-project-tags-selection').selectize(options);
        //    var tagsSelectize = $tagsSelect[0].selectize;
        //    this.tagsSelectize = tagsSelectize;
        //    this.tagsSelectize.original = true;
        //},

        checkIfShowRepoNameAndLicense: function () {
            return ((this.selectedType == OSUtil.TYPE_MAP['on-the-fence'] && this.selectedSource != OSUtil.SOURCE_MAP['pull-from-ideas']) || this.selectedType == OSUtil.TYPE_MAP['launched']);
        },

        resetInfo: function () {
            var self = this;
            this.langFrameSelectize.clear();
            //this.tagsSelectize.clear();
        },

        setRepoInfo: function (data) {
            var self = this;
            this.$el.find('[name=add-project-title]').val(data.description);
            this.$el.find('[name=add-project-repo-name]').val(data.name);
            for (var i = 0; i < data.languages.length; i++) {
                this.langFrameSelectize.addItem(data.languages[i]);
            }
            this.title = data.description; // most relevant actually to be the title
            this.langsFrames = data.languages;
            this.repoName = data.name;
        },

        passLangDropdownItems: function (data) {
            this.dropdownItems = data.dropdown_items;
            this.allFrames = data.all_frames;
        },

        passTags: function (data) {
            this.tags = data;
        },

        passType: function (type) {
            this.selectedType = type;
        },

        allowCreate: function () {
            // will need to show validation shit if not everything filled in
            return true;
        },

        getData: function () {
            return {
                title: this.title,
                description: this.description,
                langsFrames: this.langsFrames,
                repoName: this.repoName,
                license: this.license,
                privacy: this.privacy,
                anon: this.anon
            };
        },

        render: function (options) {
			var self = this;

            if (options && options.selectedSource) {
                this.selectedSource = options.selectedSource;
            }

            this.title = (options && options.projectData) ? options.projectData.title : null;
            this.description = (options && options.projectData) ? options.projectData.description : null;
            this.langsFrames = (options && options.projectData) ? options.projectData.langsFrames : null;
            this.repoName = (options && options.projectData) ? options.projectData.repoName : null;
            this.license = (options && options.projectData) ? options.projectData.license : null;
            this.privacy = (options && options.projectData) ? options.projectData.privacy : OSUtil.REQUEST_PRIVACY;
            if (this.privacy == null) {
                this.privacy = OSUtil.REQUEST_PRIVACY;
            }
            this.anon = (options && options.projectData) ? options.projectData.anon : false;

            var hideDetailsView = options && options.hideDetailsView;

            var showRepoNameAndLicense = this.checkIfShowRepoNameAndLicense();

            this.$el.html(DetailsViewTpl({
                onTheFenceOrLaunchedNoPullFromIdeas: showRepoNameAndLicense,
                launched: this.selectedType == OSUtil.TYPE_MAP['launched'],
                hideDetailsView: hideDetailsView,
                title: this.title,
                description: this.description,
                repoName: this.repoName,
                requestPrivacy: this.privacy != OSUtil.OPEN_PRIVACY,
                openPrivacy: this.privacy == OSUtil.OPEN_PRIVACY,
                showAnon: this.selectedType == OSUtil.TYPE_MAP['up-for-grabs'],
                postAnon: this.anon
            }));

            if (this.dropdownItems && options && !options.hideDetailsView) {
                this.initLangFramesDropdown();
                if (this.langsFrames != null) {
                    for (var i = 0; i < this.langsFrames.length; i++) {
                        this.langFrameSelectize.addItem(this.langsFrames[i]);
                    }
                }
            }

            if (options && !options.hideDetailsView && showRepoNameAndLicense) {
                this.initLicenseDropdown();
                if (this.license != null) {
                    this.licenseSelectize.addItem(this.license);
                }
            }

            //this.tags = [
            //    {
            //        "id": "iOS",
            //        "title": "iOS"
            //    },
            //    {
            //        "id": "Boss Shit",
            //        "title": "Boss Shit"
            //    }
            //];
            //
            //if (this.tags && options && !options.hideDetailsView) {
            //    this.initTagsDropdown();
            //}

		}
	});

	return DetailsView;

});
