class AddPointsToUser < ActiveRecord::Migration
  def change
    add_column :users, :points, :integer, default: 0

    User.includes(:projects, :comments, :implementations).all.map { |user|
      project_points = 0
      comment_points = 0
      implementation_points = 0

      user.projects.active.each { |project|
        project_points += (Project::ADD_POINTS + (project.vote_count || 0))
      }

      user.comments.not_destroyed.each { |comment|
        comment_points += (Comment::ADD_POINTS + (comment.vote_count || 0))
      }

      user.implementations.active.each { |imp|
        implementation_points += (Implementation::ADD_POINTS + (imp.vote_count || 0))
      }

      user.update_attributes(points: (project_points + comment_points + implementation_points))
    }
  end
end
