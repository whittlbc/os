class CreateEvolutions < ActiveRecord::Migration
  def change
    create_table :evolutions do |t|
      t.integer  :project_id
      t.string   :change
      t.timestamps
    end
  end
end
