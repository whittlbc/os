class User < ActiveRecord::Base
  has_many :projects
  has_many :comments
  has_many :evolutions


  scope :username_login, -> (username, password) {
    where(:username => username, :password => password)
  }

  scope :email_login, -> (email, password) {
    where(:email => email, :password => password)
  }

  module GH
    CLIENT_ID = 'bfdb73ed12138dddbfcc'
    CLIENT_SECRET = '91347eb62e866f7960510aafd81c2f41b2dda2d4'
  end

  def voted_on_project(project_id)
    self.upvoted_projects.include?(project_id)
  end

  def voted_on_comment(comment_id)
    self.upvoted_comments.include?(comment_id)
  end

  def has_pending_request?(project_id, asset)
    has_request = false
    PendingRequest.where(:requester_id => self.id).each { |request|
      if request.project_id === project_id && request.requested_asset === asset
        has_request = true
      end
    }
    has_request
  end

  def get_notifications
    PendingRequest.includes(:project).where(:responder_id => self.id).map { |request|
      requester = User.find_by(:id => request.requester_id)
      slack_integration = request.project.integrations.where(:service => 'Slack').first
      hipchat_integration = request.project.integrations.where(:service => 'HipChat').first
      data = {
          :uuid => request.uuid,
          :requested_asset => request.requested_asset,
          :requester_gh_username => requester.gh_username,
          :requester_uuid => requester.uuid,
          :pic => requester.pic,
          :project_uuid => request.project.uuid
      }
      if !slack_integration.nil?
        data[:slack_url] = slack_integration.url
      end
      if !hipchat_integration.nil?
        data[:hipchat_url] = hipchat_integration.url
      end

      data
    }
  end

end
