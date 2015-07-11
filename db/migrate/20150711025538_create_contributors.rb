class CreateContributors < ActiveRecord::Migration
  def change
    create_table :contributors do |t|
      t.string :uuid
      t.string :name
      t.integer :project_id
      t.integer :user_id

      t.timestamps
    end
  end
end
