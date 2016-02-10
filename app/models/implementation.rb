class Implementation < ActiveRecord::Base
  belongs_to :project
  belongs_to :user

  scope :active, -> { where(:is_destroyed => false) }

  def create_irc_url
    if self.irc && self.irc['channel'] && self.irc['network']
      "irc://#{self.irc['channel']}@#{self.irc['network']}"
    else
      nil
    end
  end

  def in_progress
    self.is_owner && !self.done
  end

end