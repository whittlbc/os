class AddIsDestroyedToProjectsAndComments < ActiveRecord::Migration
  def change
    add_column :projects, :is_destroyed, :boolean, :default => false
    add_column :comments, :is_destroyed, :boolean, :default => false
  end
end
