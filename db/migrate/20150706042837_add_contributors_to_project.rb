class AddContributorsToProject < ActiveRecord::Migration
  def change
    add_column :projects, :contributors, :json
  end
end
