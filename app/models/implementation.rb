class Implementation < ActiveRecord::Base
  belongs_to :project
  belongs_to :user

  scope :active, -> { where(:is_destroyed => false) }

  def create_irc_url
    'https://google.com'
  end

  def check_for_integrations_and_tags
    self.slack_url ||
    self.hipchat_url ||
    self.irc ||
    self.in_progress ||
    self.seeking_contributors
  end

  def in_progress
    !self.done
  end

end