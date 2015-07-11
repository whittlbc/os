class ChangeUserIdColType < ActiveRecord::Migration
  def change
    change_column :projects, :user_id, 'integer USING CAST(user_id AS integer)'
  end
end
