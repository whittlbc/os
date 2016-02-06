class Implementation < ActiveRecord::Base
  belongs_to :project
  belongs_to :user

  scope :active, -> { where(:is_destroyed => false) }

  def get_most_relevant_url
    self.github_url ||
    self.other_url ||
    self.slack_url ||
    self.hipchat_url ||
    self.create_irc_url
  end

  def create_irc_url
    'https://google.com'
  end

  def check_if_has_non_main_url_or_tags
    self.other_url ||
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