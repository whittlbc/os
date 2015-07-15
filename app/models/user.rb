class User < ActiveRecord::Base

  has_many :projects

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

end
