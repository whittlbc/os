define(['jquery',
	'backbone',
	'underscore',
  'models/os.util',
	'stache!views/projects/major/implementation/implementation-item'
    ], function ($,
   Backbone,
   _,
   OSUtil,
   ImplementationItemTpl) {
	'use strict';

	var ImplementationItem = Backbone.View.extend({

		initialize: function (options) {
      options = options || {};
      this.model = options.model;
      this.model.set('post_date', OSUtil.getTimeAgo(this.model.get('post_date')));
		},

    resizeHeight: function () {
      var totalHeight =
        this.$el.find('.top').outerHeight(true) +
        this.$el.find('.middle').outerHeight(true) +
        this.$el.find('.bottom').outerHeight(true);

      this.$el.find('.content').height(totalHeight);
      this.$el.find('.implementation-item').height(totalHeight);
      this.$el.find('.vote-container').height(totalHeight);
      var $voteCount = this.$el.find('.imp-vote-count');
      $voteCount.css({ paddingTop: ((totalHeight - $voteCount.height()) / 2) });
    },

		render: function () {
      var self = this;

      this.$el.html(ImplementationItemTpl(this.model.toJSON()));

      setTimeout(function () {
        self.resizeHeight();
      }, 5);

		}

	});

	return ImplementationItem;

});
