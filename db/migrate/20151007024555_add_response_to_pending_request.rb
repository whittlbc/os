class AddResponseToPendingRequest < ActiveRecord::Migration
  def change
    add_column :pending_requests, :response, :boolean
  end
end
