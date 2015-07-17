class AddLangsAndFrameworksToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :languages, :string, array: true, default: []
    add_column :projects, :frameworks, :string, array: true, default: []
  end
end
