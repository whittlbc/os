class UsersController < ApplicationController
  require 'rest-client'
  require 'json'

  def create
    if check_username_availability(params[:username].downcase)
      render :json => {:login_allowed => false}
    else
      @user = User.new(:uuid => UUIDTools::UUID.random_create.to_s,
                       :username => params[:username],
                       # :gh_username => params[:gh_username],
                       :email => params[:email],
                       :password => params[:password])
      @user.save
      render :json => {:login_allowed => true}
    end
  end

  def username_test
    if check_username_availability(params[:username].downcase)
      render :json => {:available => false}
    else
      render :json => {:available => true}
    end
  end

  def check_username_availability (username)
    User.find_by_username(username).empty
  end

  def login

    username_or_email = params[:username_or_email].downcase
    password = params[:password]

    if !User.username_login(username_or_email, password).empty? || !User.email_login(username_or_email, password).empty?
      # go ahead and get his info and pass it back
      render :json => {:exists => true}
    else
      render :json => {:exists => false}
    end
  end

  def gh_code
    data = {
      :client_id => 'bfdb73ed12138dddbfcc',
      :client_secret => '91347eb62e866f7960510aafd81c2f41b2dda2d4',
      :code => params[:code]
    }
    response = RestClient.post('https://github.com/login/oauth/access_token', data, :accept => :json)
    body = JSON.parse(response.body)
    if body["access_token"]
      login_or_create(body["access_token"])
      render :json => {:status => 'got access token'}
    else
      render :json => {:status => 'Error getting access token'}
    end
  end

  def login_or_create(access_token)
    response = RestClient.get("https://api.github.com/user?access_token=#{access_token}", :accept => :json)
    body = JSON.parse(response.body)
    gh_username = body["login"]
    name = body["name"]
    email = body["email"]
    pic = body["avatar_url"]
    if User.find_by_gh_username(gh_username)
      # Just Login
    else
      # Create new User
      @user = User.new(:uuid => UUIDTools::UUID.random_create.to_s,
                       :gh_username => gh_username,
                       :name => name,
                       :pic => pic,
                       :email => email,
                       :password => access_token)
      @user.save
    end
  end

end
