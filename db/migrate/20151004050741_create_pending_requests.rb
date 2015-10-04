class CreatePendingRequests < ActiveRecord::Migration
  def change
    create_table :pending_requests do |t|
      t.integer :requested_asset
      t.integer :user_id
      t.integer :project_id

      t.timestamps
    end
  end
end
