module ProjectHelper

  IDEA_STATUS = 0

  CREATION_PARAMS_IDEA = [
      :user_uuid,
      :privacy,
      :seeking,
      :up_for_grabs
  ]

  CREATION_PARAMS_IDEA_UFG = [
      :user_uuid,
      :up_for_grabs
  ]

  CREATION_PARAMS_LAUNCHED = [
    :user_uuid,
    :seeking,
    :repo_name,
    :license,
    :slackURL,
    :hipChatURL,
    :irc
  ]

  EDIT_PARAMS = [
    :integrations
  ]

  def self.fetch_gh_email(client, sender_name, usernames, project_name, index, users_arr, project_id)
    gh_user = client.user(usernames[index])
    users_arr.push({
      :username => usernames[index],
      :email => gh_user['email']
    })
    index += 1

    if users_arr.length === usernames.length
      # get rid of users who don't have emails connected to their gh profiles
      users_with_emails = users_arr.reject { |obj| obj[:email].nil? }
      subject = "You've been invited to join #{project_name}"
      users_with_emails.each { |obj|
        UserMailer.delay.project_invitation(obj[:email], sender_name, obj[:username], subject, project_name, project_id)
      }
    else
      sleep 1   # wait a second because we don't want to run out of requests by making a fuck ton
      fetch_gh_email(client, sender_name, usernames, project_name, index, users_arr, project_id)
    end
  end

  def self.get_always_allowed(data)
    {
      :title => data[:title],
      :subtitle => data[:subtitle],
      :description => data[:description],
      :status => data[:status],
      :langs_and_frames => data[:langs_and_frames],
      :domains => data[:domains]
    }
  end

  def self.get_allowables(data, creation)
    allowed = get_always_allowed(data)

    if creation
      if data[:status] == IDEA_STATUS
        extra_params = data[:up_for_grabs] ? CREATION_PARAMS_IDEA_UFG : CREATION_PARAMS_IDEA
      else
        extra_params = CREATION_PARAMS_LAUNCHED
      end
    else
      extra_params = EDIT_PARAMS
    end

    extra_params.each { |key|
      allowed[key] = data[key]
    }

    allowed
  end

  def self.get_allowable_creation_params(data)
    allowed = get_allowables(data, true)
    allowed
  end

  def self.get_allowable_edit_params(data)
    allowed = get_allowables(data, false)
    allowed
  end

end