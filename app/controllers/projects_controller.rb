class ProjectsController < ApplicationController
  require 'slack'
  require 'net/http'
  require 'net/https'
  require 'uri'
  require 'json'
  require 'cgi'
  require 'ostruct'
  require 'rest-client'
  require 'json'
  require 'date'

  def index
    render :index, :layout => 'layouts/application'
  end

  def fetch_details
    project = Project.find_by(id: params[:id])
    owner_gh_username = project.get_owner_gh_username

    if !project.blank?
      project_details = {
        :anon => project.anon,
        :post_date => get_general_date(project.created_at),
        :description => project.description,
        :id => project.id,
        :langs_and_frames => project.langs_and_frames,
        :license => project.license,
        :privacy => project.privacy,
        :repo_name => project.repo_name,
        # :getting_repo_data => !project.repo_name.blank? && !owner_gh_username.blank?,
        :getting_repo_data => false,
        :status => project.status,
        :title => project.title,
        :user_id => project.user_id,
        :uuid => project.uuid,
        :vote_count => project.vote_count,
        :owner_gh_username => owner_gh_username,
        :admin => Contributor.admin(project.id).map { |contrib| contrib.try(:user).try(:gh_username) },
        :integrations => project.integrations
      }

      comments = Comment.where(project_id: params[:id])

      owner = []
      admin = []
      others = []
      Contributor.includes(:user).where(project_id: params[:id]).each { |contrib|
        obj = {
            'login' => contrib.try(:user).try(:gh_username),
            'avatar_url' => contrib.try(:user).try(:pic),
            'admin' => contrib.admin,
            'owner' => contrib.try(:user).try(:id) == project.try(:user).try(:id)
        }
        if obj['owner']
          owner.push(obj)
        elsif obj['admin']
          admin.push(obj)
        else
          others.push(obj)
        end
      }

      admin = admin.sort_by { |obj| obj['login'].downcase }
      others = others.sort_by { |obj| obj['login'].downcase }

      project_details[:contributors] = {
          :admin => owner + admin,
          :others => others
      }

      render :json => {:project => project_details, :comments => comments}
    else
      render :json => {:message => 'Can not find project from id that was passed'}
    end

  end

  def get_general_date(date)
    min_diff = (Time.now.utc - date.utc) / 60
    if min_diff > 60
      hour_diff = min_diff / 60
      if hour_diff > 24
        day_diff = hour_diff / 24
        if day_diff > 365
          year_diff = day_diff / 365
          year_diff.floor == 1 ? '1 year ago' : "#{year_diff.floor} years ago"
        else
          day_diff.floor == 1 ? '1 day ago' : "#{day_diff.floor} days ago"
        end
      else
        hour_diff.floor == 1 ? '1 hour ago' : "#{hour_diff.floor} hours ago"
      end
    else
      min_diff.ceil == 1 ? '1 minute ago' : "#{min_diff.ceil} minutes ago"
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
    @user = User.find_by(gh_username: params[:gh_username])

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

    contrib_data = {
        :uuid => UUIDTools::UUID.random_create.to_s,
        :project_id => @project.id,
        :user_id => @user.id,
        :admin => true
    }
    contributor = Contributor.new(contrib_data)
    contributor.save

    evolution_data = {
        :uuid => UUIDTools::UUID.random_create.to_s,
        :project_id => @project.id,
        :property => 'Creation'
    }
    evolution = Evolution.new(evolution_data)
    evolution.save

    render :json => @project
  end

  def feed
    projects_of_type = Project.includes(:user).where(:status => params[:status]).map { |project|
      {
          :title => project.title,
          :id => project.id,
          :uuid => project.uuid,
          :vote_count => project.vote_count,
          :contributors => project.contributors,
          :license => project.license,
          :privacy => project.privacy,
          :langs_and_frames => project.langs_and_frames,
          :owner_gh_username => project.get_owner_gh_username,
          :owner_pic => project.get_owner_pic,
          :status => project.status
      }
    }
    results = special_sort(projects_of_type).slice(0, 30)
    render :json => results
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
        owner_gh_username: proj.get_owner_gh_username,
        owner_pic: proj.get_owner_pic,
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

  def post_new_comment
    user = User.find_by(uuid: params[:poster_uuid])
    if !user.nil?
      comment_info = {
          :uuid => UUIDTools::UUID.random_create.to_s,
          :text => params[:text],
          :project_id => params[:project_id],
          :user_id => user.id,
          :vote_count => 0,
          :feed => params[:feed],
          :parent_id => params[:parent_id]
      }
      comment = Comment.new(comment_info)
      comment.save

      all_comments_of_feed_type = comments_for_feed(params[:project_id], params[:feed])
      render :json => all_comments_of_feed_type
    else
      render :json => {:status => 500}
    end
  end

  def fetch_comments
    comments = comments_for_feed(params[:project_id], params[:feed])
    render :json => comments
  end

  def comments_for_feed(project_id, feed_status)
    comments = []
    Comment.includes(:user).top_level(project_id, feed_status).vote_and_time_sort.each { |comment|
      comment_obj = {
          :comment => {
            :userPic => comment.try(:user).try(:pic),
            :posterGHUsername => comment.try(:user).try(:gh_username),
            :voteCount => comment.vote_count,
            :postTime => get_general_date(comment.created_at),
            :text => comment.text,
            :id => comment.id,
            :parentID => comment.parent_id,
            :feed => comment.feed
          },
          :children => get_comment_children(comment)
      }
      comments.push(comment_obj)
    }
    comments
  end

  def get_comment_children(comment)
    if comment.children.empty?
      []
    else
      comments = []
      comment.children.vote_and_time_sort.each { |child|
        comment_obj = {
            :comment => {
                :userPic => child.try(:user).try(:pic),
                :posterGHUsername => child.try(:user).try(:gh_username),
                :voteCount => child.vote_count,
                :postTime => get_general_date(child.created_at),
                :text => child.text,
                :id => child.id,
                :parentID => child.parent_id,
                :feed => child.feed
            },
            :children => get_comment_children(child)
        }
        comments.push(comment_obj)
      }
      comments
    end
  end

  def comment_vote
    comment = Comment.find_by(id: params[:id])
    comment.update_attributes(:vote_count => params[:new_vote_count])
    render :json => {:status => 200}
  end

  def get_up_for_grabs
    hard_coded_projects = Project.where(:status => params[:status]).map { |project|
      owner = User.find_by(id: project.user_id)
      {
          :title => project.title,
          :description => project.description,
          :langsFrames => project.langs_and_frames,
          :userPic => owner.pic
      }
    }
    render :json => hard_coded_projects
  end

  def get_up_for_grabs_details
    project = Project.find_by(id: params[:id])
    if !project.nil?
      data = {
          :id => project.id,
          :title => project.title,
          :description => project.description,
          :langsFrames => project.langs_and_frames
      }
      render :json => data
    else
      render :json => {:status => 500, :message => 'Cant find that project based on the passed ID'}
    end
  end


  def pull_project
    project = Project.find_by(id: params[:id])
    project.update_attributes(:was_pulled => true)
    render :json => {:status => 200}
  end

  def get_evolution
    project = Project.find_by(id: params[:id])

    if !project.nil?
      render :json => project.evolutions.order(:created_at)
    else
      render :json => {:status => 500, :message => 'Could not find project by id'}
    end
  end





  private

  def project_params
    params.require(:project).permit(:title, :user_id, :uuid, :repo_name, :description, :vote_count, :license, :status, :anon, :privacy, :contributors => [], :langs_and_frames => [])
  end


end
