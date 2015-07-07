class ProjectsController < ApplicationController

  def index
    render :index, :layout => 'layouts/application'
  end

  def create
    @project = Project.new(:title => params[:title])
    if @project
      @project.save
      render :json => {:response => 'Successfully created project'}
    else
      render :json => {:response => 'Error creating project'}
    end
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

end
