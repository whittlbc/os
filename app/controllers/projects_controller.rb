class ProjectsController < ApplicationController
  def index
    render :index, :layout => 'layouts/application'
  end

  def create
    @project = Project.new(:title => params[:title])
    @project.save
    render :json => {
               :response => 'Go fuck yourself'
           }
  end

end
