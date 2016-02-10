class UsersController < ApplicationController
  require 'rest-client'
  require 'json'

  def get_non_cached_user_info
    user = User.find_by(uuid: params[:uuid])

    if user.present?
      # return the stuff not already stored in local storage
      response_hash = {
        :gh_access_token => user.password,
        :notifications => user.get_notifications
      }

      render :json => response_hash
    else
      render :json => {}, :status => 500
    end
  end

  # DEPRECATED -- Called from Front End Github model instead now since it wasn't respecting the :type param
  def get_all_user_repos
    user = User.find_by(uuid: params[:uuid])

    client = Octokit::Client.new(:access_token => user.password)
    repo_list = []
    client.repositories(:user => user.gh_username).each { |repo|
      repo_list.push(repo.name)
    }
    render :json => {:repos => repo_list}
  end


  # DEPRECATED -- Called from Front End Github model instead now
  def get_repo_details
    user = User.find_by(uuid: params[:uuid])
    client = Octokit::Client.new(:access_token => user.password)
    repo_map = {}
    client.repository(:user => user.gh_username, :repo => params[:repo_name]).each { |detail|
      repo_map[detail[0]] = detail[1]
    }
    repo_map['languages'] = client.languages(:user => user.gh_username, :repo => params[:repo_name]).map{ |langArray|
      langArray[0]
    }
    render :json => repo_map
  end

  def star
    user = User.find_by(uuid: params[:uuid])
    project = Project.find_by(uuid: params[:project_uuid])

    if user.present? && project.present?
      params[:star] ? user.update_attributes(:starred => user.starred + [project.id]) :
          user.update_attributes(:starred => user.starred - [project.id])

      render :json => {}, :status => 200
    else
      render :json => {:message => 'Could not find user or project'}, :status => 500
    end
  end

  def get_starred_projects
    user = User.find_by(uuid: params[:uuid])

    if user.present?
      starred = Project.includes(:user).where(:id => user.starred).active.map { |project|
        {
            :uuid => project.uuid,
            :title => project.title,
            :subtitle => project.subtitle,
            :owner_gh_username => project.user.gh_username,
            :status => project.status
        }
      }.sort_by { |p| p[:title].try(:downcase) }

      render :json => starred
    else
      render :json => {:error => 'Tried to get starred projects, but user was nil'}, :status => 500
    end
  end

  def get_my_projects
    user = User.find_by(uuid: params[:uuid])

    if user.present?
      my_projects = user.projects.active.map { |project|
        {
          :uuid => project.uuid,
          :title => project.title,
          :subtitle => project.subtitle,
          :status => project.status
        }
      }

      contributing_project_ids = Contributor.where(:user_id => user.id).map(&:project_id)
      just_contributing_projects = []

      Project.includes(:user).where(:id => contributing_project_ids).active.each { |proj|
        # only get projects where you're not the owner
        if proj.user_id != user.id
          just_contributing_projects.push({
            :uuid => proj.uuid,
            :title => proj.title,
            :subtitle => proj.subtitle,
            :owner_gh_username => proj.user.gh_username,
            :status => proj.status
          })
        end
      }

      all_projects = (my_projects + just_contributing_projects).sort_by { |p| p[:title].try(:downcase) }

      render :json => all_projects
    else
      render :json => {:error => 'Tried to get your projects, but user was nil'}, :status => 500
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :gh_username, :name, :password, :username, :uuid, :pic, :upvoted => [], :following => [], :starred => [])
  end

end