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
          "#{year_diff.floor} years ago"
        else
          "#{day_diff.floor} days ago"
        end
      else
        "#{hour_diff.floor} hours ago"
      end
    else
      "#{min_diff.floor} minutes ago"
    end
  end

  def get_owner_gh_username
    self.try(:user).try(:gh_username)
  end

end
