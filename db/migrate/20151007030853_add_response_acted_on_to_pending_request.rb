class AddResponseActedOnToPendingRequest < ActiveRecord::Migration
  def change
    add_column :pending_requests, :response_acted_on, :boolean
  end
end
