class ApplicationController < ActionController::Base
  protect_from_forgery

  def not_found
    redirect_to '/#ideas'
  end

end
