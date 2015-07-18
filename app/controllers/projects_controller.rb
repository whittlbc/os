class ProjectsController < ApplicationController

  def index
    render :index, :layout => 'layouts/application'
  end

  def create
    @user = User.find_by_uuid(params[:user_uuid])

    @project = Project.new(:title => params[:title],
                           :user_id => @user.id,
                           :uuid => UUIDTools::UUID.random_create.to_s,
                           :repo_name => params[:repo_name],
                           :description => params[:description],
                           :vote_count => 0,
                           :license => params[:license],
                           :status => params[:status],
                           :langs_and_frames => params[:langs_and_frames],
                           :anon => params[:anon])
      @project.save
      render :json => {:response => 'Successfully created project'}
  end

  def feed
    all_projects = Project.all
    render :json => all_projects
  end

  def update
    @project = Project.find(params[:id])

    if @project.update_attributes(:title => params[:title])
      render :json => {:response => 'Successfully updated project'}
    else
      render :json => {:response => 'Error updating project'}
    end
  end

  def destroy
    @project = Project.find(params[:id])

    if @project
      @project.destroy
      render :json => {:response => 'Successfully deleted project'}
    else
      render :json => {:response => 'Error deleting project'}
    end

  end

  private

  def project_params
    params.require(:project).permit(:title, :user_id, :uuid, :repo_name, :description, :vote_count, :license, :status, :anon, :contributors => [], :langs_and_frames => [])
  end


end
