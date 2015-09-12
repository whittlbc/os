class ChangeFeedToIntegerOnComment < ActiveRecord::Migration
  def change
    change_column :comments, :feed, 'integer USING CAST(feed AS integer)'
  end
end
