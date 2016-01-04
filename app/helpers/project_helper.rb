module ProjectHelper

  UP_FOR_GRABS = 0

  NOT_UP_FOR_GRABS_CREATION_PROPS = [
    :repo_name,
    :license,
    :privacy,
    :slackURL,
    :hipChatURL,
    :irc
  ]

  NOT_UP_FOR_GRABS_EDIT_PROPS = [
      :repo_name,
      :license,
      :privacy,
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
      :langs_and_frames => data[:langs_and_frames]
    }
  end

  def self.get_allowables(data, creation)
    allowed = get_always_allowed(data)

    if creation
      allowed[:user_uuid] = data[:user_uuid]
    end

    if data[:status] == UP_FOR_GRABS
      allowed[:anon] = data[:anon] if data[:anon].present?
    else
      keys = creation ? NOT_UP_FOR_GRABS_CREATION_PROPS : NOT_UP_FOR_GRABS_EDIT_PROPS
      keys.each { |key|
        allowed[key] = data[key]
      }
    end

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