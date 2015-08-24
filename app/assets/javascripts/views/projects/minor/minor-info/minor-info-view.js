define(['jquery',
	'backbone',
	'underscore',
    'views/projects/minor/minor-info/contributors-view',
	'stache!views/projects/minor/minor-info/minor-info-view'
    ], function ($,
     Backbone,
     _,
     ContributorsView,
     MinorInfoViewTpl) {
	'use strict';

	var MinorInfoView = Backbone.View.extend({

		initialize: function () {
		},

		events: {},

		render: function () {
			var self = this;
            this.$el.html(MinorInfoViewTpl());

            this.contributorsView = new ContributorsView({
                el: '#contributorsView'
            });
            this.contributorsView.render();
		}
	});

	return MinorInfoView;

});
