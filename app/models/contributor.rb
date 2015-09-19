class Contributor < ActiveRecord::Base
  belongs_to :project
  has_one :user, primary_key: 'user_id', foreign_key: 'id'

  scope :admin, -> (project_id) { includes(:user).where(:project_id => project_id, :admin => true) }

end