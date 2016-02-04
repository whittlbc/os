define(['jquery',
	'backbone',
	'underscore',
  'models/os.util',
	'stache!views/add-implementation/add-implementation-view'
    ], function ($,
     Backbone,
     _,
     OSUtil,
     AddImplementationViewTpl) {
	'use strict';

	var AddImplementationView = Backbone.View.extend({

		initialize: function () {

		},

		events: {},

    initIRCNetworkDropdown: function () {
      var self = this;

      this.irc = {};

      var options = {
        theme: 'links',
        maxItems: 1,
        valueField: 'id',
        searchField: 'title',
        options: OSUtil.IRC_NETWORKS,
        onBlur: function () {
          self.irc.network = self.ircNetworkSelectize.getValue();
        },
        selectOnTab: false,
        render: {
          option: function (data, escape) {
            return '<div class="option title">' + escape(data.title) + '</div>';
          },
          item: function (data, escape) {
            return '<div class="item">' + escape(data.title) + '</div>';
          }
        }
      };
      var $ircNetworkSelect = this.$el.find('#ircNetwork').selectize(options);
      var ircNetworkSelectize = $ircNetworkSelect[0].selectize;
      this.ircNetworkSelectize = ircNetworkSelectize;
      this.ircNetworkSelectize.on('item_add', function () {
        self.irc.network = self.ircNetworkSelectize.getValue();
      });
      this.ircNetworkSelectize.on('item_remove', function () {
        self.irc.network = self.ircNetworkSelectize.getValue();
      });
      if (this.irc.network) {
        this.ircNetworkSelectize.setValue(this.irc.network);
      }
    },

    render: function () {
			this.$el.html(AddImplementationViewTpl());
      this.initIRCNetworkDropdown();
		}
	});

	return AddImplementationView;

});
