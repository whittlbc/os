class EvolutionsController < ApplicationController

  def create_new_evolution
    user = User.find_by(uuid: params[:user_uuid])
    project = Project.find_by(uuid: params[:project_uuid])

    if !user.nil? && !project.nil? && !params[:text].nil?
      evolution = Evolution.new(
          :uuid => UUIDTools::UUID.random_create.to_s,
          :project_id => project.id,
          :user_id => user.id,
          :text => params[:text]
      )
      evolution.save!
      render :json => project.evolutions.active.order(:created_at)
    else
      render :json => {:error => 'Could not create evolution item'}
    end
  end

  def delete_evolution_item
    evolution = Evolution.find_by(uuid: params[:uuid])
    if !evolution.nil?
      evolution.update_attributes(:is_destroyed => true)
      render :json => evolution.project.evolutions.active.order(:created_at)
    else
      render :json => {:status => 500, :message => 'Could not find evolution by uuid'}
    end
  end

end