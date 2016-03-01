class AddSlugToProject < ActiveRecord::Migration
  def change
    add_column :projects, :slug, :string, index: true, unique: true
  end
end
