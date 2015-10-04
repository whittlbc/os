module ProjectHelper

  def self.fetch_gh_email(client, usernames, index, emails_array)
    gh_user = client.user(usernames[index])
    emails_array.push(gh_user['email'])
    index += 1
    if emails_array.length === usernames.length

      existing_emails = emails_array.reject { |email| email.nil? }

      existing_emails.each { |email|
        UserMailer.delay.project_invitation('benwhittle31@gmail.com', 'whittlbc', 'OSS Email')
      }

    else
      sleep 1   # wait a second because we don't want to run out of requests by making a fuck ton
      fetch_gh_email(client, usernames, index, emails_array)
    end
  end


end