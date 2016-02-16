class LoginController < ApplicationController
  require 'rest-client'
  require 'json'

  UP_FOR_GRABS_STATE = '924bcad2-2e31-4522-9157-ca239c6e5b3b'
  ON_THE_FENCE_STATE = 'ecbc2679-5789-4ce8-aa82-155f4f964d20'
  LAUNCHED_STATE = 'fc68f489-fa29-4431-a8b0-e2e9f818107e'
  PROJECT_STATE = 'eb339bbc-d93f-4c21-a9d2-a43dc249d5fc'

  def gh_login_cb

    data = {
      :client_id => ENV['GH_CLIENT_ID'],
      :client_secret => ENV['GH_CLIENT_SECRET'],
      :code => params[:code]
    }

    response = RestClient.post('https://github.com/login/oauth/access_token', data, :accept => :json)
    body = JSON.parse(response.body)

    if body['access_token']
      upsert_user(body['access_token'])
    else
      redirect_to '/#ideas'
    end
  end


  # Call to Github's API to get user info - upsert user on response
  def upsert_user(access_token)
    response = RestClient.get("https://api.github.com/user?access_token=#{access_token}", :accept => :json)
    body = JSON.parse(response.body)

    user = User.where(gh_username: body['login']).first_or_initialize { |user|
      user.uuid = UUIDTools::UUID.random_create.to_s
    }

    user.assign_attributes({
      name: body['name'],
      email: body['email'],
      pic: body['avatar_url'],
      password: access_token
    })

    user.save!

    user_info = {
      gh_username: user.gh_username,
      uuid: user.uuid,
      pic: user.pic,
      email: user.email
    }

    cookies['gh_login'] = user_info.to_json

    redirect_to controller: 'home', action: 'index'
  end

  def fetch_gh_app_info
    render :json => {:client_id => ENV['GH_CLIENT_ID']}
  end

end
