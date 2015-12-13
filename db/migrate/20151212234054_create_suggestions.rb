class CreateSuggestions < ActiveRecord::Migration
  def change
    create_table :suggestions do |t|
      t.string :uuid
      t.integer :user_id
      t.text :text

      t.timestamps
    end
  end
end
