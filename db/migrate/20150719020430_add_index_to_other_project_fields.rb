class AddIndexToOtherProjectFields < ActiveRecord::Migration
  def change
    add_index :projects, :license
    add_index :projects, :anon
    add_index :projects, :privacy
  end
end
