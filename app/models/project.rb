class Project < ActiveRecord::Base
  belongs_to :user, polymorphic: true
  belongs_to :language, polymorphic: true
  has_many :contributors
  has_many :integrations
end
