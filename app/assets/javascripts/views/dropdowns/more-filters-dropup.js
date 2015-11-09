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
            Backbone.EventBroker.register({
                'forceRemovePrivacyFilters': 'forceClickPrivacy'
            }, this);
        },

        events: {
            'click ul#moreFiltersList > li': 'handleClick'
        },

        forceClickPrivacy: function () {
            var self = this;
            this.$el.find('#privacy').click();
        },

        handleClick: function (e) {
            e.stopPropagation();
            var $target = $(e.currentTarget);
            this.trigger('item:clicked', e.currentTarget.id);
            $target.hasClass('selected') ? $target.removeClass('selected') : $target.addClass('selected');
        },

        render: function () {
            this.$el.html(MoreFiltersDropupTpl());
        }
    });

    return MoreFiltersDropup;

});
