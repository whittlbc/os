define(['jquery',
	'backbone',
	'underscore',
    'views/widgets/user-info-bubble',
    'stache!views/projects/minor/minor-info/contributors-item-view'
    ], function ($,
     Backbone,
     _,
     UserInfoBubble,
     ContributorsItemViewTpl) {
	'use strict';

	var ContributorsItemView = Backbone.View.extend({

		initialize: function (options) {
            this.firstRowTopPos = -103;
            this.secondRowTopPos = -60;
            this.firstColRightPos = 228;
            if (options) {
                this.setPropsFromOptions(options);
            }
		},

        setPropsFromOptions: function (options) {
            this.ghUsername = options.ghUsername;
            this.admin = options.admin;
            this.pic = options.pic;
            this.index = options.index;
        },

		events: {},

        showBubble: function () {
            var self = this;
            if (!this.bubbleShown) {
                this.$el.find('.contributor-info-bubble').show();
                this.bubbleShown = true;
            }
        },

        hideBubble: function () {
            var self = this;
            if (this.bubbleShown) {
                this.$el.find('.contributor-info-bubble').hide();
                this.bubbleShown = false;
            }
        },

        addHoverListeners: function () {
            var self = this;
            this.$el.find('.contributors-item-view-pic').hover(function () {
                self.showBubble();
            }, function () {
                self.hideBubble();
            });

            this.$el.find('.contributor-info-bubble').hover(function () {
                self.showBubble();
            }, function () {
                self.hideBubble();
            });

        },

        getTopPos: function () {
            return this.index < 7 ? this.firstRowTopPos : this.secondRowTopPos;
        },

        getRightPos: function () {
            return this.firstColRightPos - (this.index % 7) * 43;
        },

		render: function () {
			var self = this;
            this.$el.html(ContributorsItemViewTpl({
                ghUsername: this.ghUsername,
                admin: this.admin,
                pic: this.pic
            }));

            this.contributorInfoBubble = new UserInfoBubble({
                el: this.$el.find('.contributor-info-bubble')
            });
            this.contributorInfoBubble.render({
                userPic: self.pic,
                ghUsername: self.ghUsername
            });

            this.$el.find('.contributor-info-bubble')[0].style.top = this.getTopPos() + 'px';
            this.$el.find('.contributor-info-bubble')[0].style.right = this.getRightPos() + 'px';

            this.addHoverListeners();
		}
	});

	return ContributorsItemView;

});
