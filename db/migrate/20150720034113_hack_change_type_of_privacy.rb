class HackChangeTypeOfPrivacy < ActiveRecord::Migration
  def change
    remove_column :projects, :privacy, :string
    add_column :projects, :privacy, :string, array: true, default: []
  end
end
