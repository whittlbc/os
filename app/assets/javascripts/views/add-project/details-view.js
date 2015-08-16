define(['jquery',
	'backbone',
	'underscore',
	'stache!views/add-project/details-view',
    'selectize'
    ], function ($,
     Backbone,
     _,
     DetailsViewTpl) {
	'use strict';

	var DetailsView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

        initLangFramesDropdown: function () {
            var self = this;
            var options = {
                theme: 'links',
                maxItems: null,
                valueField: 'id',
                searchField: 'title',
                options: this.dropdownItems,
                normal: true,
                selectOnTab: true,
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
            this.langFrameSelectize.original = true;
            this.langFrameSelectize.on('item_add', function (value, $item) {
                if (self.allFrames[value] && !_.contains(self.langsFramesValue, self.allFrames[value])){
                    self.langsFramesValue = self.langFrameSelectize.getValue();
                    self.langFrameSelectize.addItem(self.allFrames[value]);
                } else {
                    self.langsFramesValue = self.langFrameSelectize.getValue();
                }
            });
            this.langFrameSelectize.on('item_remove', function (value, $item) {
                self.langsFramesValue = self.langFrameSelectize.getValue();
            });
        },

        initTagsDropdown: function () {
            var self = this;
            var options = {
                theme: 'links',
                maxItems: null,
                valueField: 'id',
                searchField: 'title',
                options: this.tags,
                normal: true,
                selectOnTab: true,
                render: {
                    option: function (data, escape) {
                        return '<div class="option title">' + escape(data.title) + '</div>';
                    },
                    item: function (data, escape) {
                        return '<div class="item">' + escape(data.title) + '</div>';
                    }
                }
            };

            var $tagsSelect = this.$el.find('#add-project-tags-selection').selectize(options);
            var tagsSelectize = $tagsSelect[0].selectize;
            this.tagsSelectize = tagsSelectize;
            this.tagsSelectize.original = true;
        },

        checkIfShowRepoNameAndLicense: function () {
            return ((this.selectedType == this.typeMap['on-the-fence'] && this.selectedSource != this.sourceMap['pull-from-ideas']) || this.selectedType == this.typeMap['launched']);
        },

        resetInfo: function () {
            var self = this;
            this.langFrameSelectize.clear();
            this.tagsSelectize.clear();
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

            var hideDetailsView = options && options.hideDetailsView;

            this.$el.html(DetailsViewTpl({
                onTheFenceOrLaunchedNoPullFromIdeas: this.checkIfShowRepoNameAndLicense(),
                launched: this.selectedType == this.typeMap['launched'],
                hideDetailsView: hideDetailsView
            }));

            if (!hideDetailsView) {
                this.$el.css('min-height', '370px');
            }

            if (this.dropdownItems && options && !options.hideDetailsView) {
                this.initLangFramesDropdown();
            }

            this.tags = [
                {
                    "id": "iOS",
                    "title": "iOS"
                },
                {
                    "id": "Boss Shit",
                    "title": "Boss Shit"
                }
            ];

            if (this.tags && options && !options.hideDetailsView) {
                this.initTagsDropdown();
            }

		}
	});

	return DetailsView;

});
