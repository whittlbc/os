define(['jquery',
	'backbone',
	'underscore',
    'stache!views/svgs/v-ellipsis',
    'stache!views/svgs/up-for-grabs',
    'stache!views/svgs/on-the-fence',
    'stache!views/svgs/launched',
    'stache!views/svgs/github',
    'stache!views/svgs/create-from-scratch',
    'stache!views/svgs/pull-from-ideas'
], function ($,
     Backbone,
     _,
     VEllipsisTpl,
     UpForGrabsTpl,
     OnTheFenceTpl,
     LaunchedTpl,
     GitHubTpl,
     CreateFromScratchTpl,
     PullFromIdeasTpl
) {
	'use strict';

	var SVGView = Backbone.View.extend({

		initialize: function (options) {
            options = options || {};

            this.map = {
                'v-ellipsis': VEllipsisTpl,
                'up-for-grabs': UpForGrabsTpl,
                'on-the-fence': OnTheFenceTpl,
                'launched': LaunchedTpl,
                'github': GitHubTpl,
                'create-from-scratch': CreateFromScratchTpl,
                'pull-from-ideas': PullFromIdeasTpl
            };

            this.template = this.map[options.svg];
		},

        changeColor: function (color) {
            this.$el.find('path').attr('fill', color);
            this.$el.find('line').attr('stroke', color);
        },

        render: function () {
            var self = this;
            this.$el.html(this.template());
        }

	});

	return SVGView;

});
