class Project < ActiveRecord::Base
  belongs_to :user
  has_many :contributors
  has_many :integrations
  has_many :comments


  def get_general_date
    min_diff = (Time.now - self.created_at) / 60
    if min_diff > 60
      hour_diff = min_diff / 60
      if hour_diff > 24
        day_diff = hour_diff / 24
        if day_diff > 365
          year_diff = day_diff / 365
          year_diff.floor == 1 ? '1 year ago' : "#{year_diff.floor} years ago"
        else
          day_diff.floor == 1 ? '1 day ago' : "#{day_diff.floor} days ago"
        end
      else
        hour_diff.floor == 1 ? '1 hour ago' : "#{hour_diff.floor} hours ago"
      end
    else
      min_diff.ceil == 1 ? '1 minute ago' : "#{min_diff.ceil} minutes ago"
    end
  end

  def get_owner_gh_username
    self.try(:user).try(:gh_username)
  end

end
