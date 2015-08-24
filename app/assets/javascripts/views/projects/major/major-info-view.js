define(['jquery',
	'backbone',
	'underscore',
	'stache!views/projects/major/major-info-view'
    ], function ($,
     Backbone,
     _,
     MajorInfoViewTpl) {
	'use strict';

	var MajorInfoView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(MajorInfoViewTpl({
                title: "My Awesome Project",
                subtitle: "A JavaScript library designed to be so much better than your ordinary JS library",
                description: ";alskdfj;askdjf; ;ask falksdjf a;sldkjf a;alskdj;kf lsk lsk lskdjflak;dj ;a ljs;alskjd;flkaj ;alksdjf; asdjf;alksjdf;a ;lskdjf a;lksjd;f alksdjf; a;skdjf;a ;lskdjf; alskdjf ;askldjf; asldkf a;sldk a;sdkfj a;sdkf sdlf sldfkj sdlfjsldkf."
            }));
		}
	});

	return MajorInfoView;

});
