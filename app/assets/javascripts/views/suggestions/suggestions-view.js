define(['jquery',
    'backbone',
    'underscore',
    'stache!views/suggestions/suggestions-view'
], function ($,
             Backbone,
             _,
             SuggestionsViewTpl) {
    'use strict';

    var SuggestionsView = Backbone.View.extend({

        initialize: function () {
        },

        events: {},

        render: function () {
            var self = this;
            this.$el.html(SuggestionsViewTpl());
        }
    });

    return SuggestionsView;

});