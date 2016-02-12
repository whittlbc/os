module ProjectHelper

  IDEA_STATUS = 0

  CREATION_PARAMS_IDEA = [
      :user_uuid,
      :status,
      :privacy,
      :seeking,
      :up_for_grabs,
      :slackURL,
      :hipChatURL,
      :irc
  ]

  CREATION_PARAMS_IDEA_UFG = [
      :user_uuid,
      :status,
      :up_for_grabs
  ]

  CREATION_PARAMS_LAUNCHED = [
    :user_uuid,
    :status,
    :seeking,
    :repo_name,
    :license,
    :slackURL,
    :hipChatURL,
    :irc
  ]

  EDIT_PARAMS_IDEA = [
    :seeking,
    :integrations,
    :privacy,
  ]

  EDIT_PARAMS_IDEA_UFG = []

  EDIT_PARAMS_LAUNCHED = [
    :seeking,
    :integrations,
    :license,
    :repo_name
  ]

  def self.fetch_gh_email(client, sender_name, usernames, project_name, index, users_arr, project_uuid)
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
        UserMailer.delay.project_invitation(obj[:email], sender_name, obj[:username], subject, project_name, project_uuid)
      }
    else
      sleep 1   # wait a second because we don't want to run out of requests by making a fuck ton
      fetch_gh_email(client, sender_name, usernames, project_name, index, users_arr, project_uuid)
    end
  end

  def self.get_always_allowed(data)
    {
      :title => data[:title],
      :subtitle => data[:subtitle],
      :description => data[:description],
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
      if data[:status] == IDEA_STATUS
        extra_params = data[:up_for_grabs] ? EDIT_PARAMS_IDEA_UFG : EDIT_PARAMS_IDEA
      else
        extra_params = EDIT_PARAMS_LAUNCHED
      end
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