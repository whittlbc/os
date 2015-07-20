class HackChangeTypeOfLicense < ActiveRecord::Migration
  def change
    remove_column :projects, :license, :string
    add_column :projects, :license, :string, array: true, default: []
  end
end
