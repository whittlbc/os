class ChangeProjectStatusType < ActiveRecord::Migration
  def change
    change_column :projects, :status, 'integer USING CAST(status AS integer)'
  end
end
