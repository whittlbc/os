class AddUuidToEvolution < ActiveRecord::Migration
  def change
    add_column :evolutions, :uuid, :string
  end
end
