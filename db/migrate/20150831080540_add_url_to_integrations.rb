class AddUrlToIntegrations < ActiveRecord::Migration
  def change
    add_column :integrations, :url, :string
  end
end
