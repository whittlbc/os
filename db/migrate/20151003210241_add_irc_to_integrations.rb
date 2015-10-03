class AddIrcToIntegrations < ActiveRecord::Migration
  def change
    add_column :integrations, :irc, :json, :default => {}
  end
end
