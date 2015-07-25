class AddKeyToIntegrations < ActiveRecord::Migration
  def change
    add_column :integrations, :key, :string
  end
end
