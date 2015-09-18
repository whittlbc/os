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


  # GH login - If user's not there, create him
  def upsert_user(access_token, state)
    response = RestClient.get("https://api.github.com/user?access_token=#{access_token}", :accept => :json)
    body = JSON.parse(response.body)
    gh_username = body['login']
    name = body['name']
    email = body['email']
    pic = body['avatar_url']
    old_user = User.find_by_gh_username(gh_username)
    json_response = {
        :gh_username => gh_username,
        :name => name,
        :pic => pic,
        :email => email,
        :password => access_token
    }

    # CAN TOTALLY USE find_or_initialize_by here
    if old_user.nil?
      # Create new User
      @user = User.new(:uuid => UUIDTools::UUID.random_create.to_s,
                       :gh_username => gh_username,
                       :name => name,
                       :pic => pic,
                       :email => email,
                       :password => access_token)
      @user.save
      json_response[:user_uuid] = @user.uuid
      json_response[:id] = @user.id
    else
      old_user.update_attributes(:password => access_token)
      json_response[:user_uuid] = old_user.uuid
      json_response[:id] = old_user.id
    end

    prevhash = get_prev_page_from_state(state)

    redirect_to "/#login/#{gh_username}?#{prevhash}"
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
