class ProjectsController < ApplicationController
  include ProjectsHelper

  LICENSES = %w(MIT GPL BSD)
  LANGUAGES = Languages::AllLanguages.fetch
  puts LANGUAGES

  def index
    render :index, :layout => 'layouts/application'
  end

  def create
    @user = User.find_by_uuid(params[:user_uuid])

    project_data = {
        :title => params[:title],
        :user_id => @user.id,
        :uuid => UUIDTools::UUID.random_create.to_s,
        :repo_name => params[:repo_name],
        :description => params[:description],
        :vote_count => 0,
        :license => params[:license],
        :status => params[:status],
        :langs_and_frames => params[:langs_and_frames],
        :anon => params[:anon]
    }

    @project = Project.new(project_data)
    @project.save

    render :json => {:new_project => project_data}
  end

  def createByGH
    @user = User.find_by_uuid(params[:user_uuid])
    client = Octokit::Client.new(:access_token => @user.password)
    repo = client.repository({:user => @user.gh_username, :repo => params[:repo_name]})
    languages = []
    client.languages({:user => @user.gh_username, :repo => params[:repo_name]}).each { |key, value|
      languages.push(key)
    }

    project_data = {
        :title => params[:title],
        :user_id => @user.id,
        :uuid => UUIDTools::UUID.random_create.to_s,
        :repo_name => params[:repo_name],
        :description => repo.description,
        :vote_count => 0,
        :license => params[:license],
        :status => params[:status],
        :langs_and_frames => languages
    }

    @project = Project.new(project_data)
    @project.save

    render :json => {:new_project => project_data}
  end

  def feed
    all_projects = special_sort(Project.where(:status => params[:status]))
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

  def special_sort(arr)
    arr.sort { |a, b|
      if b[:vote_count] == a[:vote_count]
        b[:created_at] <=> a[:created_at]
      else
        b[:vote_count] <=> a[:vote_count]
      end
    }
  end

  private

  def project_params
    params.require(:project).permit(:title, :user_id, :uuid, :repo_name, :description, :vote_count, :license, :status, :anon, :contributors => [], :langs_and_frames => [])
  end


end
