class DestroyEvolutionsTable < ActiveRecord::Migration
  def change
    drop_table :evolutions
  end
end
