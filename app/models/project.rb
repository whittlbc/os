class Project < ActiveRecord::Base
  belongs_to :user
  has_many :contributors
  has_many :integrations
  has_many :comments
  has_many :evolutions

  scope :active, -> { where(:is_destroyed => false, :was_pulled => false) }

  scope :not_pulled, -> { where(:was_pulled => false) }

  scope :not_destroyed, -> { where(:is_destroyed => false) }

  def get_owner_gh_username
    self.try(:user).try(:gh_username)
  end

  def get_owner_pic
    self.try(:user).try(:pic)
  end

  def is_starred?
    starred_arr = self.try(:user).try(:starred)
    if !starred_arr.nil?
      starred_arr.include?(self.id)
    end
  end

end
