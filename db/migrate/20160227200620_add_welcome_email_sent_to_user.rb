class AddWelcomeEmailSentToUser < ActiveRecord::Migration
  def change
    add_column :users, :welcome_email_sent, :boolean, default: false
  end
end
