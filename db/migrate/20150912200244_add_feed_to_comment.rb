class AddFeedToComment < ActiveRecord::Migration
  def change
    add_column :comments, :feed, :string
  end
end
