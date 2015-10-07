class AddResponseSeenToPendingRequest < ActiveRecord::Migration
  def change
    add_column :pending_requests, :response_seen, :boolean
  end
end
