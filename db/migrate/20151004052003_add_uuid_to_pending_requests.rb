class AddUuidToPendingRequests < ActiveRecord::Migration
  def change
    add_column :pending_requests, :uuid, :string
  end
end
