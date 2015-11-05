define(['jquery',
    'backbone',
    'underscore',
    'stache!views/dropdowns/more-filters-dropup',
    'backbone-eventbroker'
], function ($,
     Backbone,
     _,
     MoreFiltersDropupTpl) {
    'use strict';

    var MoreFiltersDropup = Backbone.View.extend({

        initialize: function () {
        },

        events: {
            'click ul#moreFiltersList > li': 'handleClick'
        },

        handleClick: function (e) {
            e.stopPropagation();
            var $target = $(e.currentTarget);
            if ($target.hasClass('selected')) {
                $target.removeClass('selected');
                this.trigger('remove-extra-filter', e.currentTarget.id);
            } else {
                $target.addClass('selected');
                this.trigger('add-extra-filter', e.currentTarget.id);
            }
        },

        render: function () {
            this.$el.html(MoreFiltersDropupTpl());
        }
    });

    return MoreFiltersDropup;

});
