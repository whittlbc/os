class Project < ActiveRecord::Base
  attr_accessible :title, :user_id, :uuid, :repo_name, :description, :vote_count, :contributors
  belongs_to :user
  has_many :contributors
end
