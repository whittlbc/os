class AddUsersToIntegrations < ActiveRecord::Migration
  def change
    add_column :integrations, :users, :integer, array: true, default: []
  end
end
