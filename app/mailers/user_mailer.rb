class UserMailer < ActionMailer::Base
  default from: 'benwhittle31@gmail.com',
          return_path: 'benwhittle31@gmail.com'

  def project_invitation(email, sender_name, recipient_name, subject, project_name, project_id)
    @sender_name = sender_name
    @recipient_name = recipient_name
    @project_name = project_name
    @project_id = project_id
    @redirect_base_url = ENV['URL']
    @company_logo = 'http://sourcehoney.s3-website-us-west-1.amazonaws.com/images/sourcehoney.png'

    if ENV['MAILER_PERFORM_DELIVERIES']
      email = ENV['OVERRIDE_EMAIL'] ? ENV['MAIL_TO_OVERRIDE'] : email
      mail(to: email, subject: subject)
    end
  end

  def notify_admin_of_suggestion(user: nil, text: nil)
    @username = user.present? ? user.gh_username : 'Unauthed User'
    @text = text
    @redirect_base_url = ENV['URL']
    @company_logo = 'http://sourcehoney.s3-website-us-west-1.amazonaws.com/images/sourcehoney.png'
    subject = 'New Suggestion!'

    mail(to: ENV['ADMIN_EMAIL'], subject: subject)
  end

end
