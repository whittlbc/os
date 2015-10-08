class RemoveResponseActedOnFromPendingRequests < ActiveRecord::Migration
  def change
    remove_column :pending_requests, :response_acted_on, :boolean
  end
end
