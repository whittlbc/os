class SuggestionsController < ApplicationController

  def create
    hash = {
      uuid: UUIDTools::UUID.random_create.to_s,
      text: params[:text]
    }

    from_logged_in_user = params[:uuid].present?

    if from_logged_in_user
      user = User.find_by(uuid: params[:uuid])
      hash[:user_id] = user.id
    end

    Suggestion.new(hash).save!

    UserMailer.notify_admin_of_suggestion(
      user: from_logged_in_user ? user : nil,
      text: params[:text]
    )

    render :json => {}, :status => 200
  end

end
