class User < ActiveRecord::Base

  attr_accessible :email, :gh_username, :name, :password, :username, :uuid

  has_many :projects

  scope :username_login, -> (username, password) {
    where(:username => username, :password => password)
  }

  scope :email_login, -> (email, password) {
    where(:email => email, :password => password)
  }

end
