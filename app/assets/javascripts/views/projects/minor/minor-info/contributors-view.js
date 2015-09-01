define(['jquery',
	'backbone',
	'underscore',
    'views/projects/minor/minor-info/contributors-item-view',
    'views/widgets/spinner-chasing-dots',
    'stache!views/projects/minor/minor-info/contributors-view'
    ], function ($,
     Backbone,
     _,
     ContributorsItemView,
     Spinner,
     ContributorsViewTpl) {
	'use strict';

	var ContributorsView = Backbone.View.extend({

		initialize: function () {
            this.maxShownContribs = 13;
		},

		events: {},

        populate: function () {
            var self = this;
            this.CONTRIBUTORS = [];
            this.$el.find('#contributorsListView').empty();
            for (var i = 0; i < this.shownContributors.length; i++) {
                this.addContrib(this.shownContributors[i]);
            }
            if (this.allContributors.length > this.maxShownContribs) {
                var $seeAllContribsBtn = $('<li>', {
                    class: 'see-all-contribs-btn'
                });
                $seeAllContribsBtn.html('See All');
                this.$el.find('#contributorsListView').append($seeAllContribsBtn);
            }
        },

        addContrib: function(data) {
            var contribItemView = new ContributorsItemView({
                tagName: 'li',
                name: data.name,
                admin: data.admin,
                pic: data.pic
            });
            contribItemView.render();
            this.$el.find('#contributorsListView').append(contribItemView.el);
            this.CONTRIBUTORS.push(contribItemView);
        },

		render: function (options) {
			var self = this;

            this.$el.html(ContributorsViewTpl({
                showSpinner: options.showSpinner
            }));
            if (options.showSpinner) {
                this.spinner = new Spinner({
                    el: '#contribsLoading',
                    width: '35px',
                    height: '35px'
                });

                // Don't show the spinner timeout unless it's been loading for more than 300 ms
                setTimeout(function () {
                    self.spinner.render();
                }, 300);

            } else {
                this.allContributors = options.contributors;
                this.shownContributors = options.contributors.slice(0, this.maxShownContribs);
                this.populate();
            }
		}
	});

	return ContributorsView;

});
