class User < ActiveRecord::Base
  has_many :projects
  has_many :comments
  has_many :evolutions
  has_many :suggestions
  has_many :implementations

  scope :username_login, -> (username, password) {
    where(:username => username, :password => password)
  }

  scope :email_login, -> (email, password) {
    where(:email => email, :password => password)
  }

  PROJECT_ASSET = 0
  SLACK_ASSET = 1
  HIPCHAT_ASSET = 2

  def voted_on_project(project_id)
    self.upvoted_projects.include?(project_id)
  end

  def voted_on_comment(comment_id)
    self.upvoted_comments.include?(comment_id)
  end

  def voted_on_implementation(id)
    self.upvoted_implementations.include?(id)
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

    # Get Notifications where:
    # (1) You're the responder and there is still no response
    # OR
    # (2) You're the requester and the response is TRUE (been accepted) and you haven't seen it yet

    PendingRequest.includes(:project).where('(pending_requests.responder_id = ? AND pending_requests.response IS NULL) OR (pending_requests.requester_id = ? AND pending_requests.response = ? AND pending_requests.response_seen = ?)', self.id, self.id, true, false).map { |request|

      # go with project title, but default back to repo name
      project_name = (request.project.title.nil? || request.project.title.empty?) ? request.project.repo_name : request.project.title

      # if you're the one who needs to respond
      if request.responder_id === self.id
        # get info about the requester
        requester = User.find_by(:id => request.requester_id)
        data = {
            :uuid => request.uuid,
            :requested_asset => request.requested_asset,
            :username => requester.gh_username,
            :requester_uuid => requester.uuid,
            :pic => requester.pic,
            :project_uuid => request.project.uuid,
            :project_name => project_name,
            :is_request => true,
            :seen => request.request_seen,
            :date => request.created_at.utc.iso8601
        }

        # if the request to join slack or hipchat, get the url the appropriate one
        if request.requested_asset === SLACK_ASSET
          slack_integration = request.project.integrations.where(:service => 'Slack').first
          if !slack_integration.nil?
            data[:slack_url] = slack_integration.url
            data[:email] = requester.email
          end        end
        if request.requested_asset === HIPCHAT_ASSET
          hipchat_integration = request.project.integrations.where(:service => 'HipChat').first
          if !hipchat_integration.nil?
            data[:hipchat_url] = hipchat_integration.url
            data[:email] = requester.email
          end
        end

        data

      # if you're the one who sent the request, you still need to see the response
      else
        # get info about the responder to your request
        responder = User.find_by(:id => request.responder_id)
        data = {
            :uuid => request.uuid,
            :requested_asset => request.requested_asset,
            :username => responder.gh_username,
            :requester_uuid => nil, # don't need it, but keeping it for consistency
            :pic => responder.pic,
            :project_uuid => request.project.uuid,
            :project_name => project_name,
            :is_request => false,
            :seen => false,
            :date => !request.responded_at.nil? ? request.responded_at.utc.iso8601 : nil
        }

        data
      end

    }.sort_by { |r| r[:date] }.reverse

  end

end
