class ChangeChangeToNewValueOnEvolutions < ActiveRecord::Migration
  def change
    rename_column :evolutions, :change, :new_value
  end
end
