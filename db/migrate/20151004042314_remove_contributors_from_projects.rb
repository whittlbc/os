class RemoveContributorsFromProjects < ActiveRecord::Migration
  def change
    remove_column :projects, :contributors, :json
  end
end
