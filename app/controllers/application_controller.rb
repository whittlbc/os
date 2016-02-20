class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :set_headers

  def not_found
    redirect_to '/#ideas'
  end

  def set_headers
    headers['Content-Type'] = 'text/html; charset=utf-8'
  end

end
