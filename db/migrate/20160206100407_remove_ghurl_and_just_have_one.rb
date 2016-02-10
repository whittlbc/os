class RemoveGhurlAndJustHaveOne < ActiveRecord::Migration
  def change
    remove_column :implementations, :github_url, :string
    remove_column :implementations, :other_url, :string
    add_column :implementations, :main_url, :string
  end
end
