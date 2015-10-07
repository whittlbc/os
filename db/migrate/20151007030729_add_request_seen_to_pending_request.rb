class AddRequestSeenToPendingRequest < ActiveRecord::Migration
  def change
    add_column :pending_requests, :request_seen, :boolean
  end
end
