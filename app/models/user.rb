class User < ActiveRecord::Base
  attr_accessible :email, :gh_username, :name, :password, :username, :uuid
  has_many :projects
end
