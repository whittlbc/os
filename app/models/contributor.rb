class Contributor < ActiveRecord::Base
  attr_accessible :name, :user_id, :project_id, :uuid

  belongs_to :project
  has_one :user, primary_key: 'user_id', foreign_key: 'id'

end