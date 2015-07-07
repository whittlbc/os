class AddUserToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :user, :string
  end
end
