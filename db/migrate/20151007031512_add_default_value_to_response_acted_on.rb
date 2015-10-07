class AddDefaultValueToResponseActedOn < ActiveRecord::Migration
  def change
    change_column :pending_requests, :response_acted_on, :boolean, :default => false
  end
end
