class HomeController < ApplicationController

  def index
    render :index, :layout => 'layouts/application'
  end

end
