class AddVoteCountToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :vote_count, :integer
  end
end
