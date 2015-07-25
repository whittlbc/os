class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :uuid
      t.text :text
      t.integer :project_id
      t.integer :user_id
      t.integer :vote_count
    end
  end
end
