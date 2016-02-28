class HomeController < ApplicationController

  before_filter :get_user_info

  def index
    @user_pic = @user_info['pic']
    render :index, :layout => 'layouts/application'
  end

end
