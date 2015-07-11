class UsersController < ApplicationController
  require 'rest-client'
  require 'json'


  # Used to create users based off of actual username/email/password login
  def create
    if check_username_availability(params[:username].downcase)
      render :json => {:login_allowed => false}
    else
      @user = User.new(:uuid => UUIDTools::UUID.random_create.to_s,
                       :username => params[:username],
                       :email => params[:email],
                       :password => params[:password])
      @user.save
      render :json => {:login_allowed => true}
    end
  end


  # Method for checking actual username availbility on 'blur' event of loginview's username field for user signup
  def username_test
    if check_username_availability(params[:username].downcase)
      render :json => {:available => false}
    else
      render :json => {:available => true}
    end
  end


  # Ask the DB if the username is already taken
  def check_username_availability (username)
    User.find_by_username(username)
  end


  # Original login function for non-GH login
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


  # Get GH access token from returned code give provide you after OAuth login
  def gh_code
    data = {
      :client_id => User::GH::CLIENT_ID,
      :client_secret => User::GH::CLIENT_SECRET,
      :code => params[:code]
    }
    response = RestClient.post('https://github.com/login/oauth/access_token', data, :accept => :json)
    body = JSON.parse(response.body)
    if body["access_token"]
      login_or_create(body["access_token"])
    else
      render :json => {:status => 'Error getting access token'}
    end
  end


  # GH login - If user's not there, create him
  def login_or_create(access_token)
    response = RestClient.get("https://api.github.com/user?access_token=#{access_token}", :accept => :json)
    body = JSON.parse(response.body)
    gh_username = body["login"]
    name = body["name"]
    email = body["email"]
    pic = body["avatar_url"]
    old_user = User.find_by_gh_username(gh_username)

    if old_user.nil?
      # Create new User
      @user = User.new(:uuid => UUIDTools::UUID.random_create.to_s,
                       :gh_username => gh_username,
                       :name => name,
                       :pic => pic,
                       :email => email,
                       :password => access_token)
      @user.save
    else
      old_user.update_attributes(:password => access_token)
    end

    render :json => {
               :gh_username => gh_username,
               :name => name,
               :pic => pic,
               :email => email
           }
  end


  # Get user by gh_username --> Most likely pulled from cookie
  def get_by_gh_username

    user = User.find_by_gh_username(params[:gh_username])
    if user.nil?
      render :json => {:found_user => false}
    else
      render :json => {
                 :found_user => true,
                 :gh_username => user.gh_username,
                 :name => user.name,
                 :pic => user.pic,
                 :email => user.email
             }
    end
  end

end
