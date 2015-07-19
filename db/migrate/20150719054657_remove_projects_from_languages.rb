class RemoveProjectsFromLanguages < ActiveRecord::Migration
  def change
    remove_column :languages, :projects, :string, array: true, default: []
  end
end
