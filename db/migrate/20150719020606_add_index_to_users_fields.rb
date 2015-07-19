class AddIndexToUsersFields < ActiveRecord::Migration
  def change
    add_index :users, :username
    add_index :users, :name
    add_index :users, :gh_username
  end
end
