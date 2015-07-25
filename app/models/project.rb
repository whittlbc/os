class Project < ActiveRecord::Base
  belongs_to :user
  has_many :contributors
  has_many :integrations
  has_many :comments
end
