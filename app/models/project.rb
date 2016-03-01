class Project < ActiveRecord::Base
  include FriendlyId

  belongs_to :user
  has_many :contributors
  has_many :integrations
  has_many :comments
  has_many :evolutions
  has_many :pending_requests
  has_many :implementations

  friendly_id :slug_candidates, use: :slugged

  IRC_URL_FOR_NETWORK = {
    'ChLame' => 'chlame.net',
    'EFnet' => 'efnet.org',
    'freenode' => 'freenode.net',
    'IRC-Hipsano' => 'irc-hispano.org',
    'IRCnet' => 'ircnet.org',
    'OFTC' => 'oftc.net',
    'QuakeNet' => 'quakenet.org',
    'Rizon' => 'rizon.net',
    'Undernet' => 'undernet.org'
  }

  ADD_POINTS = 5

  scope :active, -> { where(:is_destroyed => false, :was_pulled => false) }

  scope :not_pulled, -> { where(:was_pulled => false) }

  scope :not_destroyed, -> { where(:is_destroyed => false) }

  scope :ideas, -> { where(:status => 0) }

  scope :launched, -> { where(:status => 1) }

  def slug_candidates
    [
      :title,
      [:title, :id]
    ]
  end

  def get_owner_gh_username
    if self.is_anon?
      'Anonymous'
    else
      self.try(:user).try(:gh_username)
    end
  end

  def is_anon?
    self.anon === true
  end

  def get_owner_pic
    if self.is_anon?
      'http://sourcehoney.s3-website-us-west-1.amazonaws.com/images/anon.png'
    else
      self.try(:user).try(:pic)
    end
  end

  def is_starred_for_user?(user)
    if user.nil?
      false
    else
      starred_array = user.starred || []
      starred_array.include?(self.id)
    end
  end

  def is_active?
    !self.is_destroyed && !self.was_pulled
  end

  def is_slack_member?(user_id)
    !self.integrations.where(:service => 'Slack').where.overlap(:users => [user_id]).empty?
  end

  def is_hipchat_member?(user_id)
    !self.integrations.where(:service => 'HipChat').where.overlap(:users => [user_id]).empty?
  end

  def get_named_uuid
    "#{self.title}-#{self.uuid}"
  end

end
