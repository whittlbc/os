class SuggestionsController < ApplicationController

  def create
    hash = {
      uuid: UUIDTools::UUID.random_create.to_s,
      text: params[:text]
    }

    if params[:uuid].present?
      user = User.find_by(uuid: params[:uuid])
      hash[:user_id] = user.id
    end

    Suggestion.new(hash).save!

    render :json => {}, :status => 200
  end

end
