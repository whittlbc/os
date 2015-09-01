class RemoveNameFromContributors < ActiveRecord::Migration
  def change
    remove_column :contributors, :name, :string
  end
end
