class Integration < ActiveRecord::Base
  belongs_to :project

  PROJECT_ASSET = 0
  SLACK_ASSET = 1
  HIPCHAT_ASSET = 2

  def service_for_asset(asset)
    case asset
      when SLACK_ASSET
        'Slack'
      when HIPCHAT_ASSET
        'HipChat'
    end
  end

end