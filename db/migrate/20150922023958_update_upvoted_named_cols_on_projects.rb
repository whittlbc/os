class UpdateUpvotedNamedColsOnProjects < ActiveRecord::Migration
  def change
    :upvotedProjects = user.upvoted_projects,
        rename_column :users, :upvoted, :upvoted_projects
    add_column :users, :upvoted_comments, :integer, array: true, default: []
  end
end
