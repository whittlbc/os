define(['jquery',
	'backbone',
	'underscore',
	'stache!views/add-project/details-view',
    'selectize',
    'velocity'
    ], function ($,
     Backbone,
     _,
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

        },

        handleTitleBlur: function (e) {
            Backbone.EventBroker.trigger('title:updated', $(e.currentTarget).val());
        },

        handleRepoNameBlur: function (e) {
            Backbone.EventBroker.trigger('repoName:updated', $(e.currentTarget).val());
        },

        handlePrivacySelection: function (e) {
            if (!$(e.currentTarget).hasClass('active-privacy')) {
                ($(e.currentTarget).attr('name') == 'request') ? this.switchToRequest() : this.switchToOpen();
            }
        },

        switchToOpen: function () {
            this.$el.find('[name=request]').removeClass('active-privacy');
            this.$el.find('[name=open]').addClass('active-privacy');
            Backbone.EventBroker.trigger('privacy:updated', 'open');
        },

        switchToRequest: function () {
            this.$el.find('[name=open]').removeClass('active-privacy');
            this.$el.find('[name=request]').addClass('active-privacy');
            Backbone.EventBroker.trigger('privacy:updated', 'request');
        },

        expandDescription: function (e) {
            var self = this;
            $(e.currentTarget).velocity({height: 220}, {duration: self.toggleDescriptionSizeDuration});
        },

        contractDescription: function (e) {
            var self = this;
            $(e.currentTarget).velocity({height: 90}, {duration: self.toggleDescriptionSizeDuration});
            Backbone.EventBroker.trigger('description:updated', $(e.currentTarget).val());
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
                    Backbone.EventBroker.trigger('langsFrames:updated', self.langFrameSelectize.getValue());
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
                    Backbone.EventBroker.trigger('license:updated', self.licenseSelectize.getValue());
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
            return ((this.selectedType == this.typeMap['on-the-fence'] && this.selectedSource != this.sourceMap['pull-from-ideas']) || this.selectedType == this.typeMap['launched']);
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
            this.privacy = (options && options.projectData) ? options.projectData.privacy : null;

            var hideDetailsView = options && options.hideDetailsView;

            var showRepoNameAndLicense = this.checkIfShowRepoNameAndLicense();

            this.$el.html(DetailsViewTpl({
                onTheFenceOrLaunchedNoPullFromIdeas: showRepoNameAndLicense,
                launched: this.selectedType == this.typeMap['launched'],
                hideDetailsView: hideDetailsView,
                title: this.title,
                description: this.description,
                repoName: this.repoName,
                requestPrivacy: this.privacy != 'open',
                openPrivacy: this.privacy == 'open'
            }));

            if (!hideDetailsView) {
                this.$el.css('min-height', '370px');
            }

            if (this.dropdownItems && options && !options.hideDetailsView) {
                this.initLangFramesDropdown();
            }

            if (options && !options.hideDetailsView && showRepoNameAndLicense) {
                this.initLicenseDropdown();
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
