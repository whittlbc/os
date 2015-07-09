class UsersController < ApplicationController

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
    User.find_by_username(username)
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

end
