define(['jquery',
	'backbone',
	'underscore',
    'models/evolution',
    'views/projects/minor/evolution/evolution-feed-item-view',
	'stache!views/projects/minor/evolution/evolution-feed-view',
    'backbone-eventbroker'
    ], function ($,
     Backbone,
     _,
     Evolution,
     EvolutionFeedItemView,
     EvolutionFeedViewTpl) {
	'use strict';

	var EvolutionFeedView = Backbone.View.extend({

		initialize: function () {
		},

		events: {
            'click .add-evolution-item-btn': 'handleAddPost'
        },

        populate: function (data) {
            var self = this;
            var $noItemsView = this.$el.find('#noEvolutionItems');
            this.$el.find('#evolutionFeedListView').empty();
            if (data.length === 0) {
                $noItemsView.show();
            } else {
                $noItemsView.hide();
                for (var i = 0; i < data.length; i++) {
                    this.addItem(data[i]);
                }
            }
        },

        addItem: function (data) {
            var self = this;
            data.is_admin = this.options.is_admin;
            var evolutionFeedItemView = new EvolutionFeedItemView({
                tagName: 'li',
                data: data
            });
            this.listenTo(evolutionFeedItemView, 'evolution-item:delete', function (uuid) {
                self.evolutionItemToDelete = uuid;
                Backbone.EventBroker.trigger('evolution-item:delete', self);
            });
            evolutionFeedItemView.render();
            this.$el.find('#evolutionFeedListView').append(evolutionFeedItemView.el);
        },

        handleAddPost: function () {
            Backbone.EventBroker.trigger('evolution:add', this);
        },

        addNewEvolutionItem: function (userUUID) {
            var self = this;
            var text = this.$el.find('#addEvolutionItemContainer > textarea').val();

            if (!_.isEmpty(text)) {
                var evolution = new Evolution();
                evolution.createNewEvolution({project_id: self.projectID, user_uuid: userUUID, text: text}, {success: function (data) {
                    self.$el.find('#addEvolutionItemContainer > textarea').val('');
                    self.populate(data);
                }});
            } else {
                // show some sort of message
            }
        },

        deleteEvolutionItem: function () {
            var self = this;
            var evolution = new Evolution();
            evolution.deleteEvolutionItem({uuid: self.evolutionItemToDelete}, {success: function (data) {
                self.populate(data);
            }});
        },

		render: function (options) {
			var self = this;
            options = options || {};
            this.options = options;
            this.projectID = options.id;

            this.$el.html(EvolutionFeedViewTpl({
                isAdmin: options.is_admin
            }));

            if (options.is_admin) {
                // Auto-resize reply textarea
                this.$el.find('#addEvolutionItemContainer > textarea').on('keyup input', function () {
                    $(this).css('height', 'auto').css('height', this.scrollHeight + this.offsetHeight - this.clientHeight + 2);
                });
            }
		}
	});

	return EvolutionFeedView;

});
