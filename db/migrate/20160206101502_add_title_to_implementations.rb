class AddTitleToImplementations < ActiveRecord::Migration
  def change
    add_column :implementations, :title, :string
  end
end
