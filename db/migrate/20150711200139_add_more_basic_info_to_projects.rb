class AddMoreBasicInfoToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :license, :string
    add_column :projects, :status, :string
    add_column :projects, :seeking, :string
    add_column :projects, :anon, :boolean, :default => false
  end
end
