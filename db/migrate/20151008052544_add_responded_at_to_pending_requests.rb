class AddRespondedAtToPendingRequests < ActiveRecord::Migration
  def change
    add_column :pending_requests, :responded_at, :datetime
  end
end
