class CreateIntegrations < ActiveRecord::Migration
  def change
    create_table :integrations do |t|
      t.string :service
      t.integer :project_id

      t.timestamps
    end
  end
end
