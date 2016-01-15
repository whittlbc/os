class AddCommentsCountAndContribsCountToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :comments_count, :integer, default: 0
    add_column :projects, :contributors_count, :integer, default: 0

    Project.includes(:comments, :contributors).all.map { |project|

      updated_attrs = {
        :comments_count => project.comments.count,
        :contributors_count => project.contributors.count
      }

      project.update_attributes(updated_attrs)

    }
  end
end
