class AddIndexToProjectStatus < ActiveRecord::Migration
  def change
    add_index :projects, :status
  end
end
