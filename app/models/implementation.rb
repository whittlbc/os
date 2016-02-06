class Implementation < ActiveRecord::Base
  belongs_to :project
  belongs_to :user

  scope :active, -> { where(:is_destroyed => false) }

  def create_irc_url
    nil
  end

  def in_progress
    self.is_owner && !self.done
  end

end