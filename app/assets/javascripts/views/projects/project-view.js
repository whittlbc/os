define(['jquery',
    'backbone',
    'underscore',
    'views/projects/project-details-view',
    'views/projects/details-chat-feed-view',
    'stache!views/projects/project-view'
], function ($,
             Backbone,
             _,
             ProjectDetailsView,
             DetailsChatFeedView,
             ProjectViewTpl) {
    'use strict';

    var ProjectView = Backbone.View.extend({

        initialize: function () {
        },

        events: {},

        render: function () {
            var self = this;
            this.$el.html(ProjectViewTpl({
            }));

            this.projectDetailsView = new ProjectDetailsView({
                el: '#projectDetailsView'
            });

            this.projectDetailsView.render();

            this.detailsChatFeedView = new DetailsChatFeedView({
                el: '#detailsChatFeedView'
            });

            this.detailsChatFeedView.render();
        }
    });

    return ProjectView;

});