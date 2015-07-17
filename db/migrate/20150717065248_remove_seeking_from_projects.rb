class RemoveSeekingFromProjects < ActiveRecord::Migration
  def change
    remove_column :projects, :seeking, :string
  end
end
