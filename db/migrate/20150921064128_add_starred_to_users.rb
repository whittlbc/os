class AddStarredToUsers < ActiveRecord::Migration
  def change
    add_column :users, :starred, :integer, array: true, default: []
  end
end
