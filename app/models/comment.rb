class Comment < ActiveRecord::Base
  belongs_to :project
  belongs_to :user
  belongs_to :parent, :class_name => 'Comment', :foreign_key => 'parent_id'
  has_many :children, :class_name => 'Comment', :foreign_key => 'parent_id'


  scope :top_level, -> (project_id, feed_status) {
    where(:project_id => project_id, :feed => feed_status, :parent_id => nil)
  }

  scope :vote_and_time_sort, -> { all(:order => ['vote_count DESC', :updated_at]) }

  scope :not_destroyed, -> { where(:is_destroyed => false) }


end