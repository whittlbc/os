class User < ActiveRecord::Base

  has_many :projects
  has_many :comments
  has_many :evolutions

  scope :username_login, -> (username, password) {
    where(:username => username, :password => password)
  }

  scope :email_login, -> (email, password) {
    where(:email => email, :password => password)
  }

  module GH
    CLIENT_ID = 'bfdb73ed12138dddbfcc'
    CLIENT_SECRET = '91347eb62e866f7960510aafd81c2f41b2dda2d4'
  end

  def voted_on_project(project_id)
    self.upvoted_projects.include?(project_id)
  end

  def voted_on_comment(comment_id)
    self.upvoted_comments.include?(comment_id)
  end

end
