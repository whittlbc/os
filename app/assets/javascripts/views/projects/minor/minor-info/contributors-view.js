define(['jquery',
	'backbone',
	'underscore',
    'views/projects/minor/minor-info/contributors-item-view',
    'stache!views/projects/minor/minor-info/contributors-view'
    ], function ($,
     Backbone,
     _,
     ContributorsItemView,
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
                //$seeAllContribsBtn.hover(function () {
                //    $seeAllContribsBtn.css('border', '2px solid #00A6C9');
                //}, function () {
                //
                //});
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

		render: function (data) {
			var self = this;
            this.$el.html(ContributorsViewTpl());
            this.allContributors = data;
            this.shownContributors = data.slice(0, this.maxShownContribs);
            this.populate();
		}
	});

	return ContributorsView;

});
