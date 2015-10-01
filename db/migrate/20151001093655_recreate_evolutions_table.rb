class RecreateEvolutionsTable < ActiveRecord::Migration
  def change
    create_table :evolutions do |t|
      t.string :uuid
      t.integer :project_id
      t.integer :user_id
      t.text :text

      t.timestamps
    end
  end
end
