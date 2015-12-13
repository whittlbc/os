class SuggestionsController < ApplicationController

  def create
    user = User.find_by(uuid: params[:uuid])

    if user.present?
      Suggestion.new(
        uuid: UUIDTools::UUID.random_create.to_s,
        user_id: user.id,
        text: params[:text]
      ).save!

      render :json => {}, :status => 200
    else
      render :json => {:message => 'Cant find user by that uuid'}, :status => 500
    end

  end

end
