class HomeController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def index
    render :index, :layout => 'layouts/application'
  end

end
