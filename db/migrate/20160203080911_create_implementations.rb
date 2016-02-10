class CreateImplementations < ActiveRecord::Migration
  def change
    create_table :implementations do |t|
      t.string  :uuid, index: true
      t.integer :project_id, index: true
      t.boolean :is_owner, default: false
      t.boolean :in_progress, default: false
      t.boolean :seeking_contributors, default: false
      t.text    :description
      t.string  :github_url
      t.string  :slack_url
      t.string  :hipchat_url
      t.json    :irc
      t.string  :other_url
      t.timestamps
    end
  end
end
