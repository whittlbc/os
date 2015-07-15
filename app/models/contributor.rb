class Contributor < ActiveRecord::Base
  belongs_to :project
  has_one :user, primary_key: 'user_id', foreign_key: 'id'

end