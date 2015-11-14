define(['jquery',
    'backbone',
    'underscore',
    'stache!views/rules/rules-view'
], function ($,
             Backbone,
             _,
             RulesViewTpl) {
    'use strict';

    var RulesView = Backbone.View.extend({

        initialize: function () {
        },

        events: {},

        render: function () {
            var self = this;
            this.$el.html(RulesViewTpl());
        }
    });

    return RulesView;

});