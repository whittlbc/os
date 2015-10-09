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
            if (projects.own.length == 0) {
                this.$el.find('#noOwnedProjects').show();
            } else {
                this.$el.find('#noOwnedProjects').hide();
                for (var i = 0; i < projects.own.length; i++) {
                    this.addProject(projects.own[i], 1);
                }
            }
            if (projects.contribute.length == 0) {
                this.$el.find('#noOtherContributions').show();
            } else {
                this.$el.find('#noOtherContributions').hide();
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
            this.setListener(myProjectsItemView, data);
            myProjectsItemView.render();
            var $list = (listInt === 0) ? this.$el.find('#owned-projects-list') : this.$el.find('#contributing-projects-list');
            $list.append(myProjectsItemView.el);
        },

        setListener: function (view, data) {
            view.$el.click(function () {
                Backbone.EventBroker.trigger('force-hide-my-projects-modal', data.id);
            });
        },

        render: function () {
            var self = this;
            this.$el.html(MyProjectsFeedViewTpl());
        }
    });

    return MyProjectsFeedView;

});
