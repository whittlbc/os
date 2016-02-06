class ChangeInProgressToDone < ActiveRecord::Migration
  def change
    rename_column :implementations, :in_progress, :done
  end
end
