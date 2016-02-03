define(['jquery',
  'backbone',
  'models/implementation',
  'views/projects/major/implementation/implementation-item',
  'stache!views/projects/major/implementation/implementation-view',
  'underscore',
  'backbone-eventbroker'
], function ($,
             Backbone,
             Implementation,
             ImplementationItem,
             ImplementationViewTpl,
             _) {
  'use strict';

  var ImplementationView = Backbone.View.extend({

    initialize: function () {
    },

    events: {
      'click .add-implementation': 'handleAddImplementation'
    },

    handleAddImplementation: function () {
      Backbone.EventBroker.trigger('login-or-add-implementation');
    },

    populate: function (implementations) {
      var self = this;
      this.$list.empty();

      if (_.isEmpty(implementations)) {
        this.$noItemsView.show();
      } else {
        this.$noItemsView.hide();
        _.each(implementations, function (data) {
          self.addItem(data);
        });
      }
    },

    addItem: function (data) {
      var itemView = new ImplementationItem({
        tagName: 'li',
        model: new Implementation(data)
      });

      this.addListeners(itemView);

      itemView.render();

      this.$list.append(itemView.el);
    },

    render: function () {
      this.$el.html(ImplementationViewTpl());
      this.$list = this.$el.find('.imp-list-view');
      this.$noItemsView = this.$list = this.$el.find('.no-imps-view');;
    }

  });

  return ImplementationView;

});
