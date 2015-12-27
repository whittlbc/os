class UpdateUpvotedNamedColsOnProjects < ActiveRecord::Migration
  def change
    rename_column :users, :upvoted, :upvoted_projects
    add_column :users, :upvoted_comments, :integer, array: true, default: []
  end
end
