class Implementation < ActiveRecord::Base
  belongs_to :project
  belongs_to :user

  scope :active, -> { where(:is_destroyed => false) }

  def create_irc_url
    if self.irc.present? && self.irc['channel'].present? && self.irc['network'].present?
      channel = self.irc['channel'].gsub('#', '')
      network_url = Project::IRC_URL_FOR_NETWORK[self.irc['network']]
      "irc://irc.#{network_url}/#{channel}"
    else
      nil
    end
  end

  def in_progress
    self.is_owner && !self.done
  end

end