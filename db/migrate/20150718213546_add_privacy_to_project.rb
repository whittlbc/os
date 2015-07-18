class AddPrivacyToProject < ActiveRecord::Migration
  def change
    add_column :projects, :privacy, :string, default: 'request'
  end
end
