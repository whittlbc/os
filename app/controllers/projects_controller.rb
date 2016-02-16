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

  include ProjectHelper

  IDEAS = 0
  LAUNCHED = 1

  PROJECT_ASSET = 0
  SLACK_ASSET = 1
  HIPCHAT_ASSET = 2

  LANG_FILTERS_NAME = 'langs_and_frames'

  def service_for_asset(asset)
    case asset
      when SLACK_ASSET
        'Slack'
      when HIPCHAT_ASSET
        'HipChat'
    end
  end

  def index
    render :index, :layout => 'layouts/application'
  end

  def fetch_details
    if params[:user_uuid]
      user = User.find_by(uuid: params[:user_uuid])
    end

    project = Project.find_by(uuid: params[:uuid])

    if !project.nil? && project.is_active?
      owner_gh_username = project.get_owner_gh_username
      admin_arr = Contributor.admin(project.id).map { |contrib|
        contrib.try(:user).try(:gh_username)
      }

      is_owner = user ? (user.gh_username === project.try(:user).try(:gh_username)) : false

      if !project.blank?
        project_details = {
          :post_date => project.created_at.utc.iso8601,
          :description => project.description,
          :langs_and_frames => project.langs_and_frames,
          :license => project.license,
          :privacy => project.privacy,
          :domains => project.domains || [],
          :seeking => project.seeking || [],
          :repo_name => project.repo_name,
          :getting_repo_data => !project.repo_name.blank? && !owner_gh_username.blank?,
          :status => project.status,
          :title => project.title,
          :subtitle => project.subtitle,
          :user_uuid => project.user.uuid,
          :uuid => project.uuid,
          :voted => user ? user.voted_on_project(project.id) : nil,
          :vote_count => project.vote_count,
          :starred => project.is_starred_for_user?(user),
          :owner_gh_username => owner_gh_username,
          :admin => admin_arr,
          :integrations => project.integrations,
          :is_admin => is_owner || (user ? admin_arr.include?(user.gh_username) : false),
          :is_owner => is_owner,
          :is_contributor => false,
          :pending_project_request => user ? user.has_pending_request?(project.id, PROJECT_ASSET) : false,
          :pending_slack_request => user ? user.has_pending_request?(project.id, SLACK_ASSET) : false,
          :pending_hipchat_request => user ? user.has_pending_request?(project.id, HIPCHAT_ASSET) : false,
          :is_slack_member => user ? project.is_slack_member?(user.id) : false,
          :is_hipchat_member => user ? project.is_hipchat_member?(user.id) : false,
          :up_for_grabs => project.up_for_grabs
        }

        comments = Comment.where(project_id: project.id)

        owner = []
        admin = []
        others = []

        Contributor.includes(:user).where(project_id: project.id).each { |contrib|
          obj = {
              'login' => contrib.try(:user).try(:gh_username),
              'html_url' => "https://github.com/#{contrib.try(:user).try(:gh_username)}",
              'avatar_url' => contrib.try(:user).try(:pic),
              'admin' => contrib.admin,
              'owner' => contrib.try(:user).try(:id) == project.try(:user).try(:id),
              'not_gh' => true,
              'contributions' => 0
          }
          if obj['owner']
            owner.push(obj)
          elsif obj['admin']
            admin.push(obj)
          else
            others.push(obj)
          end

          if user.present? && obj['login'] === user.gh_username
            project_details[:is_contributor] = true
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
    else
      render :json => {:status => 404}
    end
  end

  def send_invite_emails
    sender = User.find_by(:uuid => params[:user_uuid])
    project = Project.find_by(:uuid => params[:uuid])

    if !sender.nil? && !project.nil?
      project_name = (!project.title.nil? && !project.title.empty?) ? project.title : project.repo_name
      client = Octokit::Client.new(:access_token => User.find_by(email: 'benwhittle31@gmail.com').password)
      ProjectHelper.delay.fetch_gh_email(client, sender.gh_username, params[:usernames], project_name, 0, [], project.uuid)
      render :json => {}, :status => 200
    else
      render :json => {:message => 'Either sender was nil or project was nil by uuid'}, :status => 500
    end
  end

  def create

    begin
      allowable_params = ProjectHelper.get_allowable_creation_params(params)

      # Make sure both title and subtitle are defined
      if allowable_params[:title].blank? || allowable_params[:subtitle].blank?
        render :json => {:message => 'Project creation failed: Title and Subtitle both have to exist'}, :status => 500
        return
      end

      user = User.find_by(uuid: allowable_params[:user_uuid])

      project_data = {
        :title => allowable_params[:title],
        :subtitle => allowable_params[:subtitle],
        :user_id => user.id,
        :uuid => UUIDTools::UUID.random_create.to_s,
        :repo_name => allowable_params[:repo_name],
        :description => allowable_params[:description],
        :vote_count => 0,
        :license => allowable_params[:license],
        :status => allowable_params[:status],
        :langs_and_frames => allowable_params[:langs_and_frames],
        :privacy => allowable_params[:privacy],
        :domains => allowable_params[:domains],
        :seeking => allowable_params[:seeking],
        :up_for_grabs => allowable_params[:up_for_grabs],
        :contributors_count => 1
      }

      project = Project.new(project_data)
      project.save!

      contrib_data = {
          :uuid => UUIDTools::UUID.random_create.to_s,
          :project_id => project.id,
          :user_id => user.id,
          :admin => true
      }

      Contributor.new(contrib_data).save!

      if !allowable_params[:slackURL].nil? && !allowable_params[:slackURL].empty?
        slackURL = allowable_params[:slackURL]
        slack_data = {
            :service => 'Slack',
            :project_id => project.id,
            :url => slackURL,
            :users => [user.id]
        }
        if !allowable_params[:slackAPIKey].nil? && !allowable_params[:slackAPIKey].empty?
          slack_data[:key] = allowable_params[:slackAPIKey]
        end
        Integration.new(slack_data).save!
      end

      if !allowable_params[:hipChatURL].nil? && !allowable_params[:hipChatURL].empty?
        hipChatURL = allowable_params[:hipChatURL]
        Integration.new(service: 'HipChat', project_id: project.id, url: hipChatURL, users: [user.id]).save!
      end

      if !allowable_params[:irc].nil? && !allowable_params[:irc].empty?
        Integration.new(service: 'IRC', project_id: project.id, irc: allowable_params[:irc], users: [user.id]).save!
      end

      render :json => {:uuid => project.uuid}
    rescue
      render :json => {:message => 'Project creation failed'}, :status => 500
    end
  end

  def ensureURL(url)
    uri = URI.parse(url)
    if uri && uri.kind_of?(URI::HTTP)
      index = url.index('http') + 4
      url.insert(index, 's')
    elsif uri && uri.kind_of?(URI::HTTPS)
      url
    else
      "http://#{url}"
    end
  end

  def feed
    if params[:user_uuid]
      user = User.find_by(uuid: params[:user_uuid])
    end
    projects_of_type = Project.includes(:user).where(:status => params[:status]).active.map { |project|
      {
          :anon => project.anon,
          :title => project.title,
          :subtitle => project.subtitle,
          :created_at => project.created_at.utc.iso8601,
          :uuid => project.uuid,
          :vote_count => project.vote_count,
          :total_contributors => project.contributors_count,
          :license => project.license,
          :privacy => project.privacy,
          :langs_and_frames => project.langs_and_frames,
          :owner_gh_username => project.get_owner_gh_username, # the reason for .includes(:user)
          :owner_pic => project.get_owner_pic,
          :voted => user ? user.voted_on_project(project.id) : nil,
          :status => project.status,
          :total_comments => project.comments_count,
          :domains => project.domains,
          :seeking => project.seeking,
          :up_for_grabs => project.up_for_grabs
      }
    }

    limit = !params[:limit].nil? ? params[:limit].to_i : 30
    got_all = (limit >= projects_of_type.length)
    render :json => {:projects => special_sort(projects_of_type, params[:sortType]).slice(0, limit), :gotAll => got_all}
  end

  def destroy_project
    project = Project.find_by(uuid: params[:uuid])

    if !project.nil?
      project.update_attributes(is_destroyed: true)
      render :json => {:status => 200}
    else
      render :json => {:status => 500, :message => 'Couldn\'t find project by uuid'}
    end
  end

  def destroy_comment
    user = User.find_by(uuid: params[:user_uuid])
    project = Project.find_by(uuid: params[:uuid])

    if !user.nil?
      comment = Comment.find_by(uuid: params[:comment_uuid])

      if !comment.nil?
        comment.update_attributes(is_destroyed: true)
        project.update_attributes(:comments_count => (project.comments_count - 1))

        comment.children.map { |child|
          child.update_attributes(is_destroyed: true)
          project.update_attributes(:comments_count => (project.comments_count - 1))
        }

        all_comments_of_feed_type = comments_for_feed(project.id, params[:feed], user)
        render :json => all_comments_of_feed_type
      end
    else
      render :json => {:status => 500}
    end
  end

  def special_sort(arr, sort_type)
    if !sort_type.nil? && sort_type.to_i === 1
      arr.sort { |a, b| b[:created_at] <=> a[:created_at] }
    else
      arr.sort { |a, b|
        if b[:vote_count] == a[:vote_count]
          b[:created_at] <=> a[:created_at]
        else
          b[:vote_count] <=> a[:vote_count]
        end
      }
    end
  end

  def filtered_feed
    if params[:user_uuid]
      user = User.find_by(uuid: params[:user_uuid])
    end

    filters = params[:filters]

    if filters.present?

      filtered_projects = Project.includes(:user).where!(status: params[:status]).active

      filters.each { |filter|
        if filter[0] == LANG_FILTERS_NAME

          # AND
          if params[:lang_filters_and] === true
            filtered_projects.where!.contains(filter[0] => filter[1])

          # OR (default)
          else
            filtered_projects.where!.overlap(filter[0] => filter[1])
          end

        else
          if filter[1].is_a?(Array)
            filtered_projects.where!.overlap(filter[0] => filter[1])
          else
            filtered_projects.where!(filter[0] => filter[1])
          end
        end
      }

      projects = filtered_projects.map { |project|
        {
            :anon => project.anon,
            :title => project.title,
            :subtitle => project.subtitle,
            :created_at => project.created_at.utc.iso8601,
            :uuid => project.uuid,
            :vote_count => project.vote_count,
            :total_contributors => project.contributors_count,
            :license => project.license,
            :privacy => project.privacy,
            :langs_and_frames => project.langs_and_frames,
            :owner_gh_username => project.get_owner_gh_username, # the reason for .includes(:user)
            :owner_pic => project.get_owner_pic,
            :voted => user ? user.voted_on_project(project.id) : nil,
            :status => project.status,
            :total_comments => project.comments_count,
            :domains => project.domains,
            :seeking => project.seeking,
            :up_for_grabs => project.up_for_grabs
        }
      }

      limit = !params[:limit].nil? ? params[:limit].to_i : 30
      got_all = (limit >= projects.length)
      render :json => {:projects => special_sort(projects, params[:sortType]).slice(0, limit), :gotAll => got_all}
    else
      render :json => {:message => 'params[:filters] was nil'}, :status => 500
    end
  end

  def pull_from_ideas
    ideas = special_sort(Project.where(:status => 0).active, 0)
    render :json => ideas
  end

  # Join project as collaborator
  def join
    user = User.find_by(uuid: params[:user_uuid])
    project = Project.find_by(uuid: params[:uuid])
    if !user.nil? && !project.nil?
      Contributor.new(:uuid => UUIDTools::UUID.random_create.to_s, :project_id => project.id, :user_id => user.id).save!
      project.update_attributes(:contributors_count => (project.contributors_count + 1))
      render :json => { :message => 'Successfully added contributor' }
    else
      render :json => {:status => 500, :message => 'Could not add user as contributor'}
    end
  end

  def request_to_join
    requester = User.find_by(uuid: params[:requester_uuid])
    project = Project.find_by(uuid: params[:uuid])

    if !requester.nil? && !project.nil? && !params[:asset].nil?
      asset = params[:asset].to_i
      pending_request = PendingRequest.new(:uuid => UUIDTools::UUID.random_create.to_s, :requested_asset => asset, :requester_id => requester.id, :responder_id => project.user.id, :project_id => project.id)
      pending_request.save!

      # # Invite the user to join the Slack team if the project has a Slack API Key associated with it
      # if asset === SLACK_ASSET
      #   integration = Integration.find_by(:service => 'Slack', :project_id => project.id)
      #
      #   if !integration.key.nil?
      #     slack_invite = invite_slack_user(requester, integration.key)
      #     if slack_invite === true
      #       pending_request.destroy!
      #       integration.update_attributes(:users => integration.users + [requester.id])
      #     end
      #   end
      # end

      render :json => { :message => 'Successfully added pending request' }
    else
      render :json => {:status => 500, :message => 'Could not add pending request'}
    end
  end

  def respond_to_request
    requester = User.find_by(uuid: params[:requester_uuid])
    project = Project.find_by(uuid: params[:uuid])
    pending_request = PendingRequest.find_by(:uuid => params[:pending_request_uuid])

    if !requester.nil? && !project.nil? && !pending_request.nil? && !params[:response].nil?
      asset = pending_request.requested_asset

      # Update the request with the response value
      pending_request.update_attributes(:response => params[:response])
      pending_request.update_attributes(:responded_at => pending_request.updated_at)

      # if the response was "No Thanks"
      if !params[:response]
        render :json => {}, :status => 200
        return
      end

      # if the request was a join project request, just add the user as a contributor
      if asset === PROJECT_ASSET
        contrib_data = {
            :uuid => UUIDTools::UUID.random_create.to_s,
            :project_id => project.id,
            :user_id => requester.id,
            :admin => false
        }
        Contributor.new(contrib_data).save!

        project.update_attributes(:contributors_count => (project.contributors_count + 1))

      # otherwise, it was an integrations request
      else
        # add the user's id into the users[] column of the integration corresponding to this project and asset
        service = service_for_asset(asset)
        integration = Integration.find_by(:service => service, :project_id => project.id)

        if !integration.nil?
          integration.update_attributes(:users => integration.users + [requester.id])
        end
      end

      render :json => {}, :status => 200
    else
      render :json => {:message => 'Could not accept request...either the user, the project, or the pending request was nil'}, :status => 500
    end

  end

  def saw_notifications
    notifications = params[:notifications]

    if notifications.present?

      notifications.each { |notification|
        attr = notification[:is_request] ? :request_seen : :response_seen
        PendingRequest.find_by(uuid: notification[:uuid]).update_attributes(attr => true)
      }

      render :json => {}, :status => 200
    else
      render :json => {:error => 'params[:notifications] was .blank? for some reason...'}, :status => 500
    end
  end


  # def invite_slack_user(user, api_token)
  #   Slack.configure do |config|
  #     config.token = api_token
  #   end
  #   email = user.email
  #   base = "https://#{get_team_name(Slack)}.slack.com"
  #   hash = "/api/users.admin.invite?t=#{Time.now.to_i}"
  #   data = "email=#{CGI.escape(email)}&channels=#{get_channels(Slack)}&first_name=#{CGI.escape(user.gh_username)}&token=#{api_token}&set_active=true&_attempts=1"
  #   uri = URI.parse(base)
  #   http = Net::HTTP.new(uri.host, uri.port)
  #   http.use_ssl = true
  #   http.verify_mode = OpenSSL::SSL::VERIFY_NONE
  #   request = Net::HTTP::Post.new(hash)
  #   request.add_field('Content-Type', 'application/x-www-form-urlencoded')
  #   request.body = data
  #   response = http.request(request)
  #
  #   response.kind_of? Net::HTTPSuccess
  # end


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

  def get_team_name(slack)
    request = slack.team_info
    team_name = request["team"]["name"]
    team_name
  end

  def vote
    project = Project.find_by(uuid: params[:uuid])

    if project.present?
      project.update_attributes(:vote_count => (project.vote_count + 1))
      user = User.find_by(uuid: params[:user_uuid])

      if user.present?
        user.update_attributes(:upvoted_projects => user.upvoted_projects + [project.id])
      end

      render :json => user.upvoted_projects
    else
      render :json => {:status => 500, :message => 'Could not find project by UUID'}
    end
  end

  def post_new_comment
    user = User.find_by(uuid: params[:poster_uuid])
    project = Project.find_by(uuid: params[:uuid])
    parent_comment = Comment.find_by(uuid: params[:parent_uuid])

    if user.present?
      comment_info = {
        :uuid => UUIDTools::UUID.random_create.to_s,
        :text => params[:text],
        :project_id => project.id,
        :user_id => user.id,
        :vote_count => 0,
        :feed => params[:feed],
        :parent_id => parent_comment.try(:id)
      }
      comment = Comment.new(comment_info)
      comment.save

      project.update_attributes(:comments_count => (project.comments_count + 1))

      all_comments_of_feed_type = comments_for_feed(project.id, params[:feed], user)

      # if reply and the parent comment wasn't you
      # if parent_comment.present? && parent_comment.user.id != user.id
      if parent_comment.present?
        UserMailer.delay.notify_user_of_comment_reply(
          user: parent_comment.user,
          comment: comment,
          parent_comment: parent_comment,
          project: project
        )

      # else if there was no parent comment and this was not your project
      # elsif parent_comment.nil? && project.user.id != user.id
      elsif parent_comment.nil?
        UserMailer.delay.notify_user_of_comment(
          user: project.user,
          comment: comment,
          project: project
        )
      end

      render :json => all_comments_of_feed_type
    else
      render :json => {:status => 500}
    end
  end

  def fetch_comments
    if params[:user_uuid]
      user = User.find_by(uuid: params[:user_uuid])
    end

    project = Project.find_by(uuid: params[:uuid])

    if project.present?
      comments = comments_for_feed(project.id, params[:feed], user)
    end

    render :json => comments
  end

  def add_implementation
    project = Project.find_by(uuid: params[:uuid])
    user = User.find_by(uuid: params[:user_uuid])

    if user.present? && project.present?

      Implementation.new(
        uuid: UUIDTools::UUID.random_create.to_s,
        project_id: project.id,
        user_id: user.id,
        is_owner: params[:is_owner],
        done: params[:done],
        seeking_contributors: params[:seeking_contributors],
        description: params[:description],
        title: params[:title],
        main_url: params[:main_url],
        slack_url: params[:slack_url],
        hipchat_url: params[:hipchat_url],
        irc: params[:irc]
      ).save!

      implementations = get_formatted_implementations(project, user)

      render json: implementations, status: 200
    else
      render json: { message: 'Either User or Project not found' }, status: 500
    end

  end

  def implementation_vote
    implementation = Implementation.find_by(uuid: params[:uuid])

    if implementation.present?

      implementation.update_attributes(:vote_count => (implementation.vote_count + 1))

      user = User.find_by(uuid: params[:user_uuid])

      if user.present?
        user.update_attributes(:upvoted_implementations => user.upvoted_implementations + [implementation.id])
      end

      render :json => {}, :status => 200
    else
      render :json => {}, :status => 500
    end
  end

  def get_formatted_implementations(project, user)
    implementations = special_sort(project.implementations.active, 0)

    formatted_imps = implementations.map { |i|
      {
          :uuid => i.uuid,
          :post_date => i.created_at.utc.iso8601,
          :vote_count => i.vote_count,
          :voted => user ? user.voted_on_implementation(i.id) : nil,
          :title => i.title,
          :main_url => i.main_url,
          :description => i.description,
          :is_owner => i.is_owner,
          :slack_url => i.slack_url,
          :hipchat_url => i.hipchat_url,
          :irc_url => i.create_irc_url,
          :in_progress => i.in_progress,
          :seeking_contributors => i.seeking_contributors,
          :poster_pic => i.user.pic,
          :poster_gh_username => i.user.gh_username
      }
    }

    formatted_imps
  end

  def fetch_implementations
    project = Project.find_by(uuid: params[:uuid])
    user = User.find_by(uuid: params[:user_uuid])

    if project.present?
      implementations = get_formatted_implementations(project, user)
      render json: implementations, status: 200
    else
      render json: { message: 'Project not found' }, status: 500
    end
  end

  def comments_for_feed(project_id, feed_status, user)
    comments = []
    Comment.includes(:user).top_level(project_id, feed_status).not_destroyed.vote_and_time_sort.each { |comment|
      comment_obj = {
          :comment => {
            :userPic => comment.try(:user).try(:pic),
            :posterGHUsername => comment.try(:user).try(:gh_username),
            :posterUUID => comment.try(:user).try(:uuid),
            :voteCount => comment.vote_count,
            :voted => user ? user.voted_on_comment(comment.id) : nil,
            :postTime => comment.created_at.utc.iso8601,
            :text => comment.text,
            :uuid => comment.uuid,
            :parentUUID => comment.try(:parent).try(:uuid),
            :feed => comment.feed
          },
          :children => get_comment_children(comment, user)
      }
      comments.push(comment_obj)
    }
    comments
  end

  def get_comment_children(comment, user)
    if comment.children.empty?
      []
    else
      comments = []
      comment.children.not_destroyed.vote_and_time_sort.each { |child|
        comment_obj = {
            :comment => {
                :userPic => child.try(:user).try(:pic),
                :posterGHUsername => child.try(:user).try(:gh_username),
                :posterUUID => child.try(:user).try(:uuid),
                :voteCount => child.vote_count,
                :voted => user ? user.voted_on_comment(child.id) : nil,
                :postTime => child.created_at.utc.iso8601,
                :text => child.text,
                :uuid => child.uuid,
                :parentUUID => child.try(:parent).try(:uuid),
                :feed => child.feed
            },
            :children => get_comment_children(child, user)
        }
        comments.push(comment_obj)
      }
      comments
    end
  end

  def comment_vote
    comment = Comment.find_by(uuid: params[:comment_uuid])

    if !comment.nil?
      comment.update_attributes(:vote_count => (comment.vote_count + 1))
      user = User.find_by(uuid: params[:user_uuid])
      if !user.nil?
        user.update_attributes(:upvoted_comments => user.upvoted_comments + [comment.id])
      end
      render :json => user.upvoted_comments
    else
      render :json => {:status => 500, :message => 'Could not find comment by ID'}
    end
  end

  def get_up_for_grabs
    hard_coded_projects = Project.where(:status => params[:status]).map { |project|
      owner = User.find_by(id: project.user_id)
      {
          :title => project.title,
          :subtitle => project.subtitle,
          :description => project.description,
          :langsFrames => project.langs_and_frames,
          :userPic => owner.pic
      }
    }
    render :json => hard_coded_projects
  end

  def get_up_for_grabs_details
    project = Project.find_by(uuid: params[:uuid])

    if !project.nil?
      data = {
          :uuid => project.uuid,
          :title => project.title,
          :subtitle => project.subtitle,
          :description => project.description,
          :langsFrames => project.langs_and_frames
      }
      render :json => data
    else
      render :json => {:status => 500, :message => 'Cant find that project based on the passed ID'}
    end
  end

  def pull_project
    project = Project.find_by(uuid: params[:uuid])
    project.update_attributes(:was_pulled => true)
    render :json => {}, :status => 200
  end

  def get_evolution
    project = Project.find_by(uuid: params[:uuid])
    if project.present?
      evolutions = project.evolutions.active.order(:created_at).map { |ev|
        {
          :uuid => ev.uuid,
          :project_uuid => project.uuid,
          :user_uuid => ev.user.uuid,
          :text => ev.text,
          :created_at => ev.created_at,
          :updated_at => ev.updated_at
        }
      }

      render :json => evolutions
    else
      render :json => {:message => 'Could not find project by id'}, :status => 500
    end
  end

  def edit
    project = Project.find_by(uuid: params[:uuid])
    new_data = ProjectHelper.get_allowable_edit_params(params[:data])

    if !project.nil?
      attrs_to_update = {}
      integrations = {}

      new_data.each { |key, val|
        if key == :integrations
          integrations = val
        else
          attrs_to_update[key] = val
        end
      }

      project.update_attributes(attrs_to_update)

      if !integrations.nil?

        # Slack
        if !integrations[:slack].nil?
          slack_integration = project.integrations.where(:service => 'Slack')

          if integrations[:slack].empty?
            if !slack_integration.blank?
              slack_integration.first.destroy!
            end
          else
            if slack_integration.blank?
              slack_data = {
                  :service => 'Slack',
                  :project_id => project.id,
                  :url => integrations[:slack],
              }
              Integration.new(slack_data).save!
            else
              slackURL = integrations[:slack]
              slack_integration.first.update_attributes(url: slackURL)
            end
          end
        end

        # HipChat
        if !integrations[:hipchat].nil?
          hipchat_integration = project.integrations.where(:service => 'HipChat')

          if integrations[:hipchat].empty?
            if !hipchat_integration.blank?
              hipchat_integration.first.destroy!
            end
          else
            if hipchat_integration.blank?
              hipchatURL = integrations[:hipchat]
              Integration.new(service: 'HipChat', project_id: project.id, url: hipchatURL).save!
            else
              hipchatURL = integrations[:hipchat]
              hipchat_integration.first.update_attributes(url: hipchatURL)
            end
          end
        end

        # IRC
        if !integrations[:irc].nil?
          irc_integration = project.integrations.where(:service => 'IRC')

          if integrations[:irc][:channel].empty?
            if !irc_integration.blank?
              irc_integration.first.destroy!
            end
          else
            if irc_integration.blank?
              Integration.new(service: 'IRC', project_id: project.id, irc: integrations[:irc]).save!
            else
              irc_integration.first.update_attributes(irc: integrations[:irc])
            end
          end
        end

      end

      render :json => {:status => 200}
    else
      render :json => {:status => 500, :message => 'Could not find project by id'}
    end
  end

  def highlight_query(text, query)

    # can't do sub because of casing
    start_index = text.downcase.index(query.downcase)
    if start_index == 0
      new_text = "<span>#{text[0..(query.length-1)]}</span>#{text[query.length..text.length]}"
    elsif !start_index.nil? && start_index > 0
      end_of_first_chunk = start_index - 1
      end_of_second_chunk = end_of_first_chunk + query.length
      new_text = "#{text[0..end_of_first_chunk]}<span>#{text[(end_of_first_chunk + 1)..(end_of_second_chunk)]}</span>#{text[(end_of_second_chunk + 1)..text.length]}"
     else
      new_text = text
    end

    new_text
  end

  def search
    projects_table = Project.arel_table
    query = "%#{params[:query]}%"
    limit = params[:limit].present? ? params[:limit].to_i : 10

    projects = Project.includes(:user).where(projects_table[:title].matches(query).or(projects_table[:subtitle].matches(query))).active.order('vote_count DESC, LOWER(title), LOWER(subtitle)').limit(limit).map { |project|
      {
        :owner => project.get_owner_gh_username,
        :title => highlight_query(project.title, params[:query]),
        :subtitle => highlight_query(project.subtitle, params[:query]),
        :status => project.status,
        :uuid => project.uuid,
        :voteCount => project.vote_count
      }
    }

    render :json => {:projects => projects, :gotAll => true}
  end

  def launch
    project = Project.find_by(uuid: params[:uuid])

    if project.present?
      project.update_attributes!(status: LAUNCHED)
      render :json => {}, :status => 200
    else
      render :json => {:message => 'Cant find project by that id'}, :status => 500
    end
  end

  private

  def project_params
    params.require(:project).permit(:title, :subtitle, :user_id, :uuid, :repo_name, :description, :vote_count, :license, :status, :anon, :privacy, :contributors => [], :langs_and_frames => [], :domains => [], :seeking => [])
  end


end
