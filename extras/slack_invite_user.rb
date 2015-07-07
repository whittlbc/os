require "slack"
require "net/http"
require "net/https"
require "uri"
require "json"
require 'cgi'

def configure_slack
  Slack.configure do |config|
    config.token = "xoxp-7312329860-7311786336-7312533360-ed8ad8"
  end
end


# Should be added as a method in some Rails Controller
def validate_api_token

  Slack.configure do |config|
    config.token = "xoxp-7312329860-7311786336-7312533360-ed8ad8"
  end

  # Check to make sure the pasted token is valid
  response = JSON.parse(Slack.auth_test)
  # Respond telling them whether it's good or not
  render :json => {:valid => response["ok"]}

end


# invite_user to team
def invite_user 

  email = 'ben92whittle@aol.com'
  first_name = 'Bennyboy'
  api_token = 'xoxp-7312329860-7311786336-7312533360-ed8ad8' # Will need to make a DB query to get this
  base = "https://#{get_team_name}.slack.com"
  hash = "/api/users.admin.invite?t=#{Time.now.to_i}"
  data = "email=#{CGI.escape(email)}&channels=#{get_channels}&first_name=#{CGI.escape(first_name)}&token=#{api_token}&set_active=true&_attempts=1"

  uri = URI.parse(base)
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE
  request = Net::HTTP::Post.new(hash)
  request.add_field('Content-Type', 'application/x-www-form-urlencoded')
  request.body = data
  response = http.request(request)

end


# Get all channels for a team
def get_channels

  count = 0
  all_channels = ''
  request = Slack.channels_list
  channels_list = request["channels"]
  channels_list.each do |channel| 
    count += 1
    if count == channels_list.length
      all_channels += channel["id"]
    else 
      all_channels += channel["id"] + ','
    end
  end

  return all_channels

end


def get_team_name 
  request = Slack.team_info
  team_name = request["team"]["name"]
  return team_name
end


configure_slack
invite_user