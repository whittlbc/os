define(['jquery',
    'backbone',
    'underscore',
    'stache!views/dropdowns/extras-dropdown-view',
    'backbone-eventbroker'
], function ($,
     Backbone,
     _,
     ExtrasDropdownViewTpl) {
    'use strict';

    var ExtrasDropdownView = Backbone.View.extend({

        initialize: function () {
        },

        events: {
            'click ul#extrasList > li': 'handleClick'
        },

        handleClick: function (e) {
            e.stopPropagation();
            this.trigger('item:clicked', e.currentTarget.id);
        },

        render: function () {
            this.$el.html(ExtrasDropdownViewTpl());
        }
    });

    return ExtrasDropdownView;

});
