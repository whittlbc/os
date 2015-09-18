define(['jquery',
    'backbone',
    'underscore',
    'views/projects/major/communication/general/general-feed-container-view',
    'views/projects/major/communication/suggestions/suggestions-feed-container-view',
    'views/projects/major/communication/team/team-feed-container-view',
    'views/projects/major/communication/admin/admin-feed-container-view',
    'stache!views/projects/major/communication/communication-panels-view',
    'backbone-eventbroker'
], function ($,
     Backbone,
     _,
     GeneralFeedContainerView,
     SuggestionsFeedContainerView,
     TeamFeedContainerView,
     AdminFeedContainerView,
     CommunicationPanelsViewTpl) {
    'use strict';

    var CommunicationPanelsView = Backbone.View.extend({

        initialize: function () {
        },

        events: {
            'click .add-comment-btn': 'checkIfUserAuthedOnPostClick',
            'click .comment-textarea': 'checkIfUserAuthedOnInputClick'
        },

        checkIfUserAuthedOnPostClick: function () {
            Backbone.EventBroker.trigger('post-comment:click', this);
        },

        checkIfUserAuthedOnInputClick: function () {
            Backbone.EventBroker.trigger('comment-input:click', this);
        },

        handleAddComment: function () {
            var self = this;
            var $textarea = this.$el.find('.comment-textarea');
            var text = $textarea.val();
            var data = {
                text: text,
                feed: this.activeFeedIndex,
                parent_id: null
            };
            Backbone.EventBroker.trigger('comment:add', data);
            var text = $textarea.val('');
            $textarea.css('height', '31px');
        },

        showNewComment: function (data) {
            var self = this;
            this.activePanel.passComments(data);
        },

        passComments: function (comments) {
            var self = this;
            this.activePanel.passComments(comments);
        },

        scrollToNewComment: function () {
            var self = this;
            var feedContainerHeight = this.$el.find('#communicationFeedContainer').height();
            $('html, body').animate({scrollTop: feedContainerHeight}, {duration: 500, specialEasing: 'easeInOutCubic'});
        },

        addListeners: function () {
            var self = this;

            // Auto-resize comment textarea
            this.$el.find('.comment-textarea').on('keyup input', function() {
                $(this).css('height', 'auto').css('height', this.scrollHeight + this.offsetHeight - this.clientHeight);
            });
        },

        render: function (options) {
            var self = this;
            var generalActive;

            if (options && options.hasOwnProperty('activePanel')) {
                generalActive = options.activePanel == 0;
            } else {
                generalActive = true;
            }

            this.$el.html(CommunicationPanelsViewTpl({
                generalActive: generalActive,
                suggestionsActive: options && options.activePanel == 1,
                teamActive: options && options.activePanel == 2,
                adminActive: options && options.activePanel == 3
            }));

            this.generalFeedContainerView = new GeneralFeedContainerView({
                el: '#generalFeedContainerView'
            });

            this.suggestionsFeedContainerView = new SuggestionsFeedContainerView({
                el: '#suggestionsFeedContainerView'
            });

            this.teamFeedContainerView = new TeamFeedContainerView({
                el: '#teamFeedContainerView'
            });

            this.adminFeedContainerView = new AdminFeedContainerView({
                el: '#adminFeedContainerView'
            });

            if (options && options.hasOwnProperty('activePanel')) {

                this.activeFeedIndex = options.activePanel;

                switch (options.activePanel) {
                    case 0:
                        this.generalFeedContainerView.render();
                        this.activePanel = this.generalFeedContainerView;
                        break;
                    case 1:
                        this.suggestionsFeedContainerView.render();
                        this.activePanel = this.suggestionsFeedContainerView;
                        break;
                    case 2:
                        this.teamFeedContainerView.render();
                        this.activePanel = this.teamFeedContainerView;
                        break;
                    case 3:
                        this.adminFeedContainerView.render();
                        this.activePanel = this.adminFeedContainerView;
                        break;
                    default:
                        this.generalFeedContainerView.render();
                        this.activePanel = this.generalFeedContainerView;
                }
            } else {
                this.activeFeedIndex = 0;
                this.activePanel = this.generalFeedContainerView;
                this.generalFeedContainerView.render();
            }

            this.addListeners();
        }
    });

    return CommunicationPanelsView;

});
