class ChangeNamingConventionForPendingRequestsUsers < ActiveRecord::Migration
  def change
    rename_column :pending_requests, :user_id, :requester_id
    add_column :pending_requests, :responder_id, :integer
  end
end
