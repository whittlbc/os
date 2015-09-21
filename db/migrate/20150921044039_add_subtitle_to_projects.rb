class AddSubtitleToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :subtitle, :text
  end
end
