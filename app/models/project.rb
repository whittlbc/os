class Project < ActiveRecord::Base
  belongs_to :user
  has_many :contributors
  has_many :integrations
  has_many :comments
  has_many :evolutions
  has_many :pending_requests

  scope :active, -> { where(:is_destroyed => false, :was_pulled => false) }

  scope :not_pulled, -> { where(:was_pulled => false) }

  scope :not_destroyed, -> { where(:is_destroyed => false) }

  scope :up_for_grabs, -> { where(:status => 0) }

  scope :on_the_fence, -> { where(:status => 1) }

  scope :launched, -> { where(:status => 2) }

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

  def is_starred?
    starred_arr = self.try(:user).try(:starred)
    if !starred_arr.nil?
      starred_arr.include?(self.id)
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

end
