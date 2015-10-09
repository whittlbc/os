define(['jquery',
    'backbone',
    'underscore',
    'views/my-projects/my-projects-item-view',
    'stache!views/my-projects/my-projects-feed-view'
], function ($,
     Backbone,
     _,
     MyProjectsItemView,
     MyProjectsFeedViewTpl) {
    'use strict';

    var MyProjectsFeedView = Backbone.View.extend({

        initialize: function () {
        },

        events: {},

        reEmptyAllLists: function () {
            var self = this;
            this.$el.find('#owned-projects-list').empty();
            this.$el.find('#contributing-projects-list').empty();
        },

        populate: function (projects) {
            var self = this;
            this.reEmptyAllLists();
            for (var i = 0; i < projects.own.length; i++) {
                this.addProject(projects.own[i], 0);
            }
            if (projects.contribute.length == 0) {
                this.$el.find('.no-others-exist').show();
            } else {
                this.$el.find('.no-others-exist').hide();
                for (var j = 0; j < projects.contribute.length; j++) {
                    this.addProject(projects.contribute[j], 1);
                }
            }
        },

        addProject: function (data, listInt) {
            var self = this;
            var myProjectsItemView = new MyProjectsItemView({
                tagName: 'li',
                data: data
            });
            myProjectsItemView.render();
            var $list = (listInt === 0) ? this.$el.find('#owned-projects-list') : this.$el.find('#contributing-projects-list');
            $list.append(myProjectsItemView.el);
        },

        render: function () {
            var self = this;
            this.$el.html(MyProjectsFeedViewTpl());
        }
    });

    return MyProjectsFeedView;

});
