class RenameStarredToUpvoted < ActiveRecord::Migration
  def change
    rename_column :users, :starred, :upvoted
  end
end
