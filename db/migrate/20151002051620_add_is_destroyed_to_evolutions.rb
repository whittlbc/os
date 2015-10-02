class AddIsDestroyedToEvolutions < ActiveRecord::Migration
  def change
    add_column :evolutions, :is_destroyed, :boolean, :default => false
  end
end
