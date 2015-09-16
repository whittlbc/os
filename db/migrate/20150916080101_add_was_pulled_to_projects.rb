class AddWasPulledToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :was_pulled, :boolean, default: false
  end
end
