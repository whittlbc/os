class MergeLangsAndFrames < ActiveRecord::Migration
  def change
    remove_column :projects, :languages, :string, array: true, default: []
    remove_column :projects, :contributors, :json
    rename_column :projects, :frameworks, :langs_and_frames
    add_column :projects, :contributors, :integer, array: true, default: []
  end
end
