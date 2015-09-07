class Project < ActiveRecord::Base
  belongs_to :user
  has_many :contributors
  has_many :integrations
  has_many :comments

  def get_owner_gh_username
    self.try(:user).try(:gh_username)
  end

  def get_owner_pic
    self.try(:user).try(:pic)
  end

end
