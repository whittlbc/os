module ProjectHelper

  def self.fetch_gh_email(client, sender_name, usernames, project_name, index, users_arr)
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
        UserMailer.delay.project_invitation(obj[:email], sender_name, obj[:username], subject, project_name)
      }
    else
      sleep 1   # wait a second because we don't want to run out of requests by making a fuck ton
      fetch_gh_email(client, sender_name, usernames, project_name, index, users_arr)
    end
  end


end