class UserMailer < ActionMailer::Base

  default from: 'Sourcehoney <team@sourcehoney.com>', return_path: ENV['MANDRILL_USERNAME']

  LOGO = 'http://sourcehoney.s3-website-us-west-1.amazonaws.com/images/sourcehoney.png'

  def project_invitation(email, sender_name, recipient_name, subject, project_name, project_uuid)
    @sender_name = sender_name
    @recipient_name = recipient_name
    @project_name = project_name
    @project_uuid = project_uuid
    @redirect_base_url = ENV['URL']
    @company_logo = LOGO

    send_email(email, subject)
  end

  def notify_user_of_comment_reply(user: nil, comment: nil, parent_comment: nil, project: nil)
    @recipient_name = get_recipient_name(user)
    @project_name = project.title
    @project_uuid = project.uuid
    @comment_text = comment.text
    @commenter = comment.user.gh_username
    @parent_comment_text = parent_comment.text
    @redirect_base_url = ENV['URL']
    @company_logo = LOGO
    project_name_abbrev = @project_name.length > 40 ? "#{@project_name[0..37]}..." : @project_name

    send_email(user.email, "Someone replied to your comment on the project: #{project_name_abbrev}")
  end

  def notify_user_of_comment(user: nil, comment: nil, project: nil)
    @recipient_name = get_recipient_name(user)
    @project_name = project.title
    @project_uuid = project.uuid
    @comment_text = comment.text
    @commenter = comment.user.gh_username
    @redirect_base_url = ENV['URL']
    @company_logo = LOGO
    project_name_abbrev = @project_name.length > 40 ? "#{@project_name[0..37]}..." : @project_name

    send_email(user.email, "Someone commented on your project: #{project_name_abbrev}")
  end

  def received_suggestion(user)
    @recipient_name = get_recipient_name(user)
    @company_logo = LOGO

    send_email(user.email, 'Thanks for the suggestion!')
  end

  def notify_admin_of_suggestion(user: nil, text: nil)
    @username = user.present? ? user.gh_username : 'Unauthed User'
    @text = text
    @redirect_base_url = ENV['URL']
    @company_logo = 'http://sourcehoney.s3-website-us-west-1.amazonaws.com/images/sourcehoney.png'

    send_email(ENV['ADMIN_EMAIL'], 'New Suggestion!')
  end

  def get_recipient_name(user)
    name = user.try(:name)

    if user.try(:name).try(:present?)
      name.split(' ')[0]
    else
      user.try(:gh_username)
    end
  end

  def send_email(email, subject)
    puts "SENDING EMAIL TO: #{email}"
    if (ENV['MAILER_PERFORM_DELIVERIES'] || '').downcase == 'true'
      mail(to: (((ENV['OVERRIDE_EMAIL'] || '').downcase == 'true') ? ENV['MAIL_TO_OVERRIDE'] : email), subject: subject)
    end
  end

end
