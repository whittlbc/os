class Integration < ActiveRecord::Base
  attr_accessible :project_id, :service
  belongs_to :project
end