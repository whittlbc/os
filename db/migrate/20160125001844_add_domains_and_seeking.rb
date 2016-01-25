class AddDomainsAndSeeking < ActiveRecord::Migration
  def change
     add_column :projects, :domains, :string, array: true, default: []
     add_column :projects, :seeking, :string, array: true, default: []
  end
end
