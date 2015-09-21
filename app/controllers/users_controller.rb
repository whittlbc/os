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
                 :email => user.email,
                 :password => user.password,
                 :user_uuid => user.uuid,
                 :id => user.id
             }
    end
  end

  def get_all_user_repos
    user = User.find_by_gh_username(params[:gh_username])
    client = Octokit::Client.new(:access_token => user.password)
    repo_list = []
    repos = client.repositories(:user => params[:gh_username]).each { |repo|
      repo_list.push(repo.name)
    }
    render :json => {:repos => repo_list}
  end

  def get_repo_details
    user = User.find_by_gh_username(params[:gh_username])
    client = Octokit::Client.new(:access_token => user.password)
    repo_map = {}
    repo = client.repository(:user => params[:gh_username], :repo => params[:repo_name]).each { |detail|
      repo_map[detail[0]] = detail[1]
    }
    repo_map['languages'] = client.languages(:user => params[:gh_username], :repo => params[:repo_name]).map{ |langArray|
      langArray[0]
    }
    render :json => repo_map
  end

  def star
    user = User.find_by(uuid: params[:user_uuid])
    if !user.nil?
      params[:star] ? user.update_attributes(:starred => user.starred + [params[:project_id]]) :
          user.update_attributes(:starred => user.starred - [params[:project_id]])
      render :json => {:status => 200}
    else
      render :json => {:status => 500, :message => 'Could not find user by passed ID'}
    end
  end

  def upvote
    user = User.find_by(uuid: params[:user_uuid])
    if !user.nil?
      if params[:comment]
        user.update_attributes(:upvoted_comments => user.upvoted_comments + [params[:comment_id]])
      else
        user.update_attributes(:upvoted_projects => user.upvoted_projects + [params[:project_id]])
      end
      render :json => {:status => 200}
    else
      render :json => {:status => 500, :message => 'Could not find user by passed ID'}
    end
  end


  private

  def user_params
    params.require(:user).permit(:email, :gh_username, :name, :password, :username, :uuid, :pic, :upvoted => [], :following => [], :starred => [])
  end

end
