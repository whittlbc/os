class AddMoreDefaultsToPendingRequests < ActiveRecord::Migration
  def change
    change_column :pending_requests, :request_seen, :boolean, :default => false
    change_column :pending_requests, :response_seen, :boolean, :default => false
  end
end
