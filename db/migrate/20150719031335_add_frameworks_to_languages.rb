class AddFrameworksToLanguages < ActiveRecord::Migration
  def change
    add_column :languages, :frameworks, :string, array: true, default: []
  end
end
