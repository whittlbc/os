class ChangeUserToUserId < ActiveRecord::Migration
  def change
    rename_column :projects, :user, :user_id
  end
end
