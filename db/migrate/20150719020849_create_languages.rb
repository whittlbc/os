class CreateLanguages < ActiveRecord::Migration
  def change
    create_table :languages do |t|
      t.string :name
      t.string :color
      t.string :projects, array: true, default: []

      t.timestamps
    end
  end
end
