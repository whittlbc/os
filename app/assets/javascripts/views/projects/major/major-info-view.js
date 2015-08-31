define(['jquery',
	'backbone',
	'underscore',
    'models/os.util',
    'models/all-langs',
	'stache!views/projects/major/major-info-view',
    'dotdotdot'
    ], function ($,
     Backbone,
     _,
     OSUtil,
     AllLangs,
     MajorInfoViewTpl) {
	'use strict';

	var MajorInfoView = Backbone.View.extend({

		initialize: function () {
            this.allLangs = AllLangs.getAll();
            this.descriptionMaxHeight = 135;
		},

		events: {
            'click .see-all-description': 'handleToggleDescriptionSize'
        },

        handleToggleDescriptionSize: function () {
            this.$descriptionContainer.trigger('destroy');
            this.$descriptionContainer.removeClass('is-truncated');
            this.$descriptionContainer.height(this.descriptionMaxHeight);
            this.$descriptionContainer.css('overflow', 'hidden');
            this.$el.find('.major-info-project-description > p').css('display', 'inline');
            this.$el.find('.see-all-description').html('See Less');
            this.$el.find('.see-all-description').css('margin-left', '8px');
            this.$descriptionContainer.animate({height: this.originalDescriptionHeight}, {duration: 200});
        },

        addTags: function (langsFrames) {
            for (var i = 0; i < langsFrames.length; i++) {
                var $tag = $('<div>', {
                    class: 'major-info-tag'
                });
                $tag.html(langsFrames[i]);
                var colors_and_initials = this.allLangs['colors_and_initials'];
                var langFrame = colors_and_initials[langsFrames[i]];
                if (langFrame) {
                    var color = langFrame['color'];
                    $tag.css('color', color);
                    $tag.css('border', '2px solid ' + color);
                    this.$el.find('.major-info-tag-container').append($tag);
                }
            }
        },

		render: function (options) {
			var self = this;
            this.$el.html(MajorInfoViewTpl({
                title: options && options.title ? options.title : '',
                projectType: options && options.hasOwnProperty('status') ? OSUtil.GRAMMATICAL_PROJECT_TYPES[options.status] : '',
                subtitle: "A JavaScript library designed to be so much better than your ordinary JS library",
                description: options && options.description ? options.description : '',
            }));
            this.addTags(options.langs_and_frames);
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
		}
	});

	return MajorInfoView;

});
