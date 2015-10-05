class UserMailer < ActionMailer::Base
  default from: 'benwhittle31@gmail.com',
          return_path: 'benwhittle31@gmail.com'

  def project_invitation(email, sender_name, recipient_name, subject, project_name)
    @sender_name = sender_name
    @recipient_name = recipient_name
    @project_name = project_name

    if ENV['MAILER_PERFORM_DELIVERIES']
      email = ENV['OVERRIDE_EMAIL'] ? ENV['MAIL_TO_OVERRIDE'] : email
      mail(to: email, subject: subject)
    end
  end
end
