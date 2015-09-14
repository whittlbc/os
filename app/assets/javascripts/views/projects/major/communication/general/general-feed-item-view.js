define(['jquery',
	'backbone',
	'underscore',
    'views/projects/major/communication/communication-feed-item-view',
    'views/widgets/user-info-bubble',
    'models/project',
    'stache!views/projects/major/communication/general/general-feed-item-view'
    ], function ($,
     Backbone,
     _,
     CommunicationFeedItemView,
     UserInfoBubble,
     Project,
     GeneralFeedItemViewTpl) {
	'use strict';

	var GeneralFeedItemView = CommunicationFeedItemView.extend({

		initialize: function () {
		},

		events: {
        },

        handleCommentVote: function () {
            var self = this;
            var newVoteCount = Number(this.$el.find('.comment-vote-count').html())+1;
            this.$el.find('.comment-vote-count').html(newVoteCount);
            var project = new Project();
            console.log(this.id);
            project.commentVote({id: this.id, new_vote_count: newVoteCount});
        },

        setData: function (data) {
            this.userPic = data.userPic;
            this.posterGHUsername = data.posterGHUsername;
            this.voteCount = data.voteCount;
            this.postTime = data.postTime;
            this.text = data.text;
            this.id = data.id;
            this.parentID = data.parentID;
        },

        addHoverListeners: function () {
            var self = this;

            this.$el.find('.comment-poster-pic').hover(function () {
                if (!self.bubbleShown) {
                    self.$el.find('.poster-info-bubble').show();
                    self.bubbleShown = true;
                }
            }, function () {
                if (self.bubbleShown) {
                    self.$el.find('.poster-info-bubble').hide();
                    self.bubbleShown = false;
                }
            });

            this.$el.find('.poster-info-bubble').hover(function () {
                if (!self.bubbleShown) {
                    self.$el.find('.poster-info-bubble').show();
                    self.bubbleShown = true;
                }
            }, function () {
                if (self.bubbleShown) {
                    self.$el.find('.poster-info-bubble').hide();
                    self.bubbleShown = false;
                }
            });
        },

		render: function () {
			var self = this;
            this.$el.html(GeneralFeedItemViewTpl({
                userPic: this.userPic,
                posterGHUsername: this.posterGHUsername,
                voteCount: this.voteCount,
                postTime: this.postTime,
                text: this.text
            }));
            this.addHoverListeners();

            this.$el.find('.comment-vote-count-container').click(function () {
                self.handleCommentVote();
            });

            this.userInfoBubble = new UserInfoBubble({
                el: this.$el.find('.poster-info-bubble')
            });

            this.userInfoBubble.render({
                userPic: this.userPic,
                ghUsername: this.posterGHUsername
            });
        }
	});

	return GeneralFeedItemView;

});
