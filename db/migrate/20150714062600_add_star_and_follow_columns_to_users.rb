class AddStarAndFollowColumnsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :starred, :integer, array: true, default: []
    add_column :users, :following, :integer, array: true, default: []
  end
end
