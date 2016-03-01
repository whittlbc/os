class AddSlugsToExistingProjects < ActiveRecord::Migration
  def change
    Project.all.map { |p|
      p.slug = nil
      p.save!
    }
  end
end
