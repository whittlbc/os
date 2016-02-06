class AddUpvotedImplementationsToUser < ActiveRecord::Migration
  def change
    add_column :users, :upvoted_implementations, :integer, array: true, default: []
  end
end
