class EvolutionsController < ApplicationController

  def create_new_evolution
    user = User.find_by(uuid: params[:user_uuid])
    project = Project.find_by(id: params[:project_id])

    if !user.nil? && !project.nil? && !params[:text].nil?
      evolution = Evolution.new(
          :uuid => UUIDTools::UUID.random_create.to_s,
          :project_id => project.id,
          :user_id => user.id,
          :text => params[:text]
      )
      evolution.save!
      render :json => project.evolutions.order(:created_at)
    else
      render :json => {:error => 'Could not create evolution item'}
    end
  end

end