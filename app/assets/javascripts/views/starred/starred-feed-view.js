define(['jquery',
    'backbone',
    'underscore',
    'views/starred/starred-item-view',
    'stache!views/starred/starred-feed-view'
], function ($,
     Backbone,
     _,
     StarredItemView,
     StarredFeedViewTpl) {
    'use strict';

    var StarredFeedView = Backbone.View.extend({

        initialize: function () {
        },

        events: {},

        populate: function (projects) {
            var self = this;
            this.$el.find('#starred-feed-list').empty();
            if (projects.length == 0) {
                this.$el.find('.no-others-exist').show();
            } else {
                this.$el.find('.no-others-exist').hide();
                for (var i = 0; i < projects.length; i++) {
                    this.addProject(projects[i]);
                }
            }
        },

        addProject: function (data) {
            var self = this;
            var starredItemView = new StarredItemView({
                tagName: 'li',
                data: data
            });
            this.setListener(starredItemView, data);
            starredItemView.render();
            this.$el.find('#starred-feed-list').append(starredItemView.el);
        },

        setListener: function (view, data) {
            view.$el.click(function () {
                Backbone.EventBroker.trigger('force-hide-starred-modal', data.id);
            });
        },

        render: function () {
            var self = this;
            this.$el.html(StarredFeedViewTpl());
        }
    });

    return StarredFeedView;

});
