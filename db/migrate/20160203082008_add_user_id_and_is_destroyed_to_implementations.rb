class AddUserIdAndIsDestroyedToImplementations < ActiveRecord::Migration
  def change
    add_column :implementations, :user_id, :integer, index: true
    add_column :implementations, :is_destroyed, :boolean, default: false
  end
end
