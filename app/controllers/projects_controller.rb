class ProjectsController < ApplicationController

  require "slack"
  require "net/http"
  require "net/https"
  require "uri"
  require "json"
  require "cgi"

  def index
    render :index, :layout => 'layouts/application'
  end

  def fetch_details
    project = Project.find_by(id: params[:id])
    if !project.blank?
      comments = Comment.where(project_id: params[:id])
      render :json => {:project => project, :comments => comments}
    else
      render :json => {:message => "Can't find project from id that was passed"}
    end

  end

  def launch

    # WHAT SHOULD BE HERE

    # project = Project.find_by(uuid: params[:project_uuid])
    # user = User.find_by(uuid: params[:user_uuid])
    # client = Octokit::Client.new(:access_token => user.password)
    # options = {
    #     :description => project.description,
    #     :auto_init => true
    # }
    # client.create_repository(project.repo_name, options)


    # JUST ME HARDCODING SOME STUFF
    user = User.find_by(uuid: "35e982e1-c95d-43ac-ae60-a532596c5495")
    client = Octokit::Client.new(:access_token => user.password)
    client.create_repository('from-os')
    render :json => {:message => "Successfullly created repo"}
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
        :anon => params[:anon],
        :privacy => params[:privacy]

    }

    @project = Project.new(project_data)
    @project.save

    render :json => {:new_project => @project}
  end

  def create_by_gh
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
        :langs_and_frames => languages,
        :privacy => params[:privacy]
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

  def filtered_feed
    filters = params[:filters]
    filtered_projects = Project.where(status: filters[:status])
    filters.each { |filter|
      if filter[1].is_a?(Array)
        filtered_projects = filtered_projects.where.overlap(filter[0] => filter[1])
      else
        filtered_projects = filtered_projects.where(filter[0] => filter[1])
      end
    }
    render :json => special_sort(filtered_projects)
  end

  def pull_from_ideas
    ideas = special_sort(Project.where(:status => 0))
    render :json => ideas
  end

  # Join project as collaborator
  def join
    owner = User.find_by(id: params[:owner_id])
    joiner = User.find_by(uuid: params[:joiner_uuid])
    project = Project.find_by(uuid: params[:project_uuid])
    if !owner.nil? && !joiner.nil?
      add_to_contributors(joiner, project)
      client = Octokit::Client.new(:access_token => owner.password)
      client.add_collaborator({:user => owner.gh_username, :repo => project.repo_name}, joiner.gh_username)
      integration = Integration.where(project_id: project.id, service: 'Slack').first
      if !integration.nil?
        invite_slack_user(joiner, integration.key)
      end
      render :json => { :message => 'Successfully added contributor' }
    else
      render :json => {:status => 500, :message => 'Could not find user by passed gh_username'}
    end
  end

  def invite_slack_user(user, api_token)
    Slack.configure do |config|
      config.token = api_token
    end
    email = user.email
    first_name = !user.name.empty? ? user.name.split(' ')[0] : user.gh_username
    base = "https://#{get_team_name(Slack)}.slack.com"
    hash = "/api/users.admin.invite?t=#{Time.now.to_i}"
    data = "email=#{CGI.escape(email)}&channels=#{get_channels(Slack)}&first_name=#{CGI.escape(first_name)}&token=#{api_token}&set_active=true&_attempts=1"
    uri = URI.parse(base)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    request = Net::HTTP::Post.new(hash)
    request.add_field('Content-Type', 'application/x-www-form-urlencoded')
    request.body = data
    http.request(request)
  end

  # Get all channels for a team
  def get_channels(slack)
    count = 0
    all_channels = ''
    request = slack.channels_list
    channels_list = request["channels"]
    channels_list.each do |channel|
      count += 1
      if count == channels_list.length
        all_channels += channel["id"]
      else
        all_channels += channel["id"] + ','
      end
    end
    all_channels
  end

  def add_to_contributors(user, project)
    contributors = project.contributors
    contributors.push(user.id)
    project.update_attributes(:contributors => contributors)
    obj = {
        :uuid => UUIDTools::UUID.random_create.to_s,
        :name => user.name,
        :project_id => project.id,
        :user_id => user.id
    }
    new_contributor = Contributor.new(obj)
    new_contributor.save
  end

  def get_team_name(slack)
    request = slack.team_info
    team_name = request["team"]["name"]
    team_name
  end

  # Apply vote
  def vote
    @project = Project.find_by(uuid: params[:uuid])
    @project.update_attributes(:vote_count => (@project.vote_count + 1))
    render :json => {:response => 'Successfully applied vote to project'}
  end

  def universal_search
    projects = Project.all.map { |proj|
      {
        uuid: proj.uuid,
        id: proj.id,
        title: proj.title,
        description: proj.description,
        contributors: proj.contributors,
        owner: proj.user,
        owner_gh_username: proj.user.gh_username,
        created_at: proj.created_at,
        repo_name: proj.repo_name,
        vote_count: proj.vote_count,
        status: proj.status,
        anon: proj.anon,
        langs_and_frames: proj.langs_and_frames,
        license: proj.license,
        privacy: proj.privacy,
        search_result: true
      }
    }
    render :json => projects
  end

  def add_comment
    user = User.find_by(uuid: params[:user_uuid])
    comment_info = {
        :uuid => UUIDTools::UUID.random_create.to_s,
        :text => params[:text],
        :project_id => params[:project_id],
        :user_id => user.id,
        :vote_count => 0
    }
    comment = Comment.new(comment_info)
    comment.save

    render :json => {:message => 'Successfully created comment'}

  end


  private

  def project_params
    params.require(:project).permit(:title, :user_id, :uuid, :repo_name, :description, :vote_count, :license, :status, :anon, :privacy, :contributors => [], :langs_and_frames => [])
  end


end
