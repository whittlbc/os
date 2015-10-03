define(['jquery',
    'backbone',
    'underscore',
    'stache!views/widgets/text-info-bubble'
], function ($,
     Backbone,
     _,
     TextInfoBubbleTpl) {
    'use strict';

    var TextInfoBubble = Backbone.View.extend({

        initialize: function () {
        },

        events: {},

        render: function (options) {
            var self = this;
            options = options || {};

            this.$el.html(TextInfoBubbleTpl({
                text: options.text
            }));
        }
    });

    return TextInfoBubble;

});
