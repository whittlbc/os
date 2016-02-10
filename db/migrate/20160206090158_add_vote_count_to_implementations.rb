class AddVoteCountToImplementations < ActiveRecord::Migration
  def change
    add_column :implementations, :vote_count, :integer, default: 0
  end
end
