class Implementation < ActiveRecord::Base
  belongs_to :project
  belongs_to :user

  scope :active, -> { where(:is_destroyed => false) }

end