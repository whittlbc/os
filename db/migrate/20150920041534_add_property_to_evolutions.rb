class AddPropertyToEvolutions < ActiveRecord::Migration
  def change
    add_column :evolutions, :property, :string
  end
end
