class UserMailer < ActionMailer::Base
  default from: 'benwhittle31@gmail.com',
          return_path: 'benwhittle31@gmail.com'

  LOGO = 'http://sourcehoney.s3-website-us-west-1.amazonaws.com/images/sourcehoney.png'

  def project_invitation(email, sender_name, recipient_name, subject, project_name, project_uuid)
    @sender_name = sender_name
    @recipient_name = recipient_name
    @project_name = project_name
    @project_uuid = project_uuid
    @redirect_base_url = ENV['URL']
    @company_logo = LOGO

    if ENV['MAILER_PERFORM_DELIVERIES']
      email = ENV['OVERRIDE_EMAIL'] ? ENV['MAIL_TO_OVERRIDE'] : email
      mail(to: email, subject: subject)
    end
  end

  def notify_user_of_comment_reply(user: nil, comment: nil, parent_comment: nil, project: nil)
    @recipient_name = user.gh_username
    @project_name = project.name
    @project_uuid = project.uuid
    @comment_text = comment.text
    @commenter = comment.user.name
    @parent_comment_text = parent_comment.text
    @redirect_base_url = ENV['URL']
    @company_logo = LOGO
    subject = 'Someone replied to your comment on Sourcehoney'

    if ENV['MAILER_PERFORM_DELIVERIES']
      email = ENV['OVERRIDE_EMAIL'] ? ENV['MAIL_TO_OVERRIDE'] : user.email
      mail(to: email, subject: subject)
    end
  end

  def notify_user_of_comment(user: nil, comment: nil, project: nil)
    @recipient_name = user.gh_username
    @project_name = project.name
    @project_uuid = project.uuid
    @comment_text = comment.text
    @commenter = comment.user.name
    @redirect_base_url = ENV['URL']
    @company_logo = LOGO
    subject = 'Someone commented on your project on Sourcehoney'

    if ENV['MAILER_PERFORM_DELIVERIES']
      email = ENV['OVERRIDE_EMAIL'] ? ENV['MAIL_TO_OVERRIDE'] : user.email
      mail(to: email, subject: subject)
    end
  end

  def received_suggestion(user: nil)
    @recipient_name = user.gh_username
    @company_logo = LOGO
    subject = 'Thanks for the suggestion!'

    if ENV['MAILER_PERFORM_DELIVERIES']
      email = ENV['OVERRIDE_EMAIL'] ? ENV['MAIL_TO_OVERRIDE'] : user.email
      mail(to: email, subject: subject)
    end
  end

end
