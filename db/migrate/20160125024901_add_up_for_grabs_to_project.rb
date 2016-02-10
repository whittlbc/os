class AddUpForGrabsToProject < ActiveRecord::Migration
  def change
    add_column :projects, :up_for_grabs, :boolean, default: false
  end
end
