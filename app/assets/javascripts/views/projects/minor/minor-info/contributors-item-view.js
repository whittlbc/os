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

        addHoverListeners: function () {
            var self = this;
            this.$el.find('.contributors-item-view-pic').hover(function () {
                if (!self.bubbleShown) {
                    self.$el.find('.contributor-info-bubble').show();
                    self.bubbleShown = true;
                }
            }, function () {
                if (self.bubbleShown) {
                    self.$el.find('.contributor-info-bubble').hide();
                    self.bubbleShown = false;
                }
            });

            this.$el.find('.contributor-info-bubble').hover(function () {
                if (!self.bubbleShown) {
                    self.$el.find('.contributor-info-bubble').show();
                    self.bubbleShown = true;
                }
            }, function () {
                if (self.bubbleShown) {
                    self.$el.find('.contributor-info-bubble').hide();
                    self.bubbleShown = false;
                }
            });
        },

        getTopPos: function () {
            return this.index < 7 ? this.firstRowTopPos : this.secondRowTopPos;
        },

        getRightPos: function () {
            return this.firstColRightPos - (this.index % 7) * 39;
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

            console.log(this.index, this.getTopPos(), this.getRightPos());

            this.$el.find('.contributor-info-bubble')[0].style.top = this.getTopPos() + 'px';
            this.$el.find('.contributor-info-bubble')[0].style.right = this.getRightPos() + 'px';

            this.addHoverListeners();
		}
	});

	return ContributorsItemView;

});
