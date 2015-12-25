class LoginController < ApplicationController
  require 'rest-client'
  require 'json'

  UP_FOR_GRABS_STATE = '924bcad2-2e31-4522-9157-ca239c6e5b3b'
  ON_THE_FENCE_STATE = 'ecbc2679-5789-4ce8-aa82-155f4f964d20'
  LAUNCHED_STATE = 'fc68f489-fa29-4431-a8b0-e2e9f818107e'
  PROJECT_STATE = 'eb339bbc-d93f-4c21-a9d2-a43dc249d5fc'

  def gh_login_cb

    data = {
      :client_id => User::GH::CLIENT_ID,
      :client_secret => User::GH::CLIENT_SECRET,
      :code => params[:code]
    }

    response = RestClient.post('https://github.com/login/oauth/access_token', data, :accept => :json)
    body = JSON.parse(response.body)

    if body['access_token']
      upsert_user(body['access_token'], params[:state])
    else
      redirect_to '/#on-the-fence'
    end
  end


  # Call to Github's API to get user info - upsert user on response
  def upsert_user(access_token, state)
    response = RestClient.get("https://api.github.com/user?access_token=#{access_token}", :accept => :json)
    body = JSON.parse(response.body)

    User.where(gh_username: body['login']).first_or_initialize { |user|
      user.uuid = UUIDTools::UUID.random_create.to_s
    }

    user.assign_attributes({
      name: body['name'],
      email: body['email'],
      pic: body['avatar_url'],
      password: access_token
    })

    user.save!

    cookies[:gh_login] = {
        gh_username: user.gh_username,
        uuid: user.uuid,
        pic: user.pic,
        email: user.email
    }

    # Get the last page they were on before they logged in
    previous_location = get_prev_page_from_state(state)

    redirect_to "/##{previous_location}"
  end

  def get_prev_page_from_state(state)

    if state.include?(PROJECT_STATE)
      project_id = state[(state.index('num') + 3)..(state.length-1)]
      path = "projects/#{project_id}"
    else
      case state
        when UP_FOR_GRABS_STATE
          path = 'up-for-grabs'
        when ON_THE_FENCE_STATE
          path = 'on-the-fence'
        when LAUNCHED_STATE
          path = 'launched'
      end
    end

    path
  end

end
