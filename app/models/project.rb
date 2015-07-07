class Project < ActiveRecord::Base
  attr_accessible :title, :user, :uuid, :repo_name, :description, :vote_count, :contributors
  belongs_to :user, :class_name => User
end
