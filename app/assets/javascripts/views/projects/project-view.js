define(['jquery',
    'backbone',
    'underscore',
    'views/os.view',
    'views/projects/project-details-view',
    'views/projects/details-chat-feed-view',
    'stache!views/projects/project-view'
], function ($,
     Backbone,
     _,
     OSView,
     ProjectDetailsView,
     DetailsChatFeedView,
     ProjectViewTpl) {
    'use strict';

    var ProjectView = OSView.extend({

        initialize: function () {
            this.osInitialize();
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